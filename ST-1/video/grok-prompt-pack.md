# Grok Imagine prompt pack: The Greg blunder (documentary cut)

Source script: [greg-blunder-script.md](greg-blunder-script.md). Fictional parody shot like a sports documentary. 63 shots, 600 seconds, 16:9, 1183 spoken words. Elliott generates the clips and edits them together. Every spoken line below matches the script word for word.

## Grok Imagine limits this pack is built on

Checked October 13, 2026. Run one test clip before the full batch.

| Limit | What the sources say | Source |
| --- | --- | --- |
| Clip length | 1 to 15 seconds per generation, default 8 | [xAI docs, video generation](https://docs.x.ai/developers/model-capabilities/video/generation); [xAI Imagine API page](https://x.ai/api/imagine) |
| Longer shots | Video extension adds 2 to 10 new seconds from the last frame | [thoxakihiko prompt guide](https://github.com/thoxakihiko/grok-imagine-prompt-1.5-guide/tree/main) (community, cross-checked against xAI docs) |
| Aspect ratio | 16:9 supported, plus 9:16, 1:1, 4:3, 3:4, 3:2, 2:3 (API also lists 21:9, 5:2). Image-to-video keeps the source image's ratio | xAI Imagine API page |
| Resolution | 480p, 720p, 1080p. Reference-to-video tops out at 720p | xAI docs |
| Audio | Generated in the same pass: dialogue with lip-sync, effects, ambience, music | [Vercel AI Gateway model page](https://vercel.com/ai-gateway/models/grok-imagine-video-1.5); [Morphic guide](https://morphic.com/resources/how-to/grok-imagine-video-1-5-guide) |
| Character consistency | Reference-to-video takes up to 14 reference images and 3 voice references | [xAI Imagine overview](https://docs.x.ai/developers/model-capabilities/imagine) |
| Prompt structure | One subject, one action, one camera move, then lighting and sound. The clip follows prompt order. For image-to-video, describe motion and sound only | Morphic guide; thoxakihiko guide |

Uncertain: consumer-app limits may differ from the API (one July 2026 report says 720p on SuperGrok, 480p on X Premium, [AI Business Weekly](https://aibusinessweekly.net/p/grok-video-generation)). Lip-sync quality on long lines is unverified. Text rendering inside generated video is undocumented, so every number and card goes in during editing.

## Workflow

1. Make one still per character with Grok Imagine Image from the character sheet. Save as `ref-greg.png`, `ref-fred.png`, and so on.
2. For each shot, paste the global style line, then the character tokens for everyone in frame, then the shot prompt. Attach the matching reference stills.
3. Generate at 16:9, 720p, at the listed length. Shots over 15 seconds: generate 15 seconds, then extend.
4. Record NARRATOR and all interview answers as voiceover in one session. Use Grok's native audio for ambience and effects only, and for short recreation lines if the lip-sync holds.
5. Add every card, lower-third and number in the editor, copied from this pack.

## Global style line (paste first in every prompt)

> Stylized 3D cartoon characters filmed like a serious sports documentary: muted film color, soft grain, shallow depth of field, single-source window light for interviews, VHS texture and gate weave for recreations, slow deliberate camera, no real logos, no network branding, no real brand names, no real people's likenesses, 16:9.

## Character sheet (paste the token text exactly, every time)

| Token | Paste this |
| --- | --- |
| GREG | a cartoon man in his 40s, friendly round face, slightly sunburned pink cheeks and nose, short dark hair, blue mirrored sunglasses, loud red-and-yellow Hawaiian shirt with green palm-leaf print, khaki shorts, clumsy overconfident posture |
| GREG-BEACH | GREG, plus a black wetsuit worn half-zipped under the open Hawaiian shirt, snorkel mask pushed up on his forehead, holding a fishing pole with a tiny orange fish on the line |
| FRED | a sleek friendly white accounting robot, rounded rectangular body, flat monitor face glowing soft blue with two white dot eyes and a short line mouth, thin metal arms, small blue status LEDs on the chest |
| EXEC | a cartoon former team executive, bald man in his 60s, grey suit, red tie, tired worried eyebrows |
| ANALYST | a cartoon baseball analyst, tall man in his 30s, short curly hair, rolled shirtsleeves, green tie, calm measured gestures |
| COLLEAGUE | a cartoon woman in her 50s, reading glasses on a chain, oatmeal cardigan, kind face, holding a mug |
| FAN | a cartoon lifelong fan, man in his 60s, grey stubble, plain blue team-color jersey with no logo or lettering |
| FAN 2 | a cartoon fan in his 30s, beard, plain grey t-shirt |
| STAR | a generic baseball star seen only in silhouette or from behind, plain white jersey with the number 17, plain cap with no logo, face never shown |

Sets: LIBRARY (ANALYST interviews) = leather chair, dark bookshelves out of focus, window light from left. OFFICE (EXEC) = dim office, venetian-blind shadows. KITCHEN (COLLEAGUE) = warm kitchen, window light. DARK STUDIO (FRED) = black backdrop, one key light. BOARDROOM (recreations) = long wooden table, seven chairs, faded color. Every ballpark is generic, with no signage text.

## Shot list

Each shot gives the ID, start time, length, prompt, camera, graphics, audio lines and SFX/music. Add the token text for each character named in capitals.

### Cold open (0:00)

**S01** | 0:00 | 6s
- Prompt: Grainy VHS-texture footage of an empty generic ballpark at dawn, mist over the outfield grass, one row of seats lit by low sun.
- Camera: Locked-off wide, very slow push-in.
- Graphics (add in edit): Film grain, light gate weave.
- Audio: NARRATOR: "Every office has a story it doesn't tell at parties. Ours starts here."
- SFX/music: Single sustained low piano note. Distant wind.

**S02** | 0:06 | 10s
- Prompt: Archival-style footage, faded colors: an office hallway in the 1990s style, a man in a loud Hawaiian shirt seen only from behind, walking away under flickering fluorescent lights. GREG.
- Camera: Slow push-in from far end of the hallway.
- Graphics (add in edit): VHS tracking lines at the edges.
- Audio: NARRATOR: "What if I told you the most expensive decision in baseball was made by one man, with one calculator, in about four seconds?"
- SFX/music: Piano melody begins, slow and minor.

**S03** | 0:16 | 9s
- Prompt: Close-up, grainy: a large desk calculator held upside down in a man's hands on a wooden boardroom table.
- Camera: Macro, slow push-in.
- Graphics (add in edit): none
- Audio: NARRATOR: "What if I told you he was holding it upside down, and nobody in the room said a word?"
- SFX/music: Strings enter softly under piano.

**S04** | 0:25 | 10s
- Prompt: Archival-style footage of a generic stadium at night, full crowd, seen from high in the upper deck, slightly overexposed.
- Camera: Slow tilt down to the field.
- Graphics (add in edit): none
- Audio: NARRATOR: "And what if I told you he would get a second chance, and make the same call again, with more confidence?"
- SFX/music: Strings swell, then pull back.

**S05** | 0:35 | 3s
- Prompt: Black screen. A single desk lamp clicks on over an empty interview chair in a dark room.
- Camera: Static.
- Graphics (add in edit): none
- Audio: NARRATOR: "This is the story of Greg."
- SFX/music: Lamp click. Piano holds one chord.

**S06** | 0:38 | 10s
- Prompt: Sit-down interview: COLLEAGUE in a cardigan in a warm kitchen set, holding a mug with both hands, window light.
- Camera: Medium close-up, slow push-in.
- Graphics (add in edit): Lower-third: "FORMER COLLEAGUE OF GREG"
- Audio: COLLEAGUE: "Greg was our accountant for nine years. He was good with receipts. He was very good with receipts. Contracts were newer."
- SFX/music: Kitchen ambience, piano under.

### Title (0:48)

**S07** | 0:48 | 8s
- Prompt: Plain black card. White serif title text fades up slowly, then a smaller line below it.
- Camera: Static.
- Graphics (add in edit): Title card: "THE GREG BLUNDER" then smaller "a documentary". No network or series logos.
- Audio: none
- SFX/music: Piano resolves on one note. Silence.

### Chapter 1: The player (0:56)

**S08** | 0:56 | 3s
- Prompt: Black card with white serif chapter text.
- Camera: Static.
- Graphics (add in edit): Chapter card: "I. THE PLAYER"
- Audio: none
- SFX/music: Room tone.

**S09** | 0:59 | 16s (generate 15s, then extend 1s)
- Prompt: Grainy archival-style recreation: STAR in silhouette at home plate swings, the ball rises into a night sky, crowd blurred behind.
- Camera: Slow motion, low angle, slow tilt up.
- Graphics (add in edit): Lower note: "2024: 54 HR, 59 SB (E16)"
- Audio: NARRATOR: "He is a hitter. He is also a pitcher. In 2024, Shohei Ohtani hit 54 home runs and stole 59 bases. In 2025 he hit 55 more, and he went back to the mound."
- SFX/music: Muffled crowd roar under piano.

**S10** | 1:15 | 8s
- Prompt: STAR in silhouette on a pitcher's mound at dusk, winding up, in slow motion. Grain, warm faded color.
- Camera: Long lens, slow push-in.
- Graphics (add in edit): Lower note: "4 MVP awards, all unanimous (E17)"
- Audio: NARRATOR: "Four Most Valuable Player awards. Every vote, every time, unanimous. Nobody in baseball had seen anything like it."
- SFX/music: Strings hold.

**S11** | 1:23 | 17s (generate 15s, then extend 2s)
- Prompt: Sit-down interview: ANALYST in a leather chair in a dark library set, one window light from the left, bookshelves out of focus.
- Camera: Medium close-up, imperceptible push-in.
- Graphics (add in edit): Lower-third: "THE ANALYST / Baseball economics"
- Audio: ANALYST: "Most teams pay one player to hit and another player to pitch. The Dodgers pay one man to do both jobs, and he only takes up one roster spot. Do the math. Greg did not."
- SFX/music: Room tone, faint clock.

**S12** | 1:40 | 17s (generate 15s, then extend 2s)
- Prompt: Slow pan across a dim archival-style table covered in old newspapers and sponsor brochures with blank, unreadable covers. Gold desk lamp light.
- Camera: Slow lateral dolly.
- Graphics (add in edit): Lower note: "$125M, 2026 estimate, worldwide. Paid to Ohtani, not to the team. (E07, E08)"
- Audio: NARRATOR: "Off the field, Forbes and Sportico each project about $125 million in endorsements for 2026. A record for any athlete. That money goes to the player. The team gets the wins. Greg would forget that."
- SFX/music: Piano returns.

### Chapter 2: The first fumble (1:57)

**S13** | 1:57 | 3s
- Prompt: Black card with white serif chapter text.
- Camera: Static.
- Graphics (add in edit): Chapter card: "II. THE FIRST FUMBLE"
- Audio: none
- SFX/music: Room tone.

**S14** | 2:00 | 14s
- Prompt: Sit-down interview: EXEC in a grey suit in a dim office set, venetian-blind shadows across the wall, hands folded.
- Camera: Medium close-up, slow push-in.
- Graphics (add in edit): Lower-third: "FORMER ANGELS EXECUTIVE"
- Audio: EXEC: "We knew him. He'd played for us. We had the clubhouse, the fans, even the parking spot. All we had to do was say yes. That was the whole plan."
- SFX/music: Piano, sparse.

**S15** | 2:14 | 8s
- Prompt: Grainy VHS recreation: BOARDROOM, seven executives around a long table, GREG standing at the far end holding a big calculator upside down, chest puffed out.
- Camera: Wide, static, slight camcorder wobble.
- Graphics (add in edit): Overlay: "RECREATION"
- Audio: NARRATOR: "The meeting lasted eleven minutes." GREG: "Seven hundred million dollars. For a baseball player. Gentlemen, I've run the numbers."
- SFX/music: Camcorder hiss, clock ticking.

**S16** | 2:22 | 5s
- Prompt: Grainy VHS recreation: GREG turns the calculator screen toward the table with a proud grin. An executive's coffee cup tips over in the background.
- Camera: Medium, handheld.
- Graphics (add in edit): Insert: calculator display "0.00L"
- Audio: EXEC: "What do they say?" GREG: "They say no." NARRATOR: "The room went quiet."
- SFX/music: Silence, then a cup clatter.

**S17** | 2:27 | 13s
- Prompt: Sit-down interview: EXEC stares at the floor, then up to the interviewer, off-lens.
- Camera: Close-up, very slow push-in.
- Graphics (add in edit): none
- Audio: EXEC: "I asked him if he'd read the payment schedule. He said, 'I read the first number. The first number was enough.' I think about that every day."
- SFX/music: Long pause in room tone.

**S18** | 2:40 | 10s
- Prompt: Sit-down interview: COLLEAGUE in a cardigan in a warm kitchen set, holding a mug with both hands.
- Camera: Medium close-up, static.
- Graphics (add in edit): Lower-third: "FORMER COLLEAGUE OF GREG"
- Audio: COLLEAGUE: "Greg was a confident man. He was confident about lunch. He was confident about the stapler. He never opened page two of anything."
- SFX/music: Faint kitchen ambience.

**S19** | 2:50 | 9s
- Prompt: Sit-down interview: COLLEAGUE smiles fondly into her mug.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: COLLEAGUE: "He once sent back a birthday cake because the candles were a recurring cost. We loved him. We still do."
- SFX/music: Kitchen ambience.

**S20** | 2:59 | 4s
- Prompt: Extreme close-up, grainy: a stapled contract on a table; the top corner lifts in a breeze, page two untouched.
- Camera: Macro, static.
- Graphics (add in edit): none
- Audio: none
- SFX/music: Paper rustle. One low string note.

### Chapter 3: Page two (3:03)

**S21** | 3:03 | 3s
- Prompt: Black card with white serif chapter text.
- Camera: Static.
- Graphics (add in edit): Chapter card: "III. PAGE TWO"
- Audio: none
- SFX/music: Room tone.

**S22** | 3:06 | 19s (generate 15s, then extend 4s)
- Prompt: Archival-style slow pan down a typed contract page on a desk, a hand-drawn timeline in pencil running from left to right, warm lamp light.
- Camera: Top-down, slow drift.
- Graphics (add in edit): Graphic: "$700M total. $680M deferred. $2M a year now. $68M a year, 2034 to 2043. No interest. (E01, E02)"
- Audio: NARRATOR: "Page two said this. Ohtani deferred $680 million of the $700 million. He takes $2 million a year while he plays. The rest arrives in $68 million payments from 2034 to 2043, with no interest. Greg had read page one."
- SFX/music: Piano, slow arpeggio.

**S23** | 3:25 | 17s (generate 15s, then extend 2s)
- Prompt: Sit-down interview: ANALYST leans forward, elbows on knees.
- Camera: Close-up, slow push-in.
- Graphics (add in edit): Graphic: "Present value, AP luxury-tax method: about $461M. Luxury-tax charge: about $46M a year. (E03, E04)"
- Audio: ANALYST: "Money paid in 2043 costs less than money paid today. On the luxury-tax books, that deal is about $461 million in today's dollars. About $46 million a year. Greg saw seventy. The real charge was forty-six."
- SFX/music: Room tone.

**S24** | 3:42 | 5s
- Prompt: Grainy recreation: a pen signs a contract in slow motion on a table in a generic blue-accented office; confetti drifts down past the lens out of focus.
- Camera: Macro, slow motion.
- Graphics (add in edit): none
- Audio: NARRATOR: "The Dodgers signed him before Greg found his reading glasses."
- SFX/music: Strings rise, then a single pluck.

**S25** | 3:47 | 9s
- Prompt: Sit-down interview: EXEC, silent, rubs his forehead and exhales.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: EXEC: "I still have the calculator. It's in my desk. I don't know why I kept it. I think it's evidence."
- SFX/music: Room tone, long silence after the line.

**S26** | 3:56 | 18s (generate 15s, then extend 3s)
- Prompt: Sit-down interview: ANALYST in the library set, raising one hand to make a fair point.
- Camera: Medium close-up, static.
- Graphics (add in edit): Lower note: "Deferred pay must be funded in advance under the labor agreement (E05)"
- Audio: ANALYST: "To be fair to Greg, deferred money is still money. The Dodgers have to fund it years in advance under the labor agreement. It is a real cost. It is just not seven hundred million dollars of cost."
- SFX/music: Room tone.

### Chapter 4: The machine (4:14)

**S27** | 4:14 | 3s
- Prompt: Black card with white serif chapter text.
- Camera: Static.
- Graphics (add in edit): Chapter card: "IV. THE MACHINE"
- Audio: none
- SFX/music: Room tone.

**S28** | 4:17 | 13s
- Prompt: SERVER ROOM at night, blue LEDs blinking in sequence. FRED rolls slowly out of the dark and his monitor face lights up blue.
- Camera: Slow dolly toward FRED.
- Graphics (add in edit): none
- Audio: NARRATOR: "Back at our agency, a new hire was reviewing the books. His name was Fred. Fred is an accounting bot. Fred has never taken a lunch break."
- SFX/music: Server hum. Piano in a higher register.

**S29** | 4:30 | 11s
- Prompt: Sit-down interview: FRED seated upright in an interview chair in a dark studio, single key light, monitor face glowing soft blue.
- Camera: Medium close-up, slow push-in.
- Graphics (add in edit): Lower-third: "FRED / Controller"
- Audio: FRED: "I was asked to audit my predecessor's work. A drawer opened. Folders fell out. One was labeled 'Vibes.' I picked it up. I opened it."
- SFX/music: Quiet electronic hum.

**S30** | 4:41 | 4s
- Prompt: Grainy recreation: folders spill across a grey office floor; one lands face up in the center.
- Camera: High angle, slow motion.
- Graphics (add in edit): Folder label: "VIBES"
- Audio: none
- SFX/music: Papers flutter, one low string note.

**S31** | 4:45 | 13s
- Prompt: Sit-down interview: FRED tilts his monitor face slightly, as if remembering.
- Camera: Close-up, very slow push-in.
- Graphics (add in edit): Insert: spreadsheet with one cell: "Too much"
- Audio: FRED: "His model contained one spreadsheet. The spreadsheet contained one cell. The cell read 'Too much.' There were no formulas. There was a coffee ring. I recalculated."
- SFX/music: Long pause. Fan whir.

### Chapter 5: The numbers (4:58)

**S32** | 4:58 | 3s
- Prompt: Black card with white serif chapter text.
- Camera: Static.
- Graphics (add in edit): Chapter card: "V. THE NUMBERS"
- Audio: none
- SFX/music: Room tone.

**S33** | 5:01 | 11s
- Prompt: FRED's monitor face shows a slowly scrolling blue spreadsheet grid; reflections of the numbers move across his white casing.
- Camera: Macro on the screen, slow push-in.
- Graphics (add in edit): Graphic: "$13.9M per win, 2025 (FanGraphs, E18). 2025: 9.4 WAR, best in the NL (E17)."
- Audio: FRED: "FanGraphs puts the price of a win in 2025 at about $13.9 million. Ohtani produced 9.4 wins above replacement. The best in the National League."
- SFX/music: Soft clicks, piano.

**S34** | 5:12 | 14s
- Prompt: Grainy archival-style footage: two stacks of old coins on a dark table, one tall, one short, lit by a single lamp.
- Camera: Slow lateral dolly between the stacks.
- Graphics (add in edit): Graphic: "9.4 x $13.9M = about $131M. Illustrative, pending controller sign-off. Luxury-tax charge: about $46M a year."
- Audio: FRED: "That is about $131 million of on-field value in one season. Against about $46 million a year on the tax. Before tickets. Before sponsors. Before a whole country tuned in."
- SFX/music: Strings, slow.

**S35** | 5:26 | 11s
- Prompt: Sit-down interview: ANALYST in the library set, measured.
- Camera: Medium close-up, slow push-in.
- Graphics (add in edit): none
- Audio: ANALYST: "Fred's math is a sketch. Wins are not dollars in a bank. But cut his number in half and you are still above forty-six."
- SFX/music: Room tone.

**S36** | 5:37 | 15s
- Prompt: Archival-style footage of a full generic ballpark at golden hour, slow pan across the crowd, faces soft and blurred.
- Camera: Slow pan.
- Graphics (add in edit): Graphic: "12 Japan-based partners, about $70M (2024, estimate, E10). 4,012,470 home attendance (2025, E13)."
- Audio: NARRATOR: "In 2024, the Dodgers added 12 Japan-based sponsors, an estimated $70 million in new sponsorship revenue. In 2025, they drew 4,012,470 fans at home. A franchise record. The most in baseball."
- SFX/music: Muffled crowd, piano.

**S37** | 5:52 | 10s
- Prompt: Sit-down interview: FRED, still. His LEDs flicker red once, then return to blue.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "I cannot credit all of that to one player. I can tell you it did not go down. And Greg passed on this."
- SFX/music: A single electric crackle.

**S38** | 6:02 | 5s
- Prompt: Sit-down interview: FRED, a tiny wisp of smoke rising from his shoulder. A small robotic arm pats it out.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "I'm fine. That was an emotion. I have deleted it."
- SFX/music: Soft hiss. Silence.

**S39** | 6:07 | 6s
- Prompt: Grainy recreation: a thick bound report lands on a boardroom table with a thud.
- Camera: Top-down, static.
- Graphics (add in edit): none
- Audio: NARRATOR: "Fred filed his report. It was forty pages long. Greg read the title."
- SFX/music: Thud. Piano.

### Chapter 6: Again (6:13)

**S40** | 6:13 | 3s
- Prompt: Black card with white serif chapter text.
- Camera: Static.
- Graphics (add in edit): Chapter card: "VI. AGAIN"
- Audio: none
- SFX/music: Room tone.

**S41** | 6:16 | 12s
- Prompt: Grainy VHS recreation: BOARDROOM in faded color. GREG at a whiteboard covered in dollar signs and a frowning face, tapping it with a marker.
- Camera: Wide, slow push-in.
- Graphics (add in edit): Overlay: "RECREATION". Whiteboard: "$$$ = BAD"
- Audio: NARRATOR: "In this story, the Angels got one more chance to bring him back to Anaheim. Greg had not changed his mind. Greg had made a whiteboard."
- SFX/music: Clock ticking. Piano returns, darker.

**S42** | 6:28 | 9s
- Prompt: Grainy VHS recreation: GREG shakes his head confidently. EXEC slides a thick report across the table toward him.
- Camera: Medium, handheld.
- Graphics (add in edit): none
- Audio: GREG: "History repeats itself. Too expensive." EXEC: "Greg, Fred's report says he's worth almost three times what he costs against the tax."
- SFX/music: Paper slide.

**S43** | 6:37 | 7s
- Prompt: Grainy VHS recreation: GREG pushes the report back without looking. A black speakerphone in the middle of the table glows blue.
- Camera: Top-down on the table.
- Graphics (add in edit): none
- Audio: GREG: "Fred is a toaster." FRED: "I am a certified controller." GREG: "Then what do you make?" FRED: "Corrections."
- SFX/music: Speaker crackle.

**S44** | 6:44 | 10s
- Prompt: Sit-down interview: EXEC, eyes closed for a moment, then opens them.
- Camera: Close-up, very slow push-in.
- Graphics (add in edit): none
- Audio: EXEC: "We listened to Greg. Again. I want that on the record. Not once. Twice. I have a son. He asks me about it."
- SFX/music: Long silence in room tone.

**S45** | 6:54 | 3s
- Prompt: Archival-style slow motion: a stadium crowd booing, blurred; a hot dog tumbles through the frame, mustard first.
- Camera: Slow motion, static.
- Graphics (add in edit): none
- Audio: NARRATOR: "The fans had seen enough."
- SFX/music: Muffled boos under a slow string swell.

### Chapter 7: Ohio (6:57)

**S46** | 6:57 | 3s
- Prompt: Black card with white serif chapter text.
- Camera: Static.
- Graphics (add in edit): Chapter card: "VII. OHIO"
- Audio: none
- SFX/music: Room tone.

**S47** | 7:00 | 9s
- Prompt: EXEC in a grey suit stands alone at the edge of a tall cornfield at dusk, holding a folded paper map upside down. A red tractor passes far behind him.
- Camera: Extreme wide, locked off.
- Graphics (add in edit): Overlay: "Fictional rumor"
- Audio: NARRATOR: "Then the rumor began. An Angels front office, people said, was exploring opportunities in Ohio." EXEC: "Is Columbus nice in April?"
- SFX/music: Wind, crickets, distant tractor.

**S48** | 7:09 | 12s
- Prompt: Sit-down interview: ANALYST, deadpan, in the library set.
- Camera: Medium close-up, static.
- Graphics (add in edit): none
- Audio: ANALYST: "If your accountant costs you the best player on Earth twice, you start looking at maps. Usually other people's maps. And Ohio has not been told."
- SFX/music: Room tone.

### Chapter 8: The people (7:21)

**S49** | 7:21 | 3s
- Prompt: Black card with white serif chapter text.
- Camera: Static.
- Graphics (add in edit): Chapter card: "VIII. THE PEOPLE"
- Audio: none
- SFX/music: Room tone.

**S50** | 7:24 | 16s (generate 15s, then extend 1s)
- Prompt: Sit-down interview: FAN in a plain blue team-color jersey with no logo, seated on bleachers in an empty ballpark at dusk.
- Camera: Medium close-up, slow push-in.
- Graphics (add in edit): Lower-third: "LIFELONG FAN"
- Audio: FAN: "Greg cost us Shohei. Twice. I'd let Fred do my taxes. I'd let Fred raise my kids. My son asked me, 'Who's Greg?' I said, 'Exactly.' Fred never would have done that to us."
- SFX/music: Distant ballpark wind.

**S51** | 7:40 | 10s
- Prompt: Archival-style footage: a plain grey t-shirt with printed words, turned inside out by unseen hands; the inside reads differently.
- Camera: Close-up, slow motion.
- Graphics (add in edit): Lower-third: "ANOTHER FAN". Shirt text: "GREG WAS RIGHT" then "FRED"
- Audio: FAN 2: "I made a 'Greg Was Right' shirt. I made it before the numbers came out. I wear it inside out now."
- SFX/music: Piano, a little lighter.

### Chapter 9: The mail room (7:50)

**S52** | 7:50 | 3s
- Prompt: Black card with white serif chapter text.
- Camera: Static.
- Graphics (add in edit): Chapter card: "IX. THE MAIL ROOM"
- Audio: none
- SFX/music: Room tone.

**S53** | 7:53 | 15s
- Prompt: Grainy black-and-white security-camera footage of an office mail room. A blurred figure in a Hawaiian shirt hugs a grey trash can by a postage machine. Envelopes slide slowly off a shelf. No gross detail.
- Camera: Fixed high corner angle.
- Graphics (add in edit): Timestamp overlay: "8:02 AM". Blur over the figure.
- Audio: NARRATOR: "Greg was let go. The next morning, he came back. He was last seen in the mail room. He had a trash can. He had a plan. Only one of those worked."
- SFX/music: Fluorescent buzz. Strings, very low.

**S54** | 8:08 | 14s
- Prompt: Sit-down interview: COLLEAGUE in the kitchen set, looks into her mug, chooses her words.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: COLLEAGUE: "He was very loud. And he was not dry. We'll leave it there, out of respect for the mail room. He was a good man having a bad week."
- SFX/music: Kitchen ambience.

**S55** | 8:22 | 7s
- Prompt: Sit-down interview: FRED in the dark studio.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "I ordered new envelopes. I did not bill Greg for them. That was my gift."
- SFX/music: Electronic hum.

### Chapter 10: Avalon (8:29)

**S56** | 8:29 | 3s
- Prompt: Black card with white serif chapter text.
- Camera: Static.
- Graphics (add in edit): Chapter card: "X. AVALON"
- Audio: none
- SFX/music: Gulls, distant.

**S57** | 8:32 | 15s
- Prompt: Faded home-video footage of a sunny island harbor, white boats, palm trees. GREG-BEACH walks the dock waving a fishing pole with a tiny orange fish.
- Camera: Handheld wide, slow pan.
- Graphics (add in edit): Overlay: "Catalina Island"
- Audio: NARRATOR: "Days later, Greg was seen on Catalina Island, celebrating his freedom. He had a fishing pole, a snorkel mask, and a tiny fish. He kept yelling 'Too expensive!' at the ferry."
- SFX/music: Gulls, water lapping, a ferry horn.

**S58** | 8:47 | 14s
- Prompt: Faded home-video footage: GREG-BEACH reaches for a small boat, slips on the wet dock in slow motion, sits down hard. A seagull takes his snorkel mask and flies off. Cartoon slapstick, no injury shown.
- Camera: Slow motion, medium wide.
- Graphics (add in edit): none
- Audio: NARRATOR: "He walked down the Avalon dock toward a boat he believed was his. It was not his boat. The owner of the boat was very kind about it."
- SFX/music: Slow-motion slip, gull squawk, then piano alone.

**S59** | 9:01 | 14s
- Prompt: A cartoon rescue helicopter lifts off from the harbor carrying a stretcher; GREG-BEACH gives a thumbs up, one foot in a white cast.
- Camera: Wide, slow tilt up.
- Graphics (add in edit): none
- Audio: NARRATOR: "Greg broke his ankle. He was airlifted to Harbor Point Medical Center." FRED: "Air ambulance plus emergency room. Estimated cost exceeds Greg's entire forecasting budget. He should have asked me first."
- SFX/music: Rotor wash fading into strings.

### Epilogue (9:15)

**S60** | 9:15 | 14s
- Prompt: Sit-down interview: ANALYST in the library set, final answer.
- Camera: Close-up, slowest push-in.
- Graphics (add in edit): none
- Audio: ANALYST: "People ask me if it's the best contract of all time. I tell them the honest thing. We will know in 2043. But Greg's answer was wrong both times."
- SFX/music: Piano theme begins.

**S61** | 9:29 | 7s
- Prompt: Sit-down interview: EXEC in his office set, a small sad smile.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: EXEC: "If I could go back, I'd turn the calculator over. That's it. That's the whole lesson."
- SFX/music: Piano.

**S62** | 9:36 | 18s (generate 15s, then extend 3s)
- Prompt: Sit-down interview: FRED in the dark studio. The key light warms slightly.
- Camera: Close-up, slowest push-in of the film.
- Graphics (add in edit): none
- Audio: FRED: "A contract is not a price tag. It is wins, tickets, sponsors, and a country watching at home. Greg saw a number. I saw a deal. I do not miss Greg. But I check page two every day."
- SFX/music: Piano theme, full and slow.

**S63** | 9:54 | 6s
- Prompt: The empty interview chair from the cold open; the desk lamp clicks off. Black.
- Camera: Static, fade to black.
- Graphics (add in edit): End card: "Subscribe for Part 3: GREG ON CRUTCHES", then the disclaimer card.
- Audio: NARRATOR: "Greg is expected to make a full recovery. He called the helicopter overpriced."
- SFX/music: Final piano chord rings out.

## Assembly guide

1. Order: S01 to the last shot in sequence. Shot lengths add up to 600 seconds (10:00).
2. Pacing: lengths assume about 140 spoken words a minute plus a beat of silence after each line. Leave the silences in. The deadpan depends on them.
3. Narrator: record slowly in a low register, close to the microphone, with no smile in the voice. Pause one full second after each "What if I told you" line.
4. Interviews: record each talking head in one take where possible. Keep FRED's voice calm and slightly synthetic, the same in every shot.
5. Cards: white serif text on black, fade in over one second. Use the generic card "a documentary" only. No network or series logos.
6. Lower-thirds: thin white rule and small caps, bottom left, on screen for four seconds.
7. Score: one melancholy piano theme with low strings, reused through every chapter, full only in the epilogue.
8. Disclaimer card (final three seconds or the video description): "Fictional parody. Greg, Fred, the second chance, the Ohio rumor, the mail room scene, the Catalina incident and Harbor Point Medical Center are invented. Contract, statistics and commercial figures are real and cited in ST-1/research/evidence.md (E01 to E05, E07, E08, E10, E13, E16 to E18). Endorsement figures are worldwide estimates of Ohtani's personal income, not Dodgers revenue. The $131 million figure is illustrative."
9. Before publishing, check every clip for real logos, team wordmarks or real faces. Regenerate any clip that has one.
