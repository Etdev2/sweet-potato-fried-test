# Grok Imagine prompt pack: The Greg blunder, Part Three: The Drop

Source script: [greg-part3-rave-script.md](greg-part3-rave-script.md). 55 shots, 8:06, 561 spoken words. Script and pack come from one shot list, so every spoken line matches word for word. Limits and workflow follow the Part 1 and 2 pack (`grok-prompt-pack.md`).

## Settings for every clip

- 16:9, 1080p, 6 to 15 seconds per generation. Cards under 6 seconds are made in the editor, not generated.
- Native audio on. Each shot lists the dialogue and the sound to generate. Record narration and interviews as voiceover if lip-sync drifts on longer lines.
- Reference-to-video tops out at 720p. If you attach reference stills, generate at 720p and upscale, or use image-to-video from a 1080p still.
- Add every card, lower-third, overlay and caption in the editor. Don't ask the model to render text.

## Global style line (paste first in every prompt)

> Authentic YouTube documentary look: natural light or practical lamps, mirrorless camera, iPhone or consumer drone, slight handheld movement, real places, imperfect framing, light digital noise, no film grain or heavy color grading, realistic everyday people. Not a cartoon, not a glossy music video.

Add to every prompt that shows a person: "invented face, not based on any real person or photo; no real logos, brand names or team wordmarks."

Add to every rave shot: "concert-grade production, real lasers and haze, LED wall with abstract visuals only, no logos or text on screens."

## Character sheet (paste the token text exactly, every time)

| Token | Paste this |
| --- | --- |
| GREG | a realistic man in his early 40s with an invented face, short slightly thinning dark hair, round friendly face, a bit sunburned, blue mirrored sunglasses pushed up on his head, loud Hawaiian palm-print shirt, dark jeans |
| GREG-BOOT | GREG in the same loud Hawaiian palm-print shirt and blue mirrored sunglasses, khaki cargo shorts instead of jeans, a black medical walking boot on his right foot and a white sneaker on his left, a neon green glow bracelet on his wrist |
| ELLIOTT | a realistic CFO in his late 30s to 40s with an invented face, neat short hair, navy suit, open collar, calm |
| CAROLINA | a realistic woman in her late 30s with an invented face, dark shoulder-length hair, cream blazer, minimal gold jewelry, warm and sharp |
| MARKUS | a realistic man in his 60s with an invented face, fictional owner Markus Schultz, silver hair, charcoal suit, no tie |
| FRED | an AI controller: a desk terminal with a glowing blue screen and a small speaker grille, no face, calm synthetic voice |
| JADE | a realistic woman in her 20s with an invented face, braids, sequined bucket hat, glow paint on one cheek, oversized plain black t-shirt |
| RYAN | a realistic man about 35 with an invented face, lanky build, dark curly hair, tanned skin, plain teal t-shirt, an energetic grin; a generic character description, not based on any real person or photo |
| HEADLINER | a fictional DJ shown only from behind or as a dark silhouette against the LED wall, black hoodie, headphones on one ear, face never shown, not based on any real DJ |

Interview sets. GREG-BOOT: a folding beach chair on the Isthmus Cove sand at Two Harbors, boot propped on a cooler, moored boats and green hills behind (dusk for most bites, dawn for the last). ELLIOTT: glass-walled conference room. CAROLINA: bright home office with mood boards. MARKUS: home study with a window. JADE: a lifeguard stand at night with laser light passing over. RYAN: an overturned crate beside the sand stage at night. FRED: a desk in a quiet home office.

## Reference image placeholders (location and venue only)

Location slots are filled with Elliott's Two Harbors photos in `refs/`. Venue slots stay open for his rave pictures. Use them for places and stage design only. Never attach a real photo of Greg, Ryan or any real person; Greg and Ryan come from the character sheet text and generated stills. Greg comes from the character sheet text and a generated still.

| Slot | File name | What it shows | Used in |
| --- | --- | --- | --- |
| REF-LOC-01 | refs/two-harbors-catalina-harbor.png | Elliott's photo: hilltop view of a turquoise cove with pier and moorings, green hills, village, ocean beyond | P3-S04, P3-S17, P3-S27, P3-S38, P3-S39, P3-S46, P3-S51, P3-S54 |
| REF-LOC-02 | refs/two-harbors-aerial.png | Elliott's photo: aerial of Isthmus Cove, moored-boat field, pier, beach, village, far harbor through the neck | P3-S17, P3-S27, P3-S38, P3-S39, P3-S41, P3-S46, P3-S51, P3-S54 |
| REF-LOC-03 | refs/two-harbors-coast.png | Elliott's photo: aerial of coastline, campground and winding road above a blue bay with boats | P3-S04 |
| REF-LOC-04 | ref-avalon-pier.jpg (open) | Avalon pier and tender landing, daytime | P3-S02, P3-S03, P3-S12 |
| REF-LOC-05 | ref-cruise-ship-anchored.jpg (open) | Cruise ship anchored off Avalon (logos removed) | P3-S01 |
| REF-VEN-01 | ref-stage-truss-lasers.jpg (open) | Beach stage truss with laser rig | P3-S18 |
| REF-VEN-02 | ref-led-wall.jpg (open) | LED wall and DJ booth layout | P3-S19, P3-S26, P3-S34, P3-S35 |
| REF-VEN-03 | ref-laser-over-water.jpg (open) | Laser fan over water | P3-S17, P3-S27, P3-S38, P3-S39 |
| REF-VEN-04 | ref-crowd-haze.jpg (open) | Crowd in haze, view from mid floor | P3-S19, P3-S26, P3-S28, P3-S29, P3-S31, P3-S34, P3-S35, P3-S36, P3-S37, P3-S38, P3-S41 |
| REF-VEN-05 | ref-drone-beach-night.jpg (open) | Drone angle over a beach event at night | P3-S17, P3-S38, P3-S39 |

In each shot below, a line "Reference slots" names what to attach. LOC-01 to LOC-03 are ready in `refs/`; the rest attach once Elliott supplies them.

## Shot list (55 shots, 8:06)


### Cold open (0:00)

**P3-S01** | 0:00 | 8s | 8s, 16:9, 1080p
- Prompt: A large white cruise ship anchored off a small island harbor town at golden hour, tenders ferrying passengers to a pier, palm trees and hills behind. No ship name or logo visible.
- Camera: Wide, handheld from a small boat, gentle bob.
- Graphics (add in edit): Lower note: "Avalon, Catalina Island"
- Audio: NARRATOR: "In Part Two, Greg left Catalina Island on a stretcher."
- Native audio cue: Ship horn, far off. Water slapping the hull. One low piano note.
- Reference slots: REF-LOC-05

**P3-S02** | 0:08 | 9s | 9s, 16:9, 1080p
- Prompt: GREG-BOOT steps off a tender boat onto the Avalon pier, one hand on the rail, the black walking boot landing carefully on the wet planks.
- Camera: Low angle at boot level, handheld, tilts up to his face.
- Graphics (add in edit): none
- Audio: NARRATOR: "This summer, he came back on a cruise ship. He took the stairs very slowly."
- Native audio cue: Boot thunk on wood. Gulls. Tender engine idling.
- Reference slots: REF-LOC-04

**P3-S03** | 0:17 | 7s | 7s, 16:9, 1080p
- Prompt: GREG-BOOT stands on the pier, sunglasses pushed up, looks down at the planks, then steps around one wet patch with great care.
- Camera: Medium, handheld, slight push-in.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Gulls. Tender engine idling. Water against the pilings.
- Reference slots: REF-LOC-04

**P3-S04** | 0:24 | 10s | 10s, 16:9, 1080p
- Prompt: GREG-BOOT sits on the open back deck of a small shore boat running up Catalina's coastline, steep green hills, a campground and a winding dirt road above a blue bay with a few boats at anchor.
- Camera: Wide, handheld from the boat's stern, gentle bob and spray.
- Graphics (add in edit): Lower note: "Shore boat to Two Harbors"
- Audio: NARRATOR: "He did not stay in Avalon. He took the shore boat up the coast to Two Harbors."
- Native audio cue: Outboard drone, hull slapping, wind. One faint bass pulse from far up the coast.
- Reference slots: REF-LOC-01, REF-LOC-03

**P3-S05** | 0:34 | 6s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "THE GREG BLUNDER" / "Part Three: The Drop" / "a documentary"
- Audio: none
- Native audio cue: Room tone. Faint bass pulse.

**P3-S06** | 0:40 | 6s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "For the first time, Greg agreed to be interviewed."
- Audio: none
- Native audio cue: Room tone.


### XII. Correction (0:46)

**P3-S07** | 0:46 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XII. A CORRECTION"
- Audio: none
- Native audio cue: Room tone.

**P3-S08** | 0:50 | 8s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "In Part Two, we said Greg's ankle had healed. It has mostly healed."
- Audio: none
- Native audio cue: Room tone.

**P3-S09** | 0:58 | 13s | 13s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT on a folding chair on the Isthmus Cove sand at dusk, the walking boot propped on a cooler, moored boats and green hills behind him.
- Camera: Medium close-up, tripod, slight drift.
- Graphics (add in edit): Lower-third: "GREG / Former Forecasting Lead"
- Audio: GREG: "The boot is precautionary. The doctor said six weeks. I've been doing my own forecast. I'm at week eleven."
- Native audio cue: Waves. Faint bass through the sand.

**P3-S10** | 1:11 | 10s | 10s, 16:9, 1080p
- Prompt: FRED's desk terminal, screen glowing blue.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "Greg is wearing the boot on the correct foot. I have confirmed this."
- Native audio cue: Quiet office hum.


### XIII. The flyer (1:21)

**P3-S11** | 1:21 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XIII. THE FLYER"
- Audio: none
- Native audio cue: Room tone.

**P3-S12** | 1:25 | 8s | 8s, 16:9, 1080p
- Prompt: Close-up of a paper flyer taped to a wooden lamp post on Avalon's waterfront near the pier, a black-and-gold abstract wave design, a date and the word BEACH. No real names or logos.
- Camera: Close-up, handheld, slight rack focus.
- Graphics (add in edit): Text in edit only. Flyer text: "ISTHMUS SUNSET / MELODIC TECHNO / SAND STAGE / TWO HARBORS"
- Audio: NARRATOR: "He saw the flyer on a lamp post forty feet from the dock where he fell."
- Native audio cue: Breeze rattling the paper. Gulls.
- Reference slots: REF-LOC-04

**P3-S13** | 1:33 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT, beach chair set, dusk.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: GREG: "I'd never been to one. In accounting you go to a conference. There's a lanyard and a buffet. Nobody turns the lights off."
- Native audio cue: Waves.

**P3-S14** | 1:45 | 13s | 13s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA, CREATIVE STUDIO set, amused.
- Camera: Close-up, slight drift.
- Graphics (add in edit): Lower-third: "CAROLINA / Marketing Strategist"
- Audio: CAROLINA: "Miss Monique-style melodic techno is long builds and a big emotional release. It's for people who like to wait for the payoff. Greg is that audience. He just never got the payoff."
- Native audio cue: Room tone.

**P3-S15** | 1:58 | 10s | 10s, 16:9, 1080p
- Prompt: GREG-BOOT at a small beachfront stand in Two Harbors village under string lights, paying cash for a neon glow bracelet, holding it up to read the price tag.
- Camera: Medium, handheld.
- Graphics (add in edit): none
- Audio: NARRATOR: "He bought one glow bracelet. He asked for a receipt."
- Native audio cue: Cash register ding. Distant kick drum.


### XIV. Sand stage (2:08)

**P3-S16** | 2:08 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XIV. SAND STAGE"
- Audio: none
- Native audio cue: Kick drum, muffled, growing.

**P3-S17** | 2:12 | 12s | 12s, 16:9, 1080p
- Prompt: Drone shot at blue hour over Two Harbors: Isthmus Cove packed with moored boats, the wooden Isthmus pier, steep green hills behind, and a stage on the beach beside the pier with green lasers starting to sweep over the water. No signage text.
- Camera: Drone, slow forward glide and descent.
- Graphics (add in edit): Lower note: "Two Harbors, 8:41 PM"
- Audio: NARRATOR: "The stage went up on the beach in an afternoon. By nine, the isthmus was louder than the dock incident."
- Native audio cue: Melodic techno, wide pads, a slow arpeggio. Crowd murmur rises.
- Reference slots: REF-LOC-01, REF-LOC-02, REF-VEN-03, REF-VEN-05

**P3-S18** | 2:24 | 8s | 8s, 16:9, 1080p
- Prompt: Stage crew in black shirts testing a row of lasers on a truss above the sand; single green beams flick on, fan out and fan back in. Haze machines puff white clouds.
- Camera: Medium wide, handheld from side stage.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Laser fan whir, haze hiss, crew radio chatter, kick drum test hits.
- Reference slots: REF-VEN-01

**P3-S19** | 2:32 | 8s | 8s, 16:9, 1080p
- Prompt: A huge LED wall behind the DJ booth cycles through slow abstract waves of deep blue and amber, the shape of a crowd silhouetted in front of it.
- Camera: Wide, handheld from mid crowd, slight sway.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Pads swell. Crowd cheers at a color change.
- Reference slots: REF-VEN-02, REF-VEN-04

**P3-S20** | 2:40 | 10s | 10s, 16:9, 1080p
- Prompt: GREG-BOOT at the edge of the sand, glow bracelet on, looking up at the lasers with his mouth slightly open, the beams reflected in his mirrored sunglasses.
- Camera: Close-up, handheld, slow push-in.
- Graphics (add in edit): none
- Audio: NARRATOR: "Greg stood at the edge of the sand for twenty minutes. Witnesses describe him as stationary."
- Native audio cue: Arpeggio climbing. Bass muffled, as if heard from outside.

**P3-S21** | 2:50 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: a realistic woman in her 20s with an invented face, braids, a sequined bucket hat, glow paint on one cheek, seated on a lifeguard stand at night, laser light passing over her.
- Camera: Medium close-up, handheld, slight drift.
- Graphics (add in edit): Lower-third: "JADE / Raver"
- Audio: JADE: "There was a guy in a walking boot just looking at the speakers like they owed him money. I asked if he was okay. He said he was running the numbers."
- Native audio cue: Muffled set behind her.

**P3-S22** | 3:02 | 10s | 10s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: RYAN, glow stick tucked behind his ear, seated on an overturned crate beside the sand stage at night, laser light passing over him.
- Camera: Medium close-up, handheld, slight drift.
- Graphics (add in edit): Lower-third: "RYAN / Elliott's friend"
- Audio: RYAN: "Elliott texted me: my old forecaster is at your rave, be nice. I found him by the speakers doing long division."
- Native audio cue: Muffled set behind him.

**P3-S23** | 3:12 | 8s | 8s, 16:9, 1080p
- Prompt: RYAN walks up to GREG-BOOT at the edge of the sand, cracks a green glow stick and puts it in his hand, then gives him a cold unbranded energy drink can. GREG-BOOT turns the can to read the label.
- Camera: Medium, handheld, following RYAN in.
- Graphics (add in edit): none
- Audio: NARRATOR: "Ryan handed him a glow stick and an energy drink. Greg read the nutrition label."
- Native audio cue: Glow stick snap. Can hiss. Kick drum louder.

**P3-S24** | 3:20 | 9s | 9s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT, beach chair set.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: GREG: "Ticket, bracelet, ferry back. It came to less than one Ohtani at-bat. I did the math. Then I stopped doing the math."
- Native audio cue: Waves.


### XV. The build (3:29)

**P3-S25** | 3:29 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XV. THE BUILD"
- Audio: none
- Native audio cue: A rising synth, held.

**P3-S26** | 3:33 | 10s | 10s, 16:9, 1080p
- Prompt: The HEADLINER in the DJ booth, seen only from behind, a dark silhouette against the LED wall, one hand raised over the mixer, the crowd a sea of raised arms beyond.
- Camera: Wide, from behind the booth, handheld, slight sway.
- Graphics (add in edit): Lower note: "Headliner: fictional"
- Audio: NARRATOR: "The headliner played a set in the Miss Monique style. Twelve-minute builds. Very few words."
- Native audio cue: Long melodic techno build, filtered kick, choir-like pad.
- Reference slots: REF-VEN-02, REF-VEN-04

**P3-S27** | 3:43 | 8s | 8s, 16:9, 1080p
- Prompt: Wide view from the shoreline: a fan of green and white laser beams spreading flat across the dark water of Isthmus Cove, over the moored boats' anchor lights, the Isthmus pier lit, the green hills a dark outline behind, haze drifting.
- Camera: Wide, tripod, slight wind shake.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Build continues. Water lapping. Crowd roar far off.
- Reference slots: REF-LOC-01, REF-LOC-02, REF-VEN-03

**P3-S28** | 3:51 | 8s | 8s, 16:9, 1080p
- Prompt: Inside the crowd: dancers with glow sticks and phone lights, haze, beams slicing overhead, sweat and sand, everyone facing the stage.
- Camera: Handheld, moving through the crowd at chest height.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Build, kick filtered out, crowd chanting a count.
- Reference slots: REF-VEN-04

**P3-S29** | 3:59 | 8s | 8s, 16:9, 1080p
- Prompt: RYAN grabs GREG-BOOT by the wrist and pulls him through the crowd toward the stage barrier, GREG-BOOT hopping on the good foot, the boot swinging, dancers stepping aside and cheering him on, white beams crossing overhead.
- Camera: Handheld, backpedaling in front of them through the crowd.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Build, rising snare roll, crowd whoops as they pass.
- Reference slots: REF-VEN-04

**P3-S30** | 4:07 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set, a phone in his hand.
- Camera: Close-up, slight drift.
- Graphics (add in edit): Lower-third: "ELLIOTT / Chief Financial Officer"
- Audio: ELLIOTT: "Carolina sent me a video at eleven at night. No caption. I watched it four times. I knew the shirt before I knew the face."
- Native audio cue: Room tone.

**P3-S31** | 4:19 | 9s | 9s, 16:9, 1080p
- Prompt: Shaky vertical phone video, pillarboxed: GREG-BOOT in the middle of the crowd, slowly starting to nod his head, glow bracelet raised.
- Camera: Handheld phone, zooming in and out.
- Graphics (add in edit): Overlay: "VIDEO SENT TO ELLIOTT, 11:02 PM"
- Audio: none
- Native audio cue: Phone-mic distortion, bass clipping.
- Reference slots: REF-VEN-04

**P3-S32** | 4:28 | 10s | 10s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT, beach chair set, eyes on the water.
- Camera: Close-up, slow push-in.
- Graphics (add in edit): none
- Audio: GREG: "The song kept building and building. I kept thinking, it's too long, it's too much. And then I thought, maybe I always say that."
- Native audio cue: Waves. A single sustained pad note.


### XVI. The drop (4:38)

**P3-S33** | 4:38 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XVI. THE DROP"
- Audio: none
- Native audio cue: Silence for one beat.

**P3-S34** | 4:42 | 6s | 6s, 16:9, 1080p
- Prompt: The LED wall goes black. Every laser cuts out. The crowd is lit only by phone lights in the haze.
- Camera: Wide, handheld, very still.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Two seconds of near silence. A held breath across the beach.
- Reference slots: REF-VEN-02, REF-VEN-04

**P3-S35** | 4:48 | 8s | 8s, 16:9, 1080p
- Prompt: The drop hits: every laser fans out at once in white and green over the crowd and the water, the LED wall explodes into gold, CO2 jets blast white plumes from the stage front.
- Camera: Wide, handheld, the camera jolted by the bass.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Full drop. Deep kick and bass, crowd scream, CO2 jet blast.
- Reference slots: REF-VEN-02, REF-VEN-04

**P3-S36** | 4:56 | 8s | 8s, 16:9, 1080p
- Prompt: At the front barrier, RYAN hoists GREG-BOOT onto his shoulders as the drop lands. GREG-BOOT rises above the crowd, both arms up, the black walking boot raised high in the air, glow stick in his fist, lasers fanning behind him.
- Camera: Medium wide, handheld from the barrier, tilting up.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Full drop. Crowd roar rises around them.
- Reference slots: REF-VEN-04

**P3-S37** | 5:04 | 8s | 8s, 16:9, 1080p
- Prompt: GREG-BOOT in the crowd, both arms up, dancing with his weight on the good foot, the boot planted like an anchor, a huge grin, laser beams crossing above him.
- Camera: Medium, handheld, circling him.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Drop continues at full volume.
- Reference slots: REF-VEN-04

**P3-S38** | 5:12 | 10s | 10s, 16:9, 1080p
- Prompt: Drone shot at night pulling back and up from the beach: the crowd, the lasers over Isthmus Cove, the Isthmus pier, the dark moored-boat field, the narrow neck of land behind the stage and the open Pacific beyond it.
- Camera: Drone, slow pull back and rise.
- Graphics (add in edit): none
- Audio: NARRATOR: "For eight minutes, the man who passed on seven hundred million dollars didn't pass on anything."
- Native audio cue: Drop rolls on, heard from above, wind on the drone.
- Reference slots: REF-LOC-01, REF-LOC-02, REF-VEN-03, REF-VEN-04, REF-VEN-05

**P3-S39** | 5:22 | 10s | 10s, 16:9, 1080p
- Prompt: Drone shot at night flying slowly along the narrow isthmus from Isthmus Cove toward Catalina Harbor: the stage's green and white lasers fan out over both bays at once, beams skimming the water of Isthmus Cove on one side and the Little Harbor cove on the other, the dark green hills on either side, the open Pacific beyond.
- Camera: Drone, slow lateral track along the neck, steady altitude.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Drop continues, softer from altitude, wind on the drone.
- Reference slots: REF-LOC-01, REF-LOC-02, REF-VEN-03, REF-VEN-05

**P3-S40** | 5:32 | 8s | 8s, 16:9, 1080p
- Prompt: Close-up of the walking boot on the sand, keeping time, tapping once per beat, glow-stick light flickering across it.
- Camera: Low close-up, handheld.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Kick drum, boot thump in sync.

**P3-S41** | 5:40 | 8s | 8s, 16:9, 1080p
- Prompt: A tunnel of green laser beams fans low over the crowd's raised hands, haze glowing, confetti drifting down through the light, the Isthmus pier and moored boats lit beyond the stage.
- Camera: Handheld from mid crowd, slow tilt up.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Drop continues, crowd singing a wordless melody.
- Reference slots: REF-LOC-02, REF-VEN-04

**P3-S42** | 5:48 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: MARKUS, study set, reading glasses on, watching a tablet.
- Camera: Close-up, slight drift.
- Graphics (add in edit): Lower-third: "MARKUS SCHULTZ / Owner (fictional)"
- Audio: MARKUS: "I don't follow techno. I followed the boot. The boot never missed a beat. That's more than I can say for his forecasts."
- Native audio cue: Faint drop audio from the tablet.

**P3-S43** | 6:00 | 10s | 10s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: RYAN, crate set, grinning.
- Camera: Close-up, handheld.
- Graphics (add in edit): none
- Audio: RYAN: "I've had a lot of people on my shoulders. Nobody ever held up a medical boot before. The whole front row cheered for the boot."
- Native audio cue: Muffled set behind him.

**P3-S44** | 6:10 | 10s | 10s, 16:9, 1080p
- Prompt: FRED's desk terminal, screen glowing blue, a faint laser-green reflection drifting across it.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "The drop arrived at minute twelve, as forecast. Greg did not ask me. I am choosing not to mention it."
- Native audio cue: Office hum, faint bass.


### XVII. After (6:20)

**P3-S45** | 6:20 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XVII. AFTER"
- Audio: none
- Native audio cue: Last chord of the set, fading.

**P3-S46** | 6:24 | 10s | 10s, 16:9, 1080p
- Prompt: Haze drifting over an emptying beach on Isthmus Cove after the set, stage lights dimming, a few dancers sitting on the sand, moored boats rocking, the dark green hills behind.
- Camera: Wide, tripod, slow pan.
- Graphics (add in edit): Lower note: "1:14 AM"
- Audio: NARRATOR: "After the set, Greg stayed on the sand until the crew turned off the lights."
- Native audio cue: Crowd dispersing, distant laughter, waves returning.
- Reference slots: REF-LOC-01, REF-LOC-02

**P3-S47** | 6:34 | 10s | 10s, 16:9, 1080p
- Prompt: GREG-BOOT and JADE sit on the sand sharing a bottle of water, he points at the lasers being packed up and explains something with his hands.
- Camera: Medium wide, handheld, from behind and to the side.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Waves. Muffled talk. Truss clanking.

**P3-S48** | 6:44 | 11s | 11s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: JADE, lifeguard stand set, laughing.
- Camera: Close-up, handheld.
- Graphics (add in edit): none
- Audio: JADE: "He explained the cost of the lasers per minute. Then he said it was worth it. He seemed surprised he said it."
- Native audio cue: Waves.

**P3-S49** | 6:55 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA, CREATIVE STUDIO set, warm.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: CAROLINA: "From a brand view, it's a great redemption story. Same shirt. New ending. The audience loves a man who finally waits for the drop."
- Native audio cue: Room tone.


### Epilogue (7:07)

**P3-S50** | 7:07 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "EPILOGUE"
- Audio: none
- Native audio cue: Soft piano returns.

**P3-S51** | 7:11 | 10s | 10s, 16:9, 1080p
- Prompt: Dawn on the Isthmus Cove beach: the stage half dismantled, gulls on the sand, GREG-BOOT asleep in a beach chair, glow bracelet faded, the moored boats and the Isthmus pier in soft light, green hills behind.
- Camera: Wide, tripod, very slow push-in.
- Graphics (add in edit): none
- Audio: NARRATOR: "Greg nearly missed his ship. The ship waited. He did not ask how much that cost."
- Native audio cue: Gulls, waves, a shore boat horn at the pier.
- Reference slots: REF-LOC-01, REF-LOC-02

**P3-S52** | 7:21 | 14s | 14s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set, the warmest light.
- Camera: Close-up, slight drift.
- Graphics (add in edit): none
- Audio: ELLIOTT: "I fired Greg for stopping at the first number. Watching that video, he stayed for the whole song. I'm glad. I'd still like him to read page two."
- Native audio cue: Piano.

**P3-S53** | 7:35 | 13s | 13s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT, beach chair set, now at dawn, sunglasses down.
- Camera: Close-up, tripod.
- Graphics (add in edit): none
- Audio: GREG: "People ask if I regret the memo. I regret the dock. The memo, I've made my peace with. I'm having the time of my life. Write that down."
- Native audio cue: Waves. Piano.

**P3-S54** | 7:48 | 10s | 10s, 16:9, 1080p
- Prompt: GREG-BOOT walks carefully down the Isthmus pier toward the waiting shore boat back to Avalon, stepping around a wet patch, glow bracelet on his wrist, moored boats and green hills around him.
- Camera: Wide, from behind, handheld, slight sway.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Boot on wood. Gulls. One distant kick drum, then silence.
- Reference slots: REF-LOC-01, REF-LOC-02

**P3-S55** | 7:58 | 8s | 8s, 16:9, 1080p
- Prompt: The empty beach chair on the sand at dawn, a faded glow bracelet left on the armrest. Fade to black.
- Camera: Static, fade to black.
- Graphics (add in edit): End card: disclaimer (see assembly notes).
- Audio: none
- Native audio cue: Final piano chord rings out.

## Assembly notes

1. Shot lengths add up to the runtime. Keep the music-only rave stretches. They are the joke and the payoff.
2. Pacing. The first half stays quiet and documentary. The rave chapters (XIV to XVI) get louder and faster. Cut straight back to the plain interview look after each burst.
3. The drop (P3-S34 to P3-S36). Hold the blackout a full two seconds before the drop hits.
4. Music. Use original or licensed melodic techno in a Miss Monique style. Don't use her tracks, name or likeness. The HEADLINER is never shown from the front.
5. Greg looks the same as in Parts 1 and 2. Generate one GREG-BOOT still and one RYAN still from the token text and reuse them. Never use a real photo of Greg or Ryan.
6. Check every clip for real logos, ship names, readable signage or real faces, and regenerate any that has one.
7. Disclaimer card at the end: "Fictional parody. Greg (invented face, not based on any real person), Fred, Elliott as CFO, Carolina, Markus Schultz, Jade, Ryan (invented look, not his likeness), the headliner and the Sand Stage event are invented. The real Dodgers ownership is not depicted. Miss Monique-style describes the music genre only. She does not appear and is not involved. Avalon and Two Harbors appear as locations."
