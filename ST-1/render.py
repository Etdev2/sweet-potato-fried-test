#!/usr/bin/env python3
"""Deterministic ST-1 exports. No network, account access, or external assets.
Run --schema to print the content contract; run --self-test for fixture-only QA.
"""
import argparse, copy, datetime, hashlib, json, math, os, re, textwrap, zipfile
from pathlib import Path
from urllib.parse import urlparse
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

W, H = 960, 540
PALETTES = {
 'owner': dict(bg='F5F8FA', ink='142A40', accent='007F83', muted='506274', card='FFFFFF', tint='DDEDEE'),
 'advertiser': dict(bg='FCF8EC', ink='17265E', accent='2459E0', muted='566079', card='FFFFFF', tint='E7EDFF'),
 'internal': dict(bg='FFF4E6', ink='302825', accent='B84A32', muted='745F54', card='FFFFFF', tint='F7DDC6'),
}
CONTENT_EXAMPLE = {
 'schema_version':1,
 'sources':{'SOURCE_ID':{'title':'Source title','url':'https://example.org/primary','date':'YYYY-MM-DD','limit':'Disclosure limit'}},
 'decks':[{'id':'owner|advertiser|internal','title':'Deck title','subtitle':'Audience and decision', 'filename':'optional-distinct-basename',
  'slides':[{'layout':'cover|bullets|cards|chart|table|sources','title':'Slide claim or decision','kicker':'Optional section',
  'subtitle':'Optional context','bullets':['Up to four strings'],'callout':'Optional conclusion or limitation',
  'source_ids':['SOURCE_ID'],'notes':'Full speaker notes including factual boundaries',
  'cards':[{'label':'Label','value':'Short headline','detail':'Supporting detail'}],
  'chart':{'type':'bar|line','title':'Chart title','labels':['A','B'],'series':[{'name':'Series','values':[1,2]}],'unit':'USD millions','finance':'Optional payment_schedule|pv_sensitivity|contribution_sensitivity'},
  'table':{'headers':['Header','Header'],'rows':[['Cell','Cell']]}}]}],
 'rules':['Exactly owner, advertiser and internal decks; 8-10 slides each including source appendix.',
 'Every substantive slide lists source_ids where evidence is used. Scenario labels and limitations remain visible.',
 'Finance shortcuts read st1-finance.json and produce USD millions. Fiction footer is automatic on every internal slide.',
 'URLs and full notes appear in speaker notes, per-slide source lines, notes.md and sources.json.']
}
SCHEMA = {
 '$schema':'https://json-schema.org/draft/2020-12/schema',
 '$id':'https://example.org/st1/deck-content.schema.json',
 'title':'ST-1 presentation content', 'type':'object',
 'required':['schema_version','sources','decks'],
 'properties':{
  'schema_version':{'const':1},
  'sources':{'type':'object','additionalProperties':{'$ref':'#/$defs/source'}},
  'decks':{'type':'array','minItems':3,'maxItems':3,'items':{'$ref':'#/$defs/deck'},
   'allOf':[{'contains':{'properties':{'id':{'const':i}},'required':['id']},'minContains':1,'maxContains':1} for i in ('owner','advertiser','internal')]}
 },
 '$defs':{
  'source':{'type':'object','required':['title','url'],'properties':{k:{'type':'string'} for k in ('title','url','date','limit')}},
  'deck':{'type':'object','required':['id','title','slides'],'properties':{
   'id':{'enum':['owner','advertiser','internal']},'title':{'type':'string','minLength':1},'subtitle':{'type':'string'},'filename':{'type':'string'},
   'slides':{'type':'array','minItems':8,'maxItems':10,'items':{'$ref':'#/$defs/slide'},'contains':{'properties':{'layout':{'const':'sources'}},'required':['layout']}}}},
  'slide':{'type':'object','required':['title','layout'],'properties':{
   **{k:{'type':'string'} for k in ('title','kicker','subtitle','callout','notes')},
   'layout':{'enum':['cover','bullets','cards','chart','table','sources']},
   'bullets':{'type':'array','maxItems':4,'items':{'type':'string'}},
   'source_ids':{'type':'array','uniqueItems':True,'items':{'type':'string'}},
   'cards':{'type':'array','minItems':2,'maxItems':4,'items':{'type':'object','required':['label','value'],'properties':{k:{'type':'string'} for k in ('label','value','detail')}}},
   'chart':{'$ref':'#/$defs/chart'},'table':{'$ref':'#/$defs/table'}},
   'allOf':[{'if':{'properties':{'layout':{'const':name}}},'then':{'required':[name]}} for name in ('cards','chart','table')]},
  'chart':{'type':'object','properties':{
   'finance':{'enum':['payment_schedule','pv_sensitivity','contribution_sensitivity']},'type':{'enum':['bar','line']},
   **{k:{'type':'string'} for k in ('title','unit','caption')},
   'labels':{'type':'array','minItems':1,'items':{'type':'string'}},
   'series':{'type':'array','minItems':1,'maxItems':3,'items':{'type':'object','required':['name','values'],'properties':{'name':{'type':'string'},'values':{'type':'array','minItems':1,'items':{'type':'number'}}}}}},
   'anyOf':[{'required':['finance']},{'required':['labels','series','unit']}]},
  'table':{'type':'object','required':['headers','rows'],'properties':{'headers':{'type':'array','minItems':1,'maxItems':5,'items':{'type':'string'}},'rows':{'type':'array','maxItems':7,'items':{'type':'array','items':{'type':'string'}}}}}
 },
 'examples':[CONTENT_EXAMPLE],
 'description':'Sources retain full URLs, dates and limits. Internal fiction footer is automatic. Finance shortcuts use the supplied model in USD millions. Chart and card bullets also appear in notes.'
}
PDF_FONT, PDF_BOLD, PPT_FONT = 'Helvetica', 'Helvetica-Bold', 'Arial'
for regular, bold in [('/System/Library/Fonts/Supplemental/Arial.ttf','/System/Library/Fonts/Supplemental/Arial Bold.ttf'),('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')]:
 if Path(regular).is_file() and Path(bold).is_file():
  pdfmetrics.registerFont(TTFont('STRegular',regular)); pdfmetrics.registerFont(TTFont('STBold',bold))
  PDF_FONT, PDF_BOLD = 'STRegular','STBold'; break

def clean(s):
 return str(s).replace('\u2011','-').replace('\u2013','-').replace('\u2014',', ').replace('\u2019',"'").replace('\u201c','"').replace('\u201d','"')
def rgb(h): return tuple(int(h[i:i+2],16)/255 for i in (0,2,4))
def color(h): return RGBColor.from_string(h)
def length(s,size,bold=False): return pdfmetrics.stringWidth(s,PDF_BOLD if bold else PDF_FONT,size)
def wrap(s,width,size,bold=False):
 result=[]
 for para in clean(s).split('\n'):
  if not para: result.append(''); continue
  line=''
  for word in para.split():
   # Break long source URLs and tokens instead of letting them exceed the grid.
   pieces=[]
   while length(word,size,bold)>width:
    n=1
    while n<len(word) and length(word[:n+1],size,bold)<=width: n+=1
    pieces.append(word[:n]); word=word[n:]
   pieces.append(word)
   for part in pieces:
    candidate=(line+' '+part).strip()
    if line and length(candidate,size,bold)>width: result.append(line); line=part
    else: line=candidate
  result.append(line)
 return result

def stable_pptx(path):
 with zipfile.ZipFile(path) as z: entries={i.filename:z.read(i.filename) for i in z.infolist()}
 with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
  for name in sorted(entries):
   info=zipfile.ZipInfo(name,(2023,12,31,0,0,0)); info.compress_type=zipfile.ZIP_DEFLATED
   z.writestr(info,entries[name])

class Page:
 def __init__(self,prs,pdf,palette,qa,number,deck):
  self.slide=prs.slides.add_slide(prs.slide_layouts[6]); self.pdf=pdf; self.p=palette; self.qa=qa; self.number=number;self.deck=deck
  self.rect(0,0,W,H,self.p['bg'])
 def bounds(self,x,y,w,h):
  if min(x,y,w,h)<0 or x+w>W+.01 or y+h>H+.01: raise ValueError(f'Slide {self.number}: out-of-page box {(x,y,w,h)}')
 def rect(self,x,y,w,h,fill,stroke=None,radius=0):
  self.bounds(x,y,w,h)
  sh=self.slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE,Pt(x),Pt(y),Pt(w),Pt(h))
  sh.fill.solid(); sh.fill.fore_color.rgb=color(fill)
  if stroke: sh.line.color.rgb=color(stroke)
  else: sh.line.fill.background()
  if radius:
   try: sh.adjustments[0]=.12
   except Exception: pass
  self.pdf.setFillColorRGB(*rgb(fill)); self.pdf.setStrokeColorRGB(*rgb(stroke or fill))
  if radius: self.pdf.roundRect(x,H-y-h,w,h,radius,stroke=bool(stroke),fill=1)
  else: self.pdf.rect(x,H-y-h,w,h,stroke=bool(stroke),fill=1)
 def line(self,x1,y1,x2,y2,c,width=1):
  from pptx.enum.shapes import MSO_CONNECTOR
  sh=self.slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT,Pt(x1),Pt(y1),Pt(x2),Pt(y2)); sh.line.color.rgb=color(c); sh.line.width=Pt(width)
  self.pdf.setStrokeColorRGB(*rgb(c)); self.pdf.setLineWidth(width); self.pdf.line(x1,H-y1,x2,H-y2)
 def text(self,text,x,y,w,h,size=20,bold=False,c=None,minsize=None,link=None):
  self.bounds(x,y,w,h); text=clean(text); minsize=minsize or size
  while True:
   lines=wrap(text,w,size,bold); leading=size*1.23
   if len(lines)*leading<=h+.1: break
   if size<=minsize: raise ValueError(f'Slide {self.number}: text overflow at {size}pt: {text[:100]}')
   size=max(minsize,size-.5)
  box=self.slide.shapes.add_textbox(Pt(x),Pt(y),Pt(w),Pt(h)); tf=box.text_frame
  tf.margin_left=tf.margin_right=tf.margin_top=tf.margin_bottom=0; tf.word_wrap=False
  for i,line in enumerate(lines):
   p=tf.paragraphs[0] if i==0 else tf.add_paragraph(); p.text=line; p.font.name=PPT_FONT; p.font.size=Pt(size); p.font.bold=bold; p.font.color.rgb=color(c or self.p['ink'])
   p.line_spacing=Pt(leading); p.space_after=Pt(0); p.space_before=Pt(0)
   if link:
    for run in p.runs: run.hyperlink.address=link
  self.pdf.setFont(PDF_BOLD if bold else PDF_FONT,size); self.pdf.setFillColorRGB(*rgb(c or self.p['ink']))
  for i,line in enumerate(lines): self.pdf.drawString(x,H-y-size-i*leading,line)
  if link: self.pdf.linkURL(link,(x,H-y-h,x+w,H-y),relative=0,thickness=0)
  self.qa.append({'deck':self.deck,'slide':self.number,'text':text,'font_pt':size,'lines':len(lines),'box':[x,y,w,h]})
  return len(lines)*leading
 def bullets(self,items,x,y,w,h,size=20):
  if len(items)>4: raise ValueError(f'Slide {self.number}: more than four bullets')
  if not items:return
  each=(h-18*(len(items)-1))/len(items)
  for i,item in enumerate(items):
   yy=y+i*(each+18); self.rect(x,yy+7,5,5,self.p['accent']); self.text(item,x+20,yy,w-20,each,size,minsize=17)

def finance_chart(kind,finance):
 if kind=='payment_schedule':
  rows=finance['player_payment_schedule']; return dict(type='bar',title='Contract payment timing',labels=[str(r['year']) for r in rows],series=[dict(name='Salary paid',values=[r['player_payment_usd']/1e6 for r in rows])],unit='USD millions',caption='Illustrative calendar-year-end timing; 2024-2033 service, 2034-2043 deferred payments.')
 if kind=='pv_sensitivity':
  rows=finance['present_value_sensitivities']; return dict(type='bar',title='Original-decision salary-payment DCF',labels=[f"{r['discount_rate']:.0%}" for r in rows],series=[dict(name='Salary-payment present value',values=[r['total_player_payment_pv_usd']/1e6 for r in rows])],unit='USD millions',caption='Illustrative value at Dec. 31, 2023. Excludes CBT cash tax, alternative roster costs and other club cash flows.')
 if kind=='contribution_sensitivity':
  rows=[r for r in finance['sponsorship_sensitivity']['cases'] if r['attribution_fraction']==.5]
  return dict(type='bar',title='Hypothetical contribution at 50% attribution',labels=[f"{r['retained_net_contribution_margin']:.0%} margin" for r in rows],series=[dict(name='Annual contribution',values=[r['annual_attributable_contribution_usd']/1e6 for r in rows])],unit='USD millions / year',caption='Assumes $100m annual gross receipts, 50% increment, ten years, and zero fixed cost. No observed club result.')
 raise ValueError('Unknown finance chart '+kind)

def audit_finance(finance):
 if not finance:return {'status':'not supplied'}
 rows=finance['player_payment_schedule']
 if sum(r['player_payment_usd'] for r in rows)!=finance['nominal_contract']['total_usd']:raise ValueError('Finance schedule total mismatch')
 for r in rows:
  if r['t']!=r['year']-2023:raise ValueError('Finance original-decision year index mismatch')
 for s in finance['present_value_sensitivities']:
  pv=sum(r['player_payment_usd']/(1+s['discount_rate'])**r['t'] for r in rows)
  if abs(pv-s['total_player_payment_pv_usd'])>0.00001:raise ValueError('Finance independent DCF sum mismatch')
 return {'status':'pass','schedule_total_usd':sum(r['player_payment_usd'] for r in rows),'valuation_date':finance['valuation']['date'],'year_index':'year minus 2023','discounted_payment_sums':'pass'}

def fmt(v):
 if abs(v)>=1000:return f'{v:,.0f}'
 if float(v).is_integer():return f'{v:.0f}'
 return f'{v:.1f}'

def draw_chart(pg,c,x,y,w,h):
 labels=c['labels']; series=c['series']; n=len(labels)
 if not n or len(series)>3 or any(len(s['values'])!=n for s in series):raise ValueError('Invalid chart dimensions')
 vals=[float(v) for s in series for v in s['values']]
 if not all(math.isfinite(v) for v in vals):raise ValueError('Nonfinite chart value')
 pg.text(c.get('title',''),x,y,w,25,16,bold=True); pg.text(c.get('unit',''),x,y+28,w,17,10,c=pg.p['muted'])
 left=x+44; top=y+65; cw=w-57; ch=h-100; low=min(0,min(vals)); high=max(0,max(vals)); high=high if high!=low else low+1
 span=high-low; high+=span*.12
 rawstep=(high-low)/4;base=10**math.floor(math.log10(rawstep))
 tickstep=next(f*base for f in (1,2,2.5,5,10) if f*base>=rawstep)
 low=math.floor(low/tickstep)*tickstep;high=math.ceil(high/tickstep)*tickstep
 def yy(v):return top+ch*(high-v)/(high-low)
 for t in range(round((high-low)/tickstep)+1):
  v=low+tickstep*t; yt=yy(v); pg.line(left,yt,left+cw,yt,'DCE2E7',.6); pg.text(fmt(v),x,yt-6,38,15,9,c=pg.p['muted'])
 pg.line(left,yy(0),left+cw,yy(0),pg.p['muted'],1)
 step=cw/n; colors=[pg.p['accent'],pg.p['ink'],'8B99A7']; show_every=max(1,math.ceil(n/10))
 for si,s in enumerate(series):
  prev=None
  for i,v0 in enumerate(s['values']):
   v=float(v0); xx=left+step*(i+.5); yt=yy(v)
   if c.get('type','bar')=='line':
    if prev: pg.line(prev[0],prev[1],xx,yt,colors[si],2)
    pg.rect(xx-2.5,yt-2.5,5,5,colors[si],radius=2); prev=(xx,yt)
   else:
    bw=step*.64/len(series); bx=left+step*i+step*.18+si*bw; by=min(yy(0),yt); bh=abs(yy(0)-yt)
    if bh:pg.rect(bx,by,bw*.92,bh,colors[si])
   if n<=8: pg.text(fmt(v),xx-step*.4,yt-18,step*.8,15,10,bold=True)
  if len(series)>1:pg.rect(x+si*200,y+47,7,7,colors[si]); pg.text(s['name'],x+12+si*200,y+43,180,16,9)
 ticks=list(range(0,n,show_every))
 if ticks[-1]!=n-1:
  if n-1-ticks[-1]<show_every:ticks.pop()
  ticks.append(n-1)
 for i in ticks:pg.text(labels[i],left+step*i,top+ch+9,step*show_every*.95,25,10,minsize=8)

def draw_table(pg,t,x,y,w,h):
 headers=t['headers'];rows=t['rows'];cols=len(headers)
 if cols>5 or len(rows)>7 or any(len(r)!=cols for r in rows):raise ValueError('Table needs <=5 columns, <=7 rows and consistent columns')
 rowh=h/(len(rows)+1); colw=w/cols
 for i,row in enumerate([headers]+rows):
  pg.rect(x,y+i*rowh,w,rowh,pg.p['ink'] if i==0 else (pg.p['card'] if i%2 else pg.p['tint']))
  for j,cell in enumerate(row):pg.text(cell,x+j*colw+12,y+i*rowh+10,colw-24,rowh-16,15 if i==0 else 16,bold=i==0,c='FFFFFF' if i==0 else pg.p['ink'],minsize=12)

def normalize(content,finance):
 sources=copy.deepcopy(finance.get('sources',{}));sources.update(content.get('sources',{}))
 for sid,s in list(sources.items()):
  if isinstance(s,str):sources[sid]={'url':s,'title':sid}
  else:s.setdefault('title',s.get('name',sid))
  if sid=='FRED_MODEL':sources[sid]['url']='../finance.json'
 decks=content.get('decks',[])
 if isinstance(decks,dict):decks=[dict(v,id=k) for k,v in decks.items()]
 for d in decks:
  d['id']={'leadership':'owner','owner_agency':'owner','us_advertiser':'advertiser','satire':'internal','fictional':'internal'}.get(d['id'],d['id'])
  for s in d['slides']:
   s.setdefault('source_ids',s.get('sources',s.get('citations',[])))
   if isinstance(s['source_ids'],str):s['source_ids']=[s['source_ids']]
   if s.get('chart',{}).get('finance'):
    s['chart']=dict(finance_chart(s['chart']['finance'],finance),**{k:v for k,v in s['chart'].items() if k!='finance'})
   s.setdefault('layout','chart' if s.get('chart') else 'table' if s.get('table') else 'cards' if s.get('cards') else 'bullets')
 return decks,sources

def sources_slide(pg,ids,sources):
 if len(ids)>12:raise ValueError('Source appendix has more than 12 entries; divide into two slides')
 cols=2 if len(ids)>6 else 1; rows=math.ceil(len(ids)/cols); boxh=min(64,300/max(1,rows));cw=840/cols
 for i,sid in enumerate(ids):
  col=i//rows; row=i%rows; x=48+col*(cw+24);y=145+row*boxh;s=sources[sid]
  pg.text(f"[{sid}] {s['title']}",x,y,cw-16,27,12,bold=True,minsize=10,link=s.get('url'))
  url=s.get('url',''); domain=urlparse(url).netloc or Path(url).name
  pg.text(domain+' | '+s.get('date','Date in source notes'),x,y+28,cw-16,25,9,minsize=8,link=url)

def render(content,finance,out,fixture=False):
 decks,sources=normalize(content,finance); out.mkdir(parents=True,exist_ok=True);manifest={'schema_version':1,'sources':sources,'decks':[]};qa={'fixture_only':fixture,'finance':audit_finance(finance),'checks':[],'text_boxes':[]}; notes=[]; names=set()
 if not fixture and sorted(d['id'] for d in decks)!=['advertiser','internal','owner']:raise ValueError('Expected exactly owner, advertiser and internal decks')
 for d in decks:
  did=d['id'];p=PALETTES[did];slides=d['slides'];
  if not 8<=len(slides)<=10:raise ValueError(f'{did} needs 8-10 slides')
  rawname=re.sub(r'\.(html|pdf|pptx)$','',d.get('filename','st1-'+did).lower())
  name=re.sub(r'[^a-z0-9_-]','-',rawname).strip('-')
  if not name or name in names:raise ValueError('Output basenames must be unique')
  names.add(name);prs=Presentation();prs.slide_width=Pt(W);prs.slide_height=Pt(H);prs.core_properties.title=d['title'];prs.core_properties.author='ST-1 team';prs.core_properties.created=prs.core_properties.modified=datetime.datetime(2023,12,31)
  pdf=canvas.Canvas(str(out/(name+'.pdf')),pagesize=(W,H),invariant=1,pageCompression=1);pdf.setTitle(d['title']);pdf.setAuthor('ST-1 team');notes.append('# '+d['title']);used=[]
  for number,s in enumerate(slides,1):
   ids=s.get('source_ids',[])
   for sid in ids:
    if sid not in sources:raise ValueError(f'{did} slide {number}: unknown source {sid}')
    if sid not in used:used.append(sid)
   pg=Page(prs,pdf,p,qa['text_boxes'],number,did);layout=s['layout'];pg.rect(48,34,38,4,p['accent'])
   pg.text(s.get('kicker',d.get('subtitle','')).upper(),98,26,770,25,10,bold=True,c=p['muted'],minsize=9)
   pg.text(s['title'],48,65,850,83,32,bold=True,minsize=27)
   if s.get('subtitle'):pg.text(s['subtitle'],48,145,850,48,17,minsize=15,c=p['muted'])
   y=205 if s.get('subtitle') else 160; bh=440-y
   if layout=='cover':
    pg.rect(48,y,850,260,p['ink'],radius=10);pg.text(s.get('callout',d.get('subtitle','')),76,y+22,790,80,29,bold=True,c='FFFFFF',minsize=24)
    if s.get('bullets'):pg.text('\n'.join(s['bullets']),76,y+115,790,120,17,c='FFFFFF',minsize=15)
   elif layout=='sources':sources_slide(pg,ids or used,sources)
   elif layout=='chart':
    side=s.get('bullets',[]);chartw=530 if side else 850;draw_chart(pg,s['chart'],48,y,chartw,bh-38)
    if side:pg.bullets(side,610,y+12,285,bh-40,18)
    caption=s['chart'].get('caption',s.get('callout',''))
    if caption:pg.text(caption,48,440,850,35,11,minsize=10,c=p['muted'])
   elif layout=='table':draw_table(pg,s['table'],48,y,850,bh-35)
   elif layout=='cards':
    cards=s['cards'];n=len(cards)
    if n not in (2,3,4):raise ValueError('Cards layout requires 2-4 cards')
    gap=20;cw=(850-gap*(n-1))/n
    for i,card in enumerate(cards):
     x=48+i*(cw+gap); cardh=160 if n==4 else bh-25
     pg.rect(x,y,cw,cardh,p['card'],radius=10);pg.rect(x,y,cw,5,p['accent']);pg.text(card.get('label','').upper(),x+16,y+16,cw-32,43,10,bold=True,c=p['muted']);pg.text(card.get('value',''),x+16,y+63,cw-32,62,28,bold=True,minsize=21,c=p['accent']);pg.text(card.get('detail',''),x+16,y+128,cw-32,27,13,minsize=10)
    if n==4 and s.get('bullets'):
     summary=s['bullets'][1:3] if did=='owner' else [s['bullets'][-1]]
     pg.text('\n'.join(summary),48,y+173,850,bh-173,15,minsize=13,c=p['muted'])
   else:
    callout=s.get('callout');pg.bullets(s.get('bullets',[]),48,y,850,bh-(70 if callout else 0),21)
    if callout:pg.rect(48,405,850,60,p['tint'],radius=8);pg.text(callout,66,417,814,40,16,bold=True,minsize=14)
   if layout not in ('cover','chart','bullets','sources') and s.get('callout'):pg.text(s['callout'],48,440,850,35,12,minsize=10,c=p['muted'])
   if layout!='sources' and ids:
    # IDs link to the full evidence appendix; selected visible URLs link directly.
    for j,sid in enumerate(ids[:3]):
     url=sources[sid].get('url',''); domain=urlparse(url).netloc or Path(url).name; width=850/min(len(ids),3)
     pg.text('['+sid+'] '+domain,48+j*width,478,width-12,29,9,minsize=8,c=p['muted'],link=url)
   pg.line(48,513,898,513,p['tint'])
   footer='FICTIONAL SATIRE: Greg/Fred story and dialogue invented. Real contract examples are cited.' if did=='internal' else ('ORIGINAL-DECISION ILLUSTRATION | assumptions and exclusions apply' if did=='owner' else 'PROPOSED CAMPAIGN | rights and category clearance required')
   pg.text(footer,48,519,800,14,9,minsize=8,c=p['muted']);pg.text(f'{number:02d} / {len(slides):02d}',850,519,48,14,9,c=p['muted'])
   fullnotes=clean(s.get('notes',''))+'\n\nSlide copy:\n'+'\n'.join(s.get('bullets',[]))
   if did=='internal':fullnotes='Fictional story, personnel events and dialogue. No claims about actual misconduct.\n'+fullnotes
   if s.get('chart',{}).get('caption'):fullnotes+='\n'+s['chart']['caption']
   fullnotes+='\n\nSources:\n'+'\n'.join(f"[{sid}] {sources[sid]['title']} {sources[sid].get('date','')}\n{sources[sid].get('url','')}\nLimit: {sources[sid].get('limit','')}" for sid in ids)
   pg.slide.notes_slide.notes_text_frame.text=fullnotes;notes.append(f"\n## {number}. {s['title']}\n\n{fullnotes}");pdf.showPage()
  if not any(s['layout']=='sources' for s in slides):raise ValueError(did+' missing source appendix')
  pdf.save();ppt=out/(name+'.pptx');prs.save(ppt);stable_pptx(ppt)
  reopened=Presentation(ppt)
  if len(reopened.slides)!=len(slides):raise ValueError('PPTX slide count mismatch')
  manifest['decks'].append({'id':did,'title':d['title'],'slides':len(slides),'source_ids':used,'pptx':name+'.pptx','pdf':name+'.pdf','slide_sources':[{'slide':i,'title':s['title'],'source_ids':s.get('source_ids',[]),'chart_data':s.get('chart')} for i,s in enumerate(slides,1)]})
  qa['checks'].append({'deck':did,'slides':len(slides),'bounds':'pass','text_fit':'pass','source_ids':'pass','pptx_reopen':'pass','fiction_footer':'pass' if did=='internal' else 'not applicable'})
 (out/'sources.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n');(out/'notes.md').write_text('\n\n'.join(notes)+'\n');(out/'qa.json').write_text(json.dumps(qa,indent=2,ensure_ascii=False)+'\n');(out/'content-schema.json').write_text(json.dumps(SCHEMA,indent=2)+'\n')
 hashes={f.name:hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(out.iterdir()) if f.suffix in ('.pdf','.pptx')}
 (out/'sha256.json').write_text(json.dumps(hashes,indent=2)+'\n')
 return manifest

def selftest():
 # The fixture exercises layout only; it is never financial or campaign content.
 src={'TEST':dict(title='Renderer QA fixture, no factual claims',url='https://example.org/fixture',limit='Synthetic values for export checks only.')}
 slides=[dict(layout='cover',title='Renderer fixture only',callout='Layout and export validation',source_ids=['TEST']),dict(title='Bullet layout',bullets=['The first sentence checks line wrapping and spacing.','A second sentence tests the common content grid.','The third sentence tests export parity.'],callout='Synthetic copy only.',source_ids=['TEST']),dict(layout='cards',title='Three editable cards',cards=[dict(label='Example '+str(i),value=str(i*10),detail='Synthetic detail checks a fixed text box.') for i in range(1,4)],source_ids=['TEST']),dict(layout='chart',title='Editable chart equivalents',chart=dict(type='bar',title='Synthetic values',labels=['A','B','C'],series=[dict(name='Fixture',values=[10,20,30])],unit='Fixture units',caption='These are synthetic QA values.'),source_ids=['TEST']),dict(layout='chart',title='Signed values',chart=dict(type='line',labels=['A','B','C'],series=[dict(name='Fixture',values=[-2,0,3])],unit='Fixture units'),source_ids=['TEST']),dict(layout='table',title='Table layout',table=dict(headers=['Item','Value'],rows=[['Synthetic A','10'],['Synthetic B','20']]),source_ids=['TEST']),dict(title='Four bullets',bullets=['First test.','Second test.','Third test.','Fourth test.'],source_ids=['TEST']),dict(layout='sources',title='Fixture evidence appendix',source_ids=['TEST'])]
 return dict(schema_version=1,sources=src,decks=[dict(id='internal',title='Renderer fixture only',filename='qa-fixture',slides=slides)])

def main():
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--content',type=Path);ap.add_argument('--finance',type=Path,default=Path(__file__).resolve().parent/'finance.json');ap.add_argument('--out',type=Path,default=Path(__file__).resolve().parent/'decks');ap.add_argument('--schema',action='store_true');ap.add_argument('--self-test',action='store_true');args=ap.parse_args()
 if args.schema:print(json.dumps(SCHEMA,indent=2));return
 if not args.self_test and not args.content:ap.error('--content is required unless --schema or --self-test is used')
 finance=json.loads(args.finance.read_text()) if args.finance.exists() else {}
 content=selftest() if args.self_test else json.loads(args.content.read_text())
 result=render(content,finance,args.out,fixture=args.self_test);print(json.dumps({'output':str(args.out),'decks':[{k:d[k] for k in ('id','slides','pptx','pdf')} for d in result['decks']]},indent=2))
if __name__=='__main__':main()
