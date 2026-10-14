# Grok Imagine prompt pack: The Greg blunder

Source script: [greg-blunder-script.md](greg-blunder-script.md) (commit 15970db). Fictional parody. 64 shots, 600 seconds total, 16:9. Elliott generates the clips and edits them together.

## Grok Imagine limits this pack is built on

Checked October 13, 2026. Grok Imagine changes often, so run one test clip before generating the full batch.

| Limit | What the sources say | Source |
| --- | --- | --- |
| Clip length | 1 to 15 seconds per generation, default 8 | [xAI docs, video generation](https://docs.x.ai/developers/model-capabilities/video/generation); [xAI Imagine API page](https://x.ai/api/imagine) |
| Longer scenes | Stitch separate clips, or use video extension, which adds 2 to 10 new seconds from the last frame | [thoxakihiko prompt guide](https://github.com/thoxakihiko/grok-imagine-prompt-1.5-guide/tree/main) (community guide, cross-checked against xAI docs) |
| Aspect ratio | 16:9 is supported (also 9:16, 1:1, 4:3, 3:4, 3:2, 2:3; API also lists 21:9 and 5:2). Image-to-video keeps the source image's ratio | xAI Imagine API page |
| Resolution | 480p, 720p, 1080p. Reference-to-video tops out at 720p | xAI docs |
| Audio | Native audio in the same pass: dialogue with lip-sync, sound effects, ambience, music | [Vercel AI Gateway model page](https://vercel.com/ai-gateway/models/grok-imagine-video-1.5); [Morphic guide](https://morphic.com/resources/how-to/grok-imagine-video-1-5-guide) |
| Character consistency | Reference-to-video takes up to 14 reference images and 3 voice references on grok-imagine-video-1.5 | [xAI Imagine overview](https://docs.x.ai/developers/model-capabilities/imagine) |
| Prompt structure | One subject, one action, one camera move, lighting, then sound. Put the first action first, because the clip follows prompt order. For image-to-video, describe motion and sound only | Morphic guide; thoxakihiko guide |

Uncertain:
- Consumer-app limits may differ from the API. One July 2026 article reports 720p on SuperGrok and 480p on X Premium ([AI Business Weekly](https://aibusinessweekly.net/p/grok-video-generation)).
- Lip-sync quality for longer lines is unverified. One review calls it "functional," not studio grade.
- Legible on-screen text and numbers are not documented anywhere. This pack keeps every graphic and number out of the video prompt and adds them in the edit, so figures stay exact.

## Workflow

1. Generate one still per character with Grok Imagine Image from the character sheet below. Save them as `ref-greg.png`, `ref-fred.png`, and so on.
2. For each shot, use reference-to-video with the matching stills attached, or image-to-video from a still of that shot. Paste the global style line, then the character tokens for everyone in frame, then the shot prompt.
3. Generate at 16:9, 720p, at the duration listed. Short lines (FRED, GREG, EXEC, FANS) can use native lip-sync audio. Record ANCHOR, NARRATOR and ANALYST lines longer than about 12 words as voiceover and lay them in during editing.
4. Add every on-screen graphic and number in the editor, copied from this pack.

## Global style line (paste first in every prompt)

> Stylized 3D cartoon, bright saturated colors, soft studio lighting, sports-news parody look with clean broadcast graphics space at the bottom of frame, no real logos, no real brand names, no real people's likenesses, 16:9.

## Character sheet (paste the token text exactly, every time)

| Token | Paste this |
| --- | --- |
| GREG | a cartoon man in his 40s, friendly round face, slightly sunburned pink cheeks and nose, short dark hair, blue mirrored sunglasses, loud red-and-yellow Hawaiian shirt with green palm-leaf print, khaki shorts, clumsy overconfident posture |
| GREG-BEACH | GREG, plus a black wetsuit worn half-zipped under the open Hawaiian shirt, snorkel mask pushed up on his forehead, holding a fishing pole with a tiny orange fish dangling from the line |
| FRED | a sleek friendly white accounting robot, rounded rectangular body, flat monitor for a face glowing soft blue, two white dot eyes and a short line mouth on the screen, thin metal arms, small blue status LEDs on the chest |
| ANCHOR | a cartoon news anchor, woman in her 50s, silver bob haircut, navy blazer, calm serious expression, seated at a glass news desk |
| ANALYST | a cartoon sports analyst, tall man in his 30s, short curly hair, rolled shirtsleeves, green tie, energetic hand gestures |
| EXEC | a cartoon team executive, bald man in his 60s, grey suit, red tie, worried eyebrows |
| STAR | a generic baseball star seen only in silhouette or from behind, plain white jersey with the number 17, plain blue cap with no logo, face never shown |
| FANS | cartoon baseball fans outside a generic stadium, mixed ages, plain team-color shirts with no logos |

Sets (reuse wording): NEWSROOM = glass news desk, blue and white video wall, city skyline backdrop. BOARDROOM = long wooden table, seven chairs, window over a generic stadium, red accents. SERVER ROOM = dark room, humming server racks, blinking blue LEDs. STADIUM = generic open-air ballpark at night, full stands, no signage text.

## Shot list

Format: ID | time | seconds | prompt | camera | graphics (edit) | audio lines | SFX/music. Every graphic and number is copied from the script.

### Cold open (0:00 to 0:30)

**S01** | 0:00 | 8s
- Prompt: NEWSROOM. Red light bars sweep across the video wall, then settle. Empty desk.
- Camera: fast push-in toward the desk.
- Graphics: ticker "BREAKING: ANGELS FRONT OFFICE IN CHAOS"
- Audio: none.
- SFX/music: breaking-news sting, drum hits.

**S02** | 0:08 | 12s
- Prompt: ANCHOR at NEWSROOM desk holds one sheet of paper at arm's length, then sets it down and looks into the lens.
- Camera: medium shot, static.
- Graphics: ticker continues.
- Audio (VO): ANCHOR: "Good evening. Tonight's story isn't a trade or an injury. It's an accountant. His name is Greg, and he may have made the most expensive mistake in sports history. Twice."
- SFX/music: low tension bed.

**S03** | 0:20 | 6s
- Prompt: ANCHOR leans forward slightly and raises one eyebrow.
- Camera: close-up, slow push-in.
- Audio (lip-sync or VO): ANCHOR: "We checked the math three times. Our accountant checked it a fourth time. Our accountant is a robot."
- SFX/music: bed holds.

**S04** | 0:26 | 4s
- Prompt: Abstract gold light streaks collide in the center of the frame on a dark blue background.
- Camera: static.
- Graphics: title card "THE GREG BLUNDER"
- Audio: none.
- SFX/music: drumline hit, whoosh.

### Who is the star? (0:30 to 1:45)

**S05** | 0:30 | 12s
- Prompt: STADIUM. STAR, seen from behind at home plate, swings and sends a ball high into the night sky. The crowd jumps.
- Camera: low angle behind the batter, slow tilt up following the ball.
- Audio (VO): NARRATOR: "To understand the blunder, you have to understand the player. Shohei Ohtani hits. He also pitches."
- SFX/music: bat crack, crowd roar, upbeat sports theme.

**S06** | 0:42 | 10s
- Prompt: STADIUM. STAR in silhouette on the pitcher's mound winds up and throws. A batter swings and misses.
- Camera: wide side angle, static.
- Graphics: "2024: 54 HR, 59 SB"
- Audio (VO): NARRATOR: "In 2024 he hit 54 home runs and stole 59 bases."
- SFX/music: glove pop, crowd cheer.

**S07** | 0:52 | 8s
- Prompt: STADIUM. STAR in silhouette jogs around the bases as fireworks burst above the stands.
- Camera: wide, slow pan.
- Graphics: "2025: 55 HR"
- Audio (VO): NARRATOR: "In 2025 he hit 55 more and went back to the mound."
- SFX/music: fireworks, theme continues.

**S08** | 1:00 | 12s
- Prompt: Four gold trophies rise one at a time from a glossy blue floor and glow.
- Camera: slow dolly left to right.
- Graphics: "4 MVP awards. All unanimous."
- Audio: none.
- SFX/music: four rising chimes.

**S09** | 1:12 | 10s
- Prompt: NEWSROOM side set. ANALYST at a touchscreen tactics board draws one big circle around two small player icons with his finger.
- Camera: medium shot, slight push-in.
- Audio (VO): ANALYST: "Most teams pay one star to hit and another to pitch. The Dodgers pay one man to do both, and he uses one roster spot."
- SFX/music: marker squeak.

**S10** | 1:22 | 10s
- Prompt: Cartoon gold coins pour down from the top of frame into a tall glass column that fills to the top. Blue background.
- Camera: static, centered.
- Graphics: "$125M, 2026 estimate, worldwide. Paid to Ohtani, not to the team."
- Audio (VO): NARRATOR: "Off the field, Forbes and Sportico each project about $125 million in endorsements for 2026. That would be a record for any athlete."
- SFX/music: coins clinking.

**S11** | 1:32 | 13s
- Prompt: ANALYST turns from the tactics board to face the lens and taps his temple.
- Camera: medium close-up, static.
- Audio (VO): ANALYST: "Put the brands aside for a second. That money goes to him. What the team gets is the wins. Keep that in mind, because Greg didn't."
- SFX/music: theme fades.

### The first fumble (1:45 to 3:00)

**S12** | 1:45 | 10s
- Prompt: Sepia-toned STADIUM exterior on a sunny day, empty parking lot, one reserved spot marked by a plain yellow sign with a star symbol.
- Camera: slow push-in on the parking spot.
- Graphics: sepia filter; ticker "FLASHBACK: FREE AGENCY"
- Audio (VO): NARRATOR: "Free agency. The Angels already knew him. They had the clubhouse, the fans and the parking spot with his name on it. All they had to do was say yes."
- SFX/music: old-film flicker, soft piano.

**S13** | 1:55 | 8s
- Prompt: Sepia BOARDROOM. Seven executives, EXEC at the head, look up as GREG stands at the far end holding a big calculator upside down.
- Camera: wide shot down the length of the table.
- Audio: none.
- SFX/music: clock ticking.

**S14** | 2:03 | 8s
- Prompt: GREG puffs out his chest and raises the upside-down calculator.
- Camera: medium shot of GREG, slight low angle.
- Audio (lip-sync): GREG: "Seven hundred million dollars. For a baseball player. Gentlemen, I've run the numbers."
- SFX/music: none.

**S15** | 2:11 | 10s
- Prompt: EXEC asks a question, eyebrows raised. GREG turns the calculator screen toward the table with a proud grin.
- Camera: over-the-shoulder from EXEC toward GREG.
- Graphics: insert of the calculator display "0.00L"
- Audio (lip-sync): EXEC: "What do they say?" GREG: "They say 'no.'"
- SFX/music: record scratch on "no."

**S16** | 2:21 | 6s
- Prompt: A young intern in the background flinches and drops a paper coffee cup, which splashes on the carpet.
- Camera: medium shot, quick.
- Audio: none.
- SFX/music: cup splat.

**S17** | 2:27 | 10s
- Prompt: EXEC leans forward, worried. GREG waves a hand dismissively.
- Camera: alternating medium shots, or one wide two-shot.
- Audio (lip-sync): EXEC: "Did you read the payment schedule?" GREG: "I read the first number. The first number was enough."
- SFX/music: none.

**S18** | 2:37 | 13s
- Prompt: Sepia BOARDROOM empties slowly as executives walk out, leaving GREG alone, smiling.
- Camera: slow pull-back.
- Audio (VO): NARRATOR: "According to our entirely made-up insiders, Greg's analysis stopped at the headline. He never opened page two."
- SFX/music: soft piano.

**S19** | 2:50 | 10s
- Prompt: Extreme close-up of a stapled paper contract on the table. The top corner lifts a little in a breeze, showing page two untouched.
- Camera: macro, slow push-in.
- Audio: none.
- SFX/music: paper rustle, one dramatic sting.

### The deal Greg missed (3:00 to 4:15)

**S20** | 3:00 | 12s
- Prompt: Clean white studio. A giant glossy gold block shatters into one small block and many smaller blocks that float into a row.
- Camera: static wide.
- Graphics: "$700M" breaking into "$2M a year now" and "$68M a year, 2034 to 2043"
- Audio (VO): NARRATOR: "Here's what was on page two. Ohtani deferred $680 million of the $700 million. He takes $2 million a year while he plays."
- SFX/music: glass shatter, bright synth.

**S21** | 3:12 | 10s
- Prompt: A row of ten gold blocks slides along a timeline and lands far off to the right.
- Camera: slow pan following the blocks.
- Graphics: timeline "2034 to 2043. No interest."
- Audio (VO): NARRATOR: "The rest arrives in $68 million payments from 2034 to 2043, with no interest."
- SFX/music: sliding whoosh.

**S22** | 3:22 | 15s
- Prompt: NEWSROOM side set. ANALYST points at the video wall, which shows a large blue bar shrinking into a smaller bar.
- Camera: medium shot, slow push-in.
- Graphics: "Present value, AP luxury-tax method: about $461M. Luxury-tax charge: about $46M a year."
- Audio (VO): ANALYST: "Money paid in 2043 costs less than money paid today. On the luxury-tax books, the $700 million deal works out to about $461 million in today's dollars, or about $46 million a year. Greg panicked at seventy. The real charge is forty-six."
- SFX/music: light synth bed.

**S23** | 3:37 | 8s
- Prompt: ANCHOR at NEWSROOM desk turns toward the ANALYST and asks a question.
- Camera: two-shot.
- Audio (lip-sync): ANCHOR: "So what did the Dodgers do?"
- SFX/music: bed holds.

**S24** | 3:45 | 10s
- Prompt: ANALYST grins and mimes signing a paper with a flourish.
- Camera: medium close-up.
- Audio (lip-sync): ANALYST: "They signed him before Greg found his reading glasses."
- SFX/music: rimshot.

**S25** | 3:55 | 10s
- Prompt: Confetti cannons fire over the NEWSROOM desk. One piece of confetti lands in ANCHOR's coffee mug.
- Camera: wide, then static.
- Audio: none.
- SFX/music: confetti pop, party horn.

**S26** | 4:05 | 10s
- Prompt: ANCHOR looks into the mug, shrugs, and drinks the coffee.
- Camera: close-up.
- Audio: none.
- SFX/music: sip, music button.

### Enter Fred (4:15 to 5:15)

**S27** | 4:15 | 15s
- Prompt: SERVER ROOM. The lights dim. FRED rolls in from the dark and his monitor face lights up blue.
- Camera: slow dolly toward FRED.
- Audio (VO): NARRATOR: "Back at our agency, a new hire was reviewing the books. His name is Fred. Fred is an accounting bot. Fred has never taken a lunch break, because Fred doesn't know what lunch is."
- SFX/music: server hum, soft electronic theme.

**S28** | 4:30 | 10s
- Prompt: FRED turns to a grey metal filing cabinet. His screen shows a loading bar.
- Camera: medium shot.
- Audio (lip-sync, robotic voice): FRED: "Initiating audit of predecessor's work."
- SFX/music: beep.

**S29** | 4:40 | 12s
- Prompt: A filing drawer slides open by itself and folders spill onto the floor. One folder lands face up in the center.
- Camera: high angle looking down at the floor.
- Graphics: folder label "VIBES"
- Audio: none.
- SFX/music: drawer slide, papers flutter.

**S30** | 4:52 | 8s
- Prompt: FRED holds up a single sheet of paper and tilts his monitor face, puzzled.
- Camera: close-up on FRED.
- Graphics: insert of a spreadsheet with one cell reading "Too much"
- Audio (lip-sync): FRED: "Predecessor's model contains one spreadsheet. The spreadsheet contains one cell. The cell reads 'Too much.'"
- SFX/music: cooling fans whir louder.

**S31** | 5:00 | 15s
- Prompt: FRED stares at the sheet in silence, then his screen fills with scrolling blue numbers.
- Camera: slow push-in on FRED's screen.
- Audio (lip-sync, after a 3-second pause): FRED: "There are no formulas. There is a coffee ring. Recalculating."
- SFX/music: fans whir, processing chirps.

### Fred runs the numbers (5:15 to 6:30)

**S32** | 5:15 | 12s
- Prompt: FRED's monitor face changes into a glowing spreadsheet grid. He gestures to a floating holographic panel.
- Camera: medium shot, slow orbit.
- Graphics: "$13.9M per win, 2025 (FanGraphs)"
- Audio (VO in FRED's voice): FRED: "Step one. Price of a win. FanGraphs reports that teams paid about $13.9 million per win in 2025 for free agents projected at two or more wins above replacement."
- SFX/music: spreadsheet clicks.

**S33** | 5:27 | 10s
- Prompt: STAR silhouette appears on the holographic panel next to FRED, glowing.
- Camera: static.
- Graphics: "2025: 9.4 WAR, best in the NL"
- Audio (VO): FRED: "Step two. Ohtani's 2025 FanGraphs value was 9.4 wins above replacement, the best in the National League."
- SFX/music: chime.

**S34** | 5:37 | 12s
- Prompt: Two holographic stacks of coins appear: a tall stack on the left and a short stack on the right. FRED points at each.
- Camera: medium wide.
- Graphics: "9.4 x $13.9M = about $131M. Illustrative. Pending controller sign-off." Right stack: "about $46M a year"
- Audio (VO): FRED: "Nine point four times thirteen point nine is about $131 million of on-field value for one season. His luxury-tax charge is about $46 million a year."
- SFX/music: coin stack sounds.

**S35** | 5:49 | 6s
- Prompt: ANALYST in NEWSROOM side set nods and holds up a finger.
- Camera: medium close-up.
- Audio (lip-sync): ANALYST: "And that's before anything off the field."
- SFX/music: none.

**S36** | 5:55 | 15s
- Prompt: FRED stands beside a holographic panel showing twelve small generic building icons appearing one by one, then a full stadium crowd icon.
- Camera: slow push-in.
- Graphics: "12 Japan-based partners (2024, estimate). 4.01M home attendance (2025)."
- Audio (VO): FRED: "Correct. In 2024 the Dodgers added 12 Japan-based sponsors, an estimated $70 million in new sponsorship revenue. In 2025 they drew 4,012,470 fans at home, a franchise record and the most in baseball. I can't credit all of that to one player. I can tell you it didn't go down."
- SFX/music: twelve soft pops, crowd swell.

**S37** | 6:10 | 10s
- Prompt: FRED's LEDs flicker red, his screen glitches, and small sparks pop from his shoulders.
- Camera: close-up, slight shake.
- Audio (lip-sync, voice pitching up): FRED: "Greg... passed... on... this?"
- SFX/music: electric crackle, alarm beep.

**S38** | 6:20 | 10s
- Prompt: A tiny robotic arm unfolds from FRED's side and sprays a tiny fire extinguisher at his own shoulder. White mist. FRED's screen returns to calm blue.
- Camera: medium shot.
- Audio (lip-sync): FRED: "I'm fine. That was an emotion. I have deleted it."
- SFX/music: extinguisher hiss, calm beep.

### The second chance (6:30 to 7:30)

**S39** | 6:30 | 8s
- Prompt: BOARDROOM in full color. GREG stands at a whiteboard covered with dollar signs and a frowning face.
- Camera: wide.
- Graphics: ticker "SOURCES: ANGELS GET SECOND SHOT"; whiteboard text "$$$ = BAD" added in edit.
- Audio (VO): NARRATOR: "In this fictional universe, the Angels got one more shot to bring Ohtani back to Anaheim."
- SFX/music: tense strings.

**S40** | 6:38 | 8s
- Prompt: GREG taps the whiteboard twice with a marker and shakes his head confidently.
- Camera: medium shot.
- Audio (lip-sync): GREG: "History repeats itself. Too expensive."
- SFX/music: marker taps.

**S41** | 6:46 | 8s
- Prompt: EXEC slides a thick report across the table toward GREG.
- Camera: over-the-shoulder from GREG.
- Audio (lip-sync): EXEC: "Greg, Fred's report says he's worth almost three times what he costs against the tax."
- SFX/music: paper slide.

**S42** | 6:54 | 6s
- Prompt: GREG pushes the report back without looking at it.
- Camera: close-up on GREG.
- Audio (lip-sync): GREG: "Fred is a toaster."
- SFX/music: none.

**S43** | 7:00 | 8s
- Prompt: A black speakerphone in the middle of the table lights up blue. Everyone leans toward it.
- Camera: top-down on the table.
- Audio (VO, robotic, slightly tinny): FRED: "I am a certified controller. I also don't make toast. I checked."
- SFX/music: speaker crackle.

**S44** | 7:08 | 6s
- Prompt: GREG folds his arms and squints at the speakerphone through his mirrored sunglasses.
- Camera: close-up.
- Audio (lip-sync then VO): GREG: "Then what do you make?" FRED: "Corrections."
- SFX/music: rimshot.

**S45** | 7:14 | 6s
- Prompt: EXEC puts his face in his hands.
- Camera: medium shot.
- Audio (VO): NARRATOR: "The Angels listened to Greg. Again."
- SFX/music: sad trombone.

**S46** | 7:20 | 10s
- Prompt: STADIUM crowd boos. A hot dog in a bun flies past the lens in slow motion, mustard leading.
- Camera: crowd wide, then slow-motion close pass.
- Audio: none.
- SFX/music: crowd boos, slow-motion whoosh.

### Fallout: the Ohio rumor (7:30 to 8:15)

**S47** | 7:30 | 10s
- Prompt: ANCHOR at NEWSROOM desk, straight face, a cartoon map of the United States on the wall behind her.
- Camera: medium shot.
- Graphics: ticker "ANGELS EXPLORING... OHIO?"
- Audio (VO): ANCHOR: "Fictional sources tell us a frustrated Angels front office is now 'exploring opportunities in Ohio.'"
- SFX/music: quirky pizzicato.

**S48** | 7:40 | 10s
- Prompt: EXEC in his grey suit stands at the edge of a tall green cornfield holding a folded paper map upside down.
- Camera: wide, static.
- Audio (lip-sync): EXEC: "Is Columbus nice in April?"
- SFX/music: wind, crickets.

**S49** | 7:50 | 15s
- Prompt: A red tractor drives past behind EXEC. EXEC waves. The cartoon farmer driving it does not wave back.
- Camera: wide, slow pan with the tractor.
- Audio: none.
- SFX/music: tractor engine.

**S50** | 8:05 | 10s
- Prompt: ANALYST in NEWSROOM side set shrugs, then answers ANCHOR with a deadpan face.
- Camera: two-shot.
- Audio (VO and lip-sync): ANALYST: "If your accountant costs you the best player on Earth twice, you start looking at maps. Usually other people's maps." ANCHOR: "Has anyone told Ohio?" ANALYST: "Ohio has not been told."
- SFX/music: pizzicato button.

### Fans react (8:15 to 9:00)

**S51** | 8:15 | 9s
- Prompt: FANS, outside STADIUM. A woman in a plain blue shirt talks to the lens, pointing angrily.
- Camera: handheld medium close-up.
- Graphics: lower third "FAN 1"
- Audio (lip-sync): FAN 1: "Greg cost us Shohei. Twice. Revoke his parking spot. Then paint over it."
- SFX/music: street crowd ambience.

**S52** | 8:24 | 12s
- Prompt: FANS. A cheerful man in a plain white shirt holds a calculator to his heart.
- Camera: handheld medium close-up.
- Audio (lip-sync): FAN 2: "I'd let Fred do my taxes. I'd let Fred raise my kids. Fred would remember their birthdays."
- SFX/music: ambience.

**S53** | 8:36 | 12s
- Prompt: FANS. A man in a plain grey t-shirt with printed words on the front talks, then pulls the shirt off and turns it inside out.
- Camera: handheld medium shot.
- Graphics: shirt text "GREG WAS RIGHT", then "FRED" (add in edit)
- Audio (lip-sync): FAN 3: "I made this before the numbers came out."
- SFX/music: ambience, fabric rustle.

**S54** | 8:48 | 6s
- Prompt: FANS. A young kid holding a big foam finger looks up, confused.
- Camera: handheld close-up at kid height.
- Audio (lip-sync): FAN 4: "Who's Greg?"
- SFX/music: ambience.

**S55** | 8:54 | 6s
- Prompt: FANS. An older man pats the kid's head and nods.
- Camera: two-shot.
- Audio (lip-sync): FAN 5: "Exactly."
- SFX/music: music sting.

### Greg's last day (9:00 to 9:15)

**S56** | 9:00 | 10s
- Prompt: Grainy black-and-white security camera view of an office mail room. GREG hugs a grey trash can next to a postage machine. A stack of envelopes slides slowly off a shelf. Played for slapstick; no gross detail.
- Camera: fixed high corner angle, static.
- Graphics: timestamp overlay "8:02 AM", soft blur over GREG
- Audio (VO): NARRATOR: "Our CFO let Greg go. Greg came back the next morning and was last seen in the mail room. Witnesses describe him as 'very loud' and 'not dry.'"
- SFX/music: fluorescent buzz.

**S57** | 9:10 | 5s
- Prompt: Same security view. The envelopes finish falling.
- Camera: static.
- Audio (VO): NARRATOR: "We'll leave it there, out of respect for the mail room." FRED (off-screen): "I have ordered new envelopes."
- SFX/music: paper flop.

### The Catalina incident (9:15 to 9:40)

**S58** | 9:15 | 6s
- Prompt: Sunny island harbor with white boats and palm trees. GREG-BEACH strolls along the dock, waving the fishing pole.
- Camera: wide, slow pan.
- Graphics: ticker "DEVELOPING: GREG SPOTTED ON CATALINA ISLAND"
- Audio (VO): ANCHOR: "Days later, Greg turned up on Catalina Island, celebrating what he called his freedom."
- SFX/music: seagulls, ukulele.

**S59** | 9:21 | 5s
- Prompt: A sunburned cartoon tourist holding a rainbow shave ice talks to the lens. In the background, GREG-BEACH shouts at a passing ferry.
- Camera: handheld medium close-up.
- Audio (lip-sync): TOURIST: "He kept yelling 'Too expensive!' at the ferry. The ferry didn't care."
- SFX/music: ferry horn.

**S60** | 9:26 | 6s
- Prompt: GREG-BEACH reaches for a small boat, slips on the wet dock in slow motion, and lands on his backside. Seagulls scatter. One seagull lands, grabs his snorkel mask, and flies off. Cartoon slapstick, no injury shown.
- Camera: medium wide, slow motion.
- Audio (VO): NARRATOR: "He headed down the Avalon dock toward a boat he believed was his. It was not his boat."
- SFX/music: slide whistle, splash, seagull squawks.

**S61** | 9:32 | 4s
- Prompt: A cartoon rescue helicopter lifts off from the harbor carrying a stretcher with GREG-BEACH waving a thumbs up, one foot in a big white cast.
- Camera: wide, tilt up.
- Audio (VO): NARRATOR: "Greg broke his ankle and was airlifted to Hoag Hospital in Newport Beach." FRED: "Air ambulance plus emergency room. Estimated cost exceeds Greg's entire forecasting budget. He should have asked me first."
- SFX/music: helicopter rotor.

**S62** | 9:36 | 4s
- Prompt: ANCHOR at NEWSROOM desk gives a small reassuring smile.
- Camera: medium close-up.
- Audio (VO): ANCHOR: "Doctors expect a full recovery. Sources say Greg has already called the helicopter 'overpriced.'"
- SFX/music: light button.

### Outro (9:40 to 10:00)

**S63** | 9:40 | 12s
- Prompt: NEWSROOM. FRED sits in the co-anchor chair next to ANCHOR, wearing a tiny navy tie. He speaks to the lens.
- Camera: two-shot, slow push-in on FRED.
- Audio (lip-sync and VO): FRED: "A contract is more than its price tag. You count the wins, the tickets, the sponsors and the country watching at home. Greg read one number. I read the payment schedule." ANCHOR: "That's the Greg blunder. Fred, we salute you."
- SFX/music: theme returns.

**S64** | 9:52 | 8s
- Prompt: FRED dips his monitor face one small notch in a nod. Lights fade.
- Camera: close-up, static, fade to black.
- Graphics: end card "Subscribe for Part 3: GREG ON CRUTCHES". Disclaimer card (see below).
- Audio (lip-sync): FRED: "Saluting is not in my budget. I will nod."
- SFX/music: theme button, end.

## Assembly guide

1. Order: S01 to S64 in sequence. Section start times match the script's timestamps.
2. Runtime check: the shot durations add up to 600 seconds (10:00). The 9:00 to 9:40 sections hold about 110 spoken words in 40 seconds, which is faster than the rest of the script. Let those shots run 10 to 15 seconds long, or trim S57 and S61 lines. Expect a final cut of about 10:00 to 10:30.
3. Voiceover: record ANCHOR, NARRATOR and ANALYST in one session, in a dry room, at about 150 words a minute. Use the same synthetic or human voice for FRED in every shot, slightly robotic, with a short pause before "Recalculating" and "Corrections." Attach a voice reference if you use reference-to-video.
4. Native audio: keep Grok's generated SFX and ambience. Replace any generated dialogue that drifts from the script wording.
5. Graphics: add every number from the Graphics lines in the editor, unchanged. Do not let the model render them.
6. Disclaimer card (final 3 seconds, or the video description): "Fictional parody. Greg, Fred, the Angels' second chance, the Ohio rumor, the mail room scene and the Catalina incident never happened. Contract, statistics and commercial figures are real and cited in ST-1/research/evidence.md (E01 to E04, E07, E08, E10, E13, E16 to E18). Endorsement figures are worldwide estimates of Ohtani's personal income, not Dodgers revenue. The $131 million figure is illustrative."
7. Safety check before publishing: no real logos, team wordmarks or real faces in any clip. Regenerate any clip where the model invents one.
