# Grok Imagine prompt pack: The Greg blunder (YouTube documentary, two parts)

Source scripts: [Part 1](greg-blunder-part1-script.md) and [Part 2](greg-blunder-part2-script.md). Fictional parody shot as an authentic YouTube documentary. Both scripts and this pack come from one shot list, so every spoken line matches word for word. Elliott generates the clips and edits them together.

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
2. For each shot, paste the global style line, then the token text for every character named in capitals, then the set text, then the shot prompt. Attach the matching reference stills.
3. Generate at 16:9, 720p, at the listed length. For shots over 15 seconds, generate 15 seconds, then extend.
4. Record the narrator and every interview answer as voiceover. Use native audio for room tone and ambience only, unless lip-sync on a short recreation line holds up.
5. Add every card, lower-third and number in the editor, copied from this pack.

## Global style line (paste first in every prompt)

> Authentic YouTube documentary look: natural window light or practical lamps, shot on a mirrorless camera or iPhone, slight handheld movement, real rooms (home offices, conference rooms, a backyard, a car), imperfect framing, light digital noise, no film grain or color grading, realistic everyday people.

Add to every prompt that shows a person: "invented face, not based on any real person or photo; no real logos or team wordmarks."

## Character sheet (paste the token text exactly, every time)

All characters are realistic people with made-up faces. None is based on a real person or real photos.

| Token | Paste this |
| --- | --- |
| GREG | a realistic man in his early 40s with an invented face, short slightly thinning dark hair, round friendly face, a bit sunburned, blue mirrored sunglasses pushed up on his head, loud Hawaiian palm-print shirt, dark jeans |
| GREG-BEACH | GREG wearing a black wetsuit, Hawaiian shirt open over it, blue mirrored sunglasses pushed up, holding a fishing pole |
| FRED | an AI controller: a desk terminal with a glowing blue screen and a small speaker grille, no face, calm synthetic voice |
| ELLIOTT | a realistic CFO in his late 30s to 40s with an invented face, neat short hair, navy suit, open collar, calm |
| CAROLINA | a realistic woman in her late 30s with an invented face, dark shoulder-length hair, cream blazer, minimal gold jewelry, warm and sharp |
| MARKUS | a realistic man in his 60s with an invented face, fictional owner Markus Schultz, silver hair, charcoal suit, no tie |
| ANGELS EXEC | a realistic former team executive in his 60s with an invented face, bald, grey suit, red tie, tired |
| ANALYST | a realistic analyst in his 30s with an invented face, short curly hair, rolled shirtsleeves, green tie |
| COLLEAGUE | a realistic woman in her 50s with an invented face, reading glasses on a chain, oatmeal cardigan, holding a mug |
| FAN | a realistic man in his 60s with an invented face, grey stubble, plain blue jersey with no logo or lettering |
| FAN 2 | a realistic woman in her 20s with an invented face, ponytail, plain white jersey with the number 17 and no other lettering |
| STAR | a baseball player shown only as a backlit silhouette or from behind, plain white jersey with the number 17, plain cap with no logo, face never shown |
| GOSSIP HOST | voice only; never shown |

Interview setup for every talking head: YouTube-style sit-down, lav mic visible on the collar, window light or a ring light, a bookshelf or real room behind, camera on a tripod at eye level with slight drift.

Rooms: ELLIOTT = a glass-walled conference room. MARKUS = a home study with a window. ANALYST = a home office with a bookshelf. CAROLINA = a bright home office with mood boards. COLLEAGUE = her home kitchen. FRED = a desk in a quiet home office. Archive material is phone footage, old phone photos, screen recordings and security-camera clips, not VHS. Every ballpark is generic, with no signage text. Captions, cards and lower-thirds go in during editing.

## Part 1 shot list: Part One: The Memo (52 shots, 8:34, 934 words)

### Cold open (0:00)

**P1-S01** | 0:00 | 7s
- Prompt: An empty generic ballpark at night, field lights off except one bank, sprinklers ticking across the outfield grass.
- Camera: Wide, on a tripod, slight wind shake.
- Graphics (add in edit): none
- Audio: none
- Sound and score: Sprinkler ticks. One low piano note.

**P1-S02** | 0:07 | 8s
- Prompt: Close-up of a contract signature page on a dark wood desk, a fountain pen resting beside it, warm lamp light.
- Camera: Close-up, handheld.
- Graphics (add in edit): Lower note: "$700M over 10 years (E01)"
- Audio: NARRATOR: "In December 2023, the Dodgers agreed to pay one player $700 million over ten years."
- Sound and score: Piano theme begins, slow.

**P1-S03** | 0:15 | 9s
- Prompt: GREG, seen from behind, alone at a desk in a dark open-plan office, one lamp on, typing.
- Camera: Handheld walk-in from across the room.
- Graphics (add in edit): none
- Audio: NARRATOR: "One man in the building said no. He wrote it down, and he signed his name to it."
- Sound and score: Keyboard clicks, distant HVAC.

**P1-S04** | 0:24 | 11s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT in an OFFICE set, seated, hands loosely folded.
- Camera: Medium close-up, slight handheld drift.
- Graphics (add in edit): Lower-third: "ELLIOTT / Chief Financial Officer"
- Audio: ELLIOTT: "Greg wasn't wrong to ask the question. Every CFO wants someone in the building who asks it. He was wrong about the answer."
- Sound and score: Room tone. Piano under.

**P1-S05** | 0:35 | 5s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "Greg declined to be interviewed for this film."
- Audio: none
- Sound and score: Room tone.

**P1-S06** | 0:40 | 7s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "THE GREG BLUNDER" / "Part One: The Memo" / "a documentary"
- Audio: none
- Sound and score: Room tone.

### The early life of Greg (0:47)

**P1-S07** | 0:47 | 3s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "THE EARLY LIFE OF GREG"
- Audio: none
- Sound and score: Room tone.

**P1-S08** | 0:50 | 15s
- Prompt: Phone-camera footage: a sunny San Francisco street of colorful row houses, a small corner smoothie shop with a hand-painted sign and no brand name.
- Camera: Handheld walk-up, natural daylight.
- Graphics (add in edit): Lower note: "San Francisco"
- Audio: NARRATOR: "Before the Dodgers, Greg was a fresh accounting graduate from San Francisco State. He kept the books for a smoothie shop and threw himself into the city's causes. Every meeting. Every petition."
- Sound and score: Street ambience, light acoustic guitar.

**P1-S09** | 1:05 | 4s
- Prompt: Old phone photo, slightly soft: GREG in his early 20s in a plain black graduation gown and cap with no school logo, grinning, holding a plain diploma folder.
- Camera: Slow digital zoom on the photo.
- Graphics (add in edit): none
- Audio: none
- Sound and score: Guitar continues.

**P1-S10** | 1:09 | 8s
- Prompt: YouTube-style interview: COLLEAGUE in her home kitchen, lav mic clipped to her cardigan, window light.
- Camera: Medium close-up, slight handheld.
- Graphics (add in edit): Lower-third: "FORMER COLLEAGUE OF GREG"
- Audio: COLLEAGUE: "Greg was all in. He had opinions about everything, mostly correct ones, usually a little late."
- Sound and score: Kitchen room tone.

**P1-S11** | 1:17 | 11s
- Prompt: Phone footage: a neighborhood street in June, shop windows and porches showing the progress-style Pride flag with the chevron of extra colors. One smoothie shop window still shows an older rainbow flag.
- Camera: Handheld pan along the street, stopping on the shop window.
- Graphics (add in edit): none
- Audio: NARRATOR: "That June, the neighborhood updated its Pride flag to the new inclusive design. Greg's flag in the shop window didn't change."
- Sound and score: Street ambience.

**P1-S12** | 1:28 | 12s
- Prompt: YouTube-style interview: COLLEAGUE, kitchen, a small rueful smile.
- Camera: Close-up, slight handheld.
- Graphics (add in edit): none
- Audio: COLLEAGUE: "Nobody was mad at him for what he believed. They were mad that he'd lectured everyone about updates and then never did his own."
- Sound and score: Kitchen room tone.

**P1-S13** | 1:40 | 7s
- Prompt: Phone footage of a community meeting in a church hall with folding chairs; neighbors listen politely while GREG holds up a printed spreadsheet.
- Camera: Handheld from the back row.
- Graphics (add in edit): none
- Audio: NARRATOR: "There was a community meeting. Greg brought a spreadsheet. It did not help."
- Sound and score: Hall murmur.

**P1-S14** | 1:47 | 5s
- Prompt: Old vertical phone clip, low resolution: GREG, younger, talks into his phone camera outside the smoothie shop.
- Camera: Selfie angle, shaky.
- Graphics (add in edit): Caption: "2010s phone clip"
- Audio: GREG: "In my defense, the old flag was fully depreciated."
- Sound and score: Phone audio, traffic.

**P1-S15** | 1:52 | 6s
- Prompt: Phone footage from a passenger seat: a packed hatchback heading south on a coastal highway, boxes stacked in the back.
- Camera: Handheld through the windshield.
- Graphics (add in edit): none
- Audio: NARRATOR: "A month later, he packed his car and drove south."
- Sound and score: Road noise.

**P1-S16** | 1:58 | 9s
- Prompt: FRED's desk terminal in a quiet home office, screen glowing blue, a desk lamp on.
- Camera: Static, eye level.
- Graphics (add in edit): none
- Audio: FRED: "It was the first recorded instance of Greg missing an important update. It would not be the last."
- Sound and score: Low electronic hum.

### I. The signing (2:07)

**P1-S17** | 2:07 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "I. THE SIGNING"
- Audio: none
- Sound and score: Room tone.

**P1-S18** | 2:11 | 15s
- Prompt: Phone footage from the stands: STAR, backlit, at home plate under stadium lights, swings; the ball rises into a dark sky.
- Camera: Handheld phone, follows the ball up.
- Graphics (add in edit): Lower note: "2024: 54 HR, 59 SB. 2025: 55 HR (E16)"
- Audio: NARRATOR: "Shohei Ohtani arrived as a hitter and a pitcher. In 2024 he hit 54 home runs and stole 59 bases. In 2025 he hit 55 more, and he returned to the mound."
- Sound and score: Muffled crowd, strings enter.

**P1-S19** | 2:26 | 7s
- Prompt: Phone footage from the stands: STAR, seen from behind on the mound at dusk, winds up.
- Camera: Handheld phone, zoomed in.
- Graphics (add in edit): Lower note: "4 MVP awards, all unanimous (E17)"
- Audio: NARRATOR: "He has won four Most Valuable Player awards. All four votes were unanimous."
- Sound and score: Strings hold.

**P1-S20** | 2:33 | 11s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: MARKUS in a wood-panelled study, window light, a closed leather folio on his knee.
- Camera: Medium close-up, static.
- Graphics (add in edit): Lower-third: "MARKUS SCHULTZ / Owner (fictional)"
- Audio: MARKUS: "You don't get many chances at a player like that. When one comes, you find a way to make the numbers work."
- Sound and score: Room tone.

**P1-S21** | 2:44 | 10s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ANALYST in the LIBRARY set.
- Camera: Medium close-up, slight handheld drift.
- Graphics (add in edit): Lower-third: "THE ANALYST / Baseball economics"
- Audio: ANALYST: "The headline was seven hundred million. The structure was the story. Almost nobody read past the headline that week."
- Sound and score: Room tone, faint clock.

### II. The memo (2:54)

**P1-S22** | 2:54 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "II. THE MEMO"
- Audio: none
- Sound and score: Room tone.

**P1-S23** | 2:58 | 11s
- Prompt: Phone-footage recreation: GREG at his desk late at night, desk lamp, a mug of cold coffee, typing with total focus.
- Camera: Medium, slight handheld drift.
- Graphics (add in edit): Overlay: "RECREATION"
- Audio: NARRATOR: "Greg had been a Dodgers accountant for nine years. He was careful, quick and well liked. That week, he wrote a two-page memo."
- Sound and score: Keyboard, clock.

**P1-S24** | 3:09 | 11s
- Prompt: Extreme close-up of a printed memo sliding out of an office printer.
- Camera: Close-up, handheld.
- Graphics (add in edit): Memo text: "Recommendation: do not proceed."
- Audio: GREG: "Seven hundred million dollars for one player. I can't find a version of this that works. My recommendation is that we walk away."
- Sound and score: Printer whir.

**P1-S25** | 3:20 | 11s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: COLLEAGUE in the KITCHEN set, holding a mug in both hands.
- Camera: Medium close-up, static.
- Graphics (add in edit): Lower-third: "FORMER COLLEAGUE OF GREG"
- Audio: COLLEAGUE: "Greg believed in that memo. He printed it twice. He kept one copy on his own desk, so he'd see it every morning."
- Sound and score: Kitchen ambience.

**P1-S26** | 3:31 | 11s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set.
- Camera: Close-up, slight handheld drift.
- Graphics (add in edit): none
- Audio: ELLIOTT: "I read it on a Sunday night. It was clear, and it was confident. It only covered page one of the deal."
- Sound and score: Room tone.

**P1-S27** | 3:42 | 6s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: MARKUS, study set, a small nod.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: MARKUS: "I thanked him for it. Then we signed the player."
- Sound and score: Silence after the line.

### III. Page two (3:48)

**P1-S28** | 3:48 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "III. PAGE TWO"
- Audio: none
- Sound and score: Room tone.

**P1-S29** | 3:52 | 17s (generate 15s, then extend 2s)
- Prompt: Top-down slow pan along a typed contract page, a pencil timeline drawn across the margin from 2024 to 2043.
- Camera: Top-down, slow drift.
- Graphics (add in edit): Graphic: "$680M deferred. $2M a year while playing. $68M a year, 2034 to 2043. No interest. (E01, E02)"
- Audio: NARRATOR: "Page two said this. Ohtani deferred $680 million of the $700 million. He is paid $2 million a year while he plays. The rest arrives in $68 million payments from 2034 to 2043, with no interest."
- Sound and score: Piano arpeggio.

**P1-S30** | 4:09 | 16s (generate 15s, then extend 1s)
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ANALYST leans forward, elbows on knees.
- Camera: Close-up, slight handheld drift.
- Graphics (add in edit): Graphic: "Present value, AP luxury-tax method: about $461M. Luxury-tax charge: about $46M a year. (E03, E04)"
- Audio: ANALYST: "Money paid in 2043 costs less than money paid today. On the luxury-tax books, the deal is worth about $461 million in present value. It counts about $46 million a year, not seventy."
- Sound and score: Room tone.

**P1-S31** | 4:25 | 13s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ANALYST raises one hand, making a fair point.
- Camera: Medium close-up, static.
- Graphics (add in edit): Lower note: "Deferred pay must be funded in advance (E05)"
- Audio: ANALYST: "It isn't free. The labor agreement makes the club fund deferred pay in advance. That's real cash, set aside early. Greg's memo didn't mention it either way."
- Sound and score: Room tone.

**P1-S32** | 4:38 | 13s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: ELLIOTT: "Greg saw seventy million a year. The tax sees forty-six. The player sees two. All three numbers are true. Only one of them was in his memo."
- Sound and score: Long pause, piano returns.

### IV. The audit (4:51)

**P1-S33** | 4:51 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "IV. THE AUDIT"
- Audio: none
- Sound and score: Room tone.

**P1-S34** | 4:55 | 14s
- Prompt: A small office at night. Someone sets FRED's desk terminal on a desk and plugs it in; the screen lights up blue.
- Camera: Handheld, eye level.
- Graphics (add in edit): none
- Audio: NARRATOR: "Six months later, the club brought in a new controller to audit the year's largest decisions. His name was Fred. Fred is an accounting system. He does not take weekends."
- Sound and score: Server hum, piano in a higher register.

**P1-S35** | 5:09 | 14s
- Prompt: FRED's desk terminal on a home-office desk, screen glowing blue, desk lamp on.
- Camera: Medium close-up, slight handheld drift.
- Graphics (add in edit): Lower-third: "FRED / Controller"
- Audio: FRED: "I was asked to review the memo. It was well formatted. It had one input, the total. It had no discount rate, no payment schedule and no estimate of wins."
- Sound and score: Low electronic hum.

**P1-S36** | 5:23 | 9s
- Prompt: FRED's desk terminal, screen steady blue.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "I don't fault the conclusion for being bold. I fault it for being finished before the work started."
- Sound and score: Hum.

**P1-S37** | 5:32 | 12s
- Prompt: Screen recording of FRED's display: a blue spreadsheet scrolling slowly.
- Camera: Screen capture, static.
- Graphics (add in edit): Graphic: "$13.9M per win, 2025 (FanGraphs, E18). 2025: 9.4 WAR, best in the NL (E17)."
- Audio: FRED: "FanGraphs puts the 2025 price of a win at about $13.9 million. Ohtani produced 9.4 wins above replacement, the best in the National League."
- Sound and score: Soft clicks.

**P1-S38** | 5:44 | 15s
- Prompt: Screen recording: a simple bar chart builds in a spreadsheet app, one tall bar and one short bar.
- Camera: Static, slight handheld drift.
- Graphics (add in edit): Graphic: "9.4 x $13.9M = about $131M. Illustrative, pending controller sign-off. Luxury-tax charge: about $46M a year."
- Audio: FRED: "That is about $131 million of on-field value in one season, against about $46 million a year on the tax. It is an illustration. I have not signed off on it yet."
- Sound and score: Strings, slow.

**P1-S39** | 5:59 | 11s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ANALYST, LIBRARY set, measured.
- Camera: Medium close-up, static.
- Graphics (add in edit): none
- Audio: ANALYST: "Fred's math is a sketch. Wins aren't cash in a bank. Cut his number in half and it still clears forty-six."
- Sound and score: Room tone.

**P1-S40** | 6:10 | 13s
- Prompt: FRED's desk terminal, screen glowing blue.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "Greg's memo used one number. My file uses forty. Most of them are smaller and less exciting. That is usually how you know they are right."
- Sound and score: Hum.

### V. The brand (6:23)

**P1-S41** | 6:23 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "V. THE BRAND"
- Audio: none
- Sound and score: Room tone.

**P1-S42** | 6:27 | 15s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA in a bright CREATIVE STUDIO set, mood boards out of focus behind her.
- Camera: Medium close-up, slight handheld drift.
- Graphics (add in edit): Lower-third: "CAROLINA / Creative Strategist and Brand Architect"
- Audio: CAROLINA: "I've spent more than ten years in digital media and brand work. You learn to separate attention from money. With Ohtani, the attention was enormous. So I went looking for the money."
- Sound and score: Soft studio ambience.

**P1-S43** | 6:42 | 14s
- Prompt: Slow pan along a ballpark concourse wall of blank sponsor panels in muted colors, no text, no logos.
- Camera: Handheld walking pan.
- Graphics (add in edit): Graphic: "12 Japan-based partners, about $70M, 2024. Secondhand estimate (E10)."
- Audio: CAROLINA: "In 2024 the club added 12 Japan-based partners. One research firm estimated about $70 million in new sponsorship revenue. That estimate reached us secondhand, so we treat it with care."
- Sound and score: Concourse ambience.

**P1-S44** | 6:56 | 10s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA, CREATIVE STUDIO set.
- Camera: Close-up, static.
- Graphics (add in edit): Graphic: "Japan-based companies: 16 of 115 partners, 2025 (E11)"
- Audio: CAROLINA: "By 2025, Japan-based companies were 16 of the club's 115 partners. That's a second market, sitting inside our ballpark."
- Sound and score: Room tone.

**P1-S45** | 7:06 | 13s
- Prompt: A full generic ballpark at golden hour, slow pan across a blurred crowd.
- Camera: Slow pan.
- Graphics (add in edit): Graphic: "4,012,470 home attendance, 2025 (E13). 12.9M viewers in Japan, 2024 NLDS Game 5 (E15)."
- Audio: NARRATOR: "In 2025 the Dodgers drew 4,012,470 fans at home, a franchise record and the most in baseball. In Japan, 12.9 million people watched one 2024 playoff game."
- Sound and score: Muffled crowd, piano.

**P1-S46** | 7:19 | 18s (generate 15s, then extend 3s)
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA, slightly firmer.
- Camera: Close-up, slight handheld drift.
- Graphics (add in edit): Graphic: "About $125M, 2026, worldwide estimate. Player income, not Dodgers revenue (E07, E08)."
- Audio: CAROLINA: "One thing I kept repeating in meetings: his endorsement income is his. Forbes and Sportico estimate about $125 million worldwide for 2026. None of that is Dodgers revenue. Our part is the partners, the tickets and the audience."
- Sound and score: Room tone.

**P1-S47** | 7:37 | 12s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA, a small, dry smile.
- Camera: Medium close-up, static.
- Graphics (add in edit): none
- Audio: CAROLINA: "Greg's memo treated him as a cost line. My job was to show the room what he did for the brand. Those are different spreadsheets."
- Sound and score: Piano returns.

**P1-S48** | 7:49 | 9s
- Prompt: Slow pan across a shop window of plain white jerseys with the number 17, no team names or logos, warm street light.
- Camera: Handheld walking pan.
- Graphics (add in edit): Lower note: "Led MLBShop.com jersey sales, 2024 (E14)"
- Audio: NARRATOR: "In his first Dodgers season, his jersey led all players in sales on the league's online shop."
- Sound and score: Street ambience.

**P1-S49** | 7:58 | 21s (generate 15s, then extend 6s)
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA, CREATIVE STUDIO set.
- Camera: Medium close-up, static.
- Graphics (add in edit): Lower note: "Personal deals, fees undisclosed (E09)"
- Audio: CAROLINA: "The personal deals tell you the American audience is there too. New Balance gave him a signature line and a pop-up in Texas. Topps and Fanatics signed him to an exclusive card deal. We don't see their fees, and we don't count them as ours."
- Sound and score: Room tone.

### VI. The conversation (8:19)

**P1-S50** | 8:19 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "VI. THE CONVERSATION"
- Audio: none
- Sound and score: Room tone.

**P1-S51** | 8:23 | 6s
- Prompt: An empty office corridor at early morning, one office door ajar, lamp light spilling out.
- Camera: Handheld walk-in down the corridor.
- Graphics (add in edit): none
- Audio: NARRATOR: "In the spring, Elliott asked Greg to come to his office."
- Sound and score: Footsteps, HVAC, piano very low.

**P1-S52** | 8:29 | 5s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "End of Part One"
- Audio: none
- Sound and score: Room tone.

## Part 2 shot list: Part Two: The Buyback (51 shots, 8:00, 797 words)

### Cold open (0:00)

**P2-S01** | 0:00 | 6s
- Prompt: A generic ballpark in another city at dawn, red-accented seats, mist, no signage text.
- Camera: Wide, handheld, slight sway.
- Graphics (add in edit): none
- Audio: none
- Sound and score: Wind, one piano note.

**P2-S02** | 0:06 | 8s
- Prompt: GREG, seen from behind, walking into a glass office lobby carrying a cardboard box with a desk calculator on top.
- Camera: Handheld walk-in.
- Graphics (add in edit): none
- Audio: NARRATOR: "What if I told you Greg got a second chance to make the same call?"
- Sound and score: Piano theme.

**P2-S03** | 0:14 | 7s
- Prompt: Close-up of the calculator on a new desk, a fresh name plate beside it with no readable text.
- Camera: Close-up, handheld.
- Graphics (add in edit): none
- Audio: NARRATOR: "And what if I told you he made it again, with more confidence?"
- Sound and score: Strings.

**P2-S04** | 0:21 | 7s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "THE GREG BLUNDER" / "Part Two: The Buyback" / "a documentary"
- Audio: none
- Sound and score: Room tone.

**P2-S05** | 0:28 | 5s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "Greg also declined to be interviewed for Part Two."
- Audio: none
- Sound and score: Room tone.

### VI. The conversation (0:33)

**P2-S06** | 0:33 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "VI. THE CONVERSATION (continued)"
- Audio: none
- Sound and score: Room tone.

**P2-S07** | 0:37 | 15s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set, looks down, then back to the interviewer.
- Camera: Close-up, slight handheld drift.
- Graphics (add in edit): none
- Audio: ELLIOTT: "I'd had the conversation before. It doesn't get easier. I told him the memo wasn't the reason. The reason was that he never revised it, even after he had the numbers."
- Sound and score: Room tone.

**P2-S08** | 0:52 | 9s
- Prompt: Phone-footage recreation: ELLIOTT and GREG seated across a desk in a quiet office, morning light, a single folder between them.
- Camera: Wide two-shot, static.
- Graphics (add in edit): Overlay: "RECREATION"
- Audio: GREG: "Was I wrong?" ELLIOTT: "You were early, and you were certain. That's a hard combination in this job."
- Sound and score: Clock ticking.

**P2-S09** | 1:01 | 5s
- Prompt: Phone-footage recreation: GREG picks up a large desk calculator from the desk and holds it to his chest.
- Camera: Medium close-up, static.
- Graphics (add in edit): none
- Audio: GREG: "Can I keep the calculator?" ELLIOTT: "It's yours, Greg."
- Sound and score: Silence.

**P2-S10** | 1:06 | 9s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: ELLIOTT: "He shook my hand. He thanked the team. He was decent about it. Then the next morning happened."
- Sound and score: Piano, one chord.

**P2-S11** | 1:15 | 8s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: COLLEAGUE, KITCHEN set.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: COLLEAGUE: "He cleaned his desk that afternoon. He left the memo. He took the calculator."
- Sound and score: Kitchen ambience.

### VII. The mail room (1:23)

**P2-S12** | 1:23 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "VII. THE MAIL ROOM"
- Audio: none
- Sound and score: Room tone.

**P2-S13** | 1:27 | 14s
- Prompt: Grainy black-and-white security-camera view of an office mail room at dawn. A blurred figure in a Hawaiian shirt sits on the floor beside a postage machine, a trash can nearby. No gross detail.
- Camera: Fixed high corner angle.
- Graphics (add in edit): Timestamp overlay: "6:48 AM". Blur over the figure.
- Audio: NARRATOR: "Greg came back the next morning. Security found him in the mail room, sitting on the floor beside the postage machine. He had not been home."
- Sound and score: Fluorescent buzz, low strings.

**P2-S14** | 1:41 | 15s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: COLLEAGUE, KITCHEN set, choosing her words.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: COLLEAGUE: "He'd had a long night. He was loud, and then he was sick, and then he was very quiet. Someone brought him water. Someone else called him a car."
- Sound and score: Kitchen ambience.

**P2-S15** | 1:56 | 6s
- Prompt: FRED's desk terminal, screen glowing blue.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "I reordered the envelopes. I did not bill anyone for them."
- Sound and score: Hum.

**P2-S16** | 2:02 | 8s
- Prompt: A highway at dusk heading south, tail lights streaking, shot through a windshield.
- Camera: Static, slight vibration.
- Graphics (add in edit): none
- Audio: NARRATOR: "That might have been the end of it. Then, that summer, another club called Greg."
- Sound and score: Road noise, piano resolves.

### VIII. Anaheim (2:10)

**P2-S17** | 2:10 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "VIII. ANAHEIM"
- Audio: none
- Sound and score: Room tone.

**P2-S18** | 2:14 | 14s
- Prompt: Phone-footage recreation: a long boardroom table with red accents, seven executives, a window over a generic ballpark.
- Camera: Wide, slight handheld drift.
- Graphics (add in edit): Overlay: "RECREATION. Fictional scenario."
- Audio: NARRATOR: "In this story, a club in Anaheim hired Greg as a consultant. Within a month, his new employer was studying a deal to bring Ohtani back."
- Sound and score: Clock ticking.

**P2-S19** | 2:28 | 12s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ANGELS EXEC in a dim office, venetian-blind shadows.
- Camera: Medium close-up, slight handheld drift.
- Graphics (add in edit): Lower-third: "FORMER ANGELS EXECUTIVE (fictional)"
- Audio: ANGELS EXEC: "We knew him. He'd played for us. We had the clubhouse and the fans. All we had to do was say yes."
- Sound and score: Room tone.

**P2-S20** | 2:40 | 13s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ANGELS EXEC, dim office.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: ANGELS EXEC: "Greg was very persuasive in a room. He had one slide. It had one number on it. He'd turn to it and just wait."
- Sound and score: Room tone.

**P2-S21** | 2:53 | 12s
- Prompt: Phone-footage recreation: GREG stands at the end of the red-accented boardroom table, one hand on a thick bound report.
- Camera: Medium, slight handheld drift.
- Graphics (add in edit): none
- Audio: GREG: "History repeats itself. The total is too high." ANGELS EXEC: "Fred's audit says he's worth almost three times what he costs against the tax."
- Sound and score: Paper rustle.

**P2-S22** | 3:05 | 7s
- Prompt: Phone-footage recreation: GREG closes the report without looking at it.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: GREG: "I've read Fred's audit. I disagree with its premises." ANGELS EXEC: "Which ones?" GREG: "The numbers."
- Sound and score: Silence.

**P2-S23** | 3:12 | 7s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ANGELS EXEC, eyes closed for a moment.
- Camera: Close-up, slight handheld drift.
- Graphics (add in edit): none
- Audio: ANGELS EXEC: "We listened to Greg. Again. I'd like that on the record. Again."
- Sound and score: Long silence.

**P2-S24** | 3:19 | 11s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ANALYST, LIBRARY set.
- Camera: Medium close-up, static.
- Graphics (add in edit): none
- Audio: ANALYST: "Passing once is a judgment call. Passing twice, on the same player, for the same reason, is a pattern."
- Sound and score: Room tone.

**P2-S25** | 3:30 | 15s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: ELLIOTT: "I heard about it from a reporter. I didn't say anything for a while. Then I asked Fred to send them a copy of his audit. Nobody asked for it back."
- Sound and score: Room tone, piano.

**P2-S26** | 3:45 | 8s
- Prompt: FRED's desk terminal, screen glowing blue.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "I sent the audit as a file. It was opened once, for eleven seconds."
- Sound and score: Hum.

**P2-S27** | 3:53 | 15s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA, CREATIVE STUDIO set.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: CAROLINA: "From a brand view, that meeting was the whole case. They had his audience, his history and a fan base that still wanted him. They looked at one number again."
- Sound and score: Room tone.

### IX. Ohio (4:08)

**P2-S28** | 4:08 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "IX. OHIO"
- Audio: none
- Sound and score: Room tone.

**P2-S29** | 4:12 | 15s
- Prompt: ANGELS EXEC in a grey suit stands at the edge of a tall cornfield at dusk, holding a folded paper map. A red tractor passes far behind him.
- Camera: Wide, handheld, from the road.
- Graphics (add in edit): Overlay: "Fictional rumor"
- Audio: NARRATOR: "Afterward, a rumor went around that the club's front office was exploring opportunities in Ohio. No one could confirm it. No one tried very hard." ANGELS EXEC: "Is Columbus nice in April?"
- Sound and score: Wind, crickets, distant tractor.

**P2-S30** | 4:27 | 8s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ANALYST, deadpan.
- Camera: Medium close-up, static.
- Graphics (add in edit): none
- Audio: ANALYST: "When your accountant costs you the best player in baseball twice, people start looking at maps."
- Sound and score: Room tone.

### X. The fans (4:35)

**P2-S31** | 4:35 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "X. THE FANS"
- Audio: none
- Sound and score: Room tone.

**P2-S32** | 4:39 | 14s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: FAN on empty bleachers at dusk, plain jersey.
- Camera: Medium close-up, slight handheld drift.
- Graphics (add in edit): Lower-third: "LIFELONG FAN"
- Audio: FAN: "I've been coming to games for forty years. I don't know Greg. I know what it felt like to watch that player in another uniform. Twice."
- Sound and score: Distant wind.

**P2-S33** | 4:53 | 7s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: FAN, a faint smile.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FAN: "My grandson asked me who Greg was. I told him, that's the point."
- Sound and score: Piano.

**P2-S34** | 5:00 | 12s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: FAN 2 on a stadium concourse at night, plain white jersey with the number 17.
- Camera: Medium close-up, static.
- Graphics (add in edit): Lower-third: "SEASON-TICKET HOLDER"
- Audio: FAN 2: "I bought his jersey the first week. Everybody I know did. Nobody I know bought one with Greg's name on it."
- Sound and score: Concourse ambience.

### XI. Avalon (5:12)

**P2-S35** | 5:12 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XI. AVALON"
- Audio: none
- Sound and score: Room tone.

**P2-S36** | 5:16 | 9s
- Prompt: A ferry crossing open blue water toward a small island harbor town, white boats, palm trees.
- Camera: Wide, slow pan.
- Graphics (add in edit): Overlay: "Catalina Island"
- Audio: NARRATOR: "Weeks later, Greg took the ferry to Catalina Island. He told friends he was celebrating his freedom."
- Sound and score: Engine drone, gulls.

**P2-S37** | 5:25 | 14s
- Prompt: Gossip-site style clip: vertical phone footage framed in a bright pink-and-yellow generic web template, bold sans-serif banner, no site name or logo. GREG-BEACH on the dock outside Avalon waving a fishing pole.
- Camera: Handheld phone, slight zoom.
- Graphics (add in edit): Banner: "EXCLUSIVE". Template generic; no real site name.
- Audio: GOSSIP HOST: "Fresh footage tonight from Avalon. Is that the accountant who passed on Shohei, twice? He's yelling 'Too expensive' at the ferry. The ferry is not responding."
- Sound and score: Upbeat gossip sting, then crowd noise from the phone.

**P2-S38** | 5:39 | 9s
- Prompt: Gossip-site clip continues: GREG-BEACH walks down the dock toward a small boat, slips on the wet planks and sits down hard. Played in real time, no injury shown.
- Camera: Handheld phone, shaky.
- Graphics (add in edit): Banner: "DEVELOPING"
- Audio: GOSSIP HOST: "He's headed down the dock toward a boat our sources say is not his boat. Oh. Oh, no."
- Sound and score: Phone audio, gulls, a splash.

**P2-S39** | 5:48 | 12s
- Prompt: Gossip-site clip: a rescue helicopter lifts off from the harbor; on the stretcher, GREG-BEACH gives a thumbs up, one foot in a white cast.
- Camera: Handheld phone, tilt up.
- Graphics (add in edit): Banner: "GET WELL SOON"
- Audio: GOSSIP HOST: "Our sources say he broke his ankle and was airlifted to Harbor Point Medical Center. Get well soon, Greg. We mean it."
- Sound and score: Rotor wash, gossip sting out.

**P2-S40** | 6:00 | 8s
- Prompt: A quiet hospital window at night, a single potted plant on the sill, harbor lights beyond.
- Camera: Static, slight handheld drift.
- Graphics (add in edit): none
- Audio: NARRATOR: "The clip spread that weekend. Greg did not comment. His ankle has since healed."
- Sound and score: Distant harbor, piano returns.

**P2-S41** | 6:08 | 9s
- Prompt: FRED's desk terminal, screen glowing blue.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "Air ambulance plus emergency room. The estimated cost exceeds his old forecasting budget. He could have asked me."
- Sound and score: Hum.

**P2-S42** | 6:17 | 11s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: COLLEAGUE, KITCHEN set, warm.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: COLLEAGUE: "I sent flowers. He sent back a note that said the flowers were overpriced. So I knew he was okay."
- Sound and score: Kitchen ambience.

### Epilogue (6:28)

**P2-S43** | 6:28 | 4s
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "EPILOGUE"
- Audio: none
- Sound and score: Room tone.

**P2-S44** | 6:32 | 12s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: MARKUS, study set, the folio now open on his knee.
- Camera: Close-up, slight handheld drift.
- Graphics (add in edit): none
- Audio: MARKUS: "People ask if it's the best contract in the history of the sport. I don't know yet. Ask me in 2043."
- Sound and score: Piano theme begins.

**P2-S45** | 6:44 | 11s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: MARKUS, study set.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: MARKUS: "In the end, Greg's memo cost us nothing. We didn't follow it. I've sent him a card every Christmas since."
- Sound and score: Piano.

**P2-S46** | 6:55 | 12s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ANALYST, LIBRARY set.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: ANALYST: "The honest answer is that it's a bet that's paying off early. The test runs until the last deferred check clears in 2043."
- Sound and score: Piano.

**P2-S47** | 7:07 | 8s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA, CREATIVE STUDIO set.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: CAROLINA: "The brand story writes itself. The finance story needed someone to read page two."
- Sound and score: Piano.

**P2-S48** | 7:15 | 14s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set, the warmest light of the film.
- Camera: Close-up, tripod, slight handheld drift.
- Graphics (add in edit): none
- Audio: ELLIOTT: "I think about Greg more than he'd guess. He wasn't careless. He stopped at the first number. In this job, the first number is where you start."
- Sound and score: Strings join.

**P2-S49** | 7:29 | 12s
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: ELLIOTT: "If he called tomorrow and asked for a reference, I'd give him one. I'd ask him to read page two first."
- Sound and score: Strings.

**P2-S50** | 7:41 | 11s
- Prompt: FRED's desk terminal at dusk, screen glowing blue, warm lamp beside it.
- Camera: Close-up, slight handheld drift.
- Graphics (add in edit): none
- Audio: FRED: "A contract is wins, tickets, sponsors and a country watching at home. Greg saw a number. I saw a deal."
- Sound and score: Piano theme, full.

**P2-S51** | 7:52 | 8s
- Prompt: The empty interview chair; the lamp clicks off. Black.
- Camera: Static, fade to black.
- Graphics (add in edit): End card: disclaimer (see assembly guide).
- Audio: none
- Sound and score: Final piano chord rings out.

## Assembly guide

1. Order: Part 1, P1-S01 onward, then Part 2, P2-S01 onward. The shot lengths add up to the runtime in each part heading.
2. Pacing: lengths assume about 140 spoken words a minute plus a pause after each line. Keep the pauses. The restraint does the work.
3. Narrator: conversational creator voiceover, recorded at a desk mic, plain and direct, about 140 words a minute. Pause one second after each "What if I told you" line.
4. Interviews: one take per answer where possible. Keep FRED calm and slightly synthetic, the same voice in every shot. ELLIOTT's firing scene is quiet and kind. Score drops out under it.
5. Gossip clip (Part 2, chapter XI): the only bright, fast segment. Use a generic pink-and-yellow web template with no site name or logo, then cut straight back to the plain documentary look.
6. Cards: plain white sans-serif text on black, one-second fades. Use the generic card "a documentary" only. No network or series logos.
7. Lower-thirds and captions: clean YouTube-style sans-serif, bottom left, four seconds on screen. Burn in captions for all dialogue.
8. Disclaimer card (end of each part, or the video description): "Fictional parody. Greg (invented face, not based on any real person), Fred, Elliott as CFO, Carolina, Markus Schultz and every other character, plus the memo, buyback, Ohio rumor, mail room scene, gossip clip, Catalina incident and Harbor Point Medical Center, are invented. These are not real team executives, and the real Dodgers ownership is not depicted. Contract, statistics and commercial figures are real and cited in ST-1/research/evidence.md (E01 to E05, E07 to E11, E13 to E18). Endorsement figures are worldwide estimates of Ohtani's personal income, not Dodgers revenue. The $131 million figure is illustrative pending Fred's sign-off. E10 is a secondhand estimate."
9. Before publishing, check every clip for real logos, team wordmarks or real faces, and regenerate any that has one.
10. The early-life chapter jokes about Greg's lateness and hypocrisy only. Show the Pride flag, the neighbors and the meeting respectfully.
