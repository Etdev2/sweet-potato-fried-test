# Grok Imagine prompt pack: The Greg blunder, Part Three: The Drop

Source script: [greg-part3-rave-script.md](greg-part3-rave-script.md). 49 shots, 7:10, 486 spoken words. Script and pack come from one shot list, so every spoken line matches word for word. Limits and workflow follow the Part 1 and 2 pack (`grok-prompt-pack.md`).

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
| HEADLINER | a fictional DJ shown only from behind or as a dark silhouette against the LED wall, black hoodie, headphones on one ear, face never shown, not based on any real DJ |

Interview sets. GREG-BOOT: a folding beach chair on the Avalon sand, boot propped on a cooler, harbor behind (dusk for most bites, dawn for the last). ELLIOTT: glass-walled conference room. CAROLINA: bright home office with mood boards. MARKUS: home study with a window. JADE: a lifeguard stand at night with laser light passing over. FRED: a desk in a quiet home office.

## Reference image placeholders (location and venue only)

Elliott will add his own reference pictures here. Use them for places and stage design only. Never attach a real photo of Greg or any real person; Greg comes from the character sheet text and a generated still.

| Slot | File name | What it shows | Used in |
| --- | --- | --- | --- |
| REF-LOC-01 | ref-avalon-pier.jpg | Avalon pier and tender landing, daytime | P3-S01, P3-S02, P3-S03, P3-S48 |
| REF-LOC-02 | ref-avalon-harbor-dusk.jpg | Avalon harbor and beach at dusk | P3-S01, P3-S16, P3-S24, P3-S34, P3-S40, P3-S45 |
| REF-LOC-03 | ref-avalon-casino-night.jpg | Avalon Casino building lit at night | P3-S16, P3-S24, P3-S34, P3-S36, P3-S40 |
| REF-LOC-04 | ref-cruise-ship-anchored.jpg | Cruise ship anchored off Avalon (logos removed) | P3-S01, P3-S34, P3-S45, P3-S48 |
| REF-LOC-05 | ref-front-street-waterfront.jpg | Front Street lamp posts and souvenir stands | P3-S11, P3-S14 |
| REF-VEN-01 | ref-stage-truss-lasers.jpg | Beach stage truss with laser rig | P3-S17, P3-S26 |
| REF-VEN-02 | ref-led-wall.jpg | LED wall and DJ booth layout | P3-S18, P3-S23, P3-S31, P3-S32 |
| REF-VEN-03 | ref-laser-over-water.jpg | Laser fan over water | P3-S16, P3-S24, P3-S34 |
| REF-VEN-04 | ref-crowd-haze.jpg | Crowd in haze, view from mid floor | P3-S18, P3-S23, P3-S25, P3-S26, P3-S28, P3-S31, P3-S32, P3-S33, P3-S34, P3-S36 |
| REF-VEN-05 | ref-drone-beach-night.jpg | Drone angle over a beach event at night | P3-S16, P3-S34 |

In each shot below, a line "Reference slots" names which placeholders to attach once they exist.

## Shot list (49 shots, 7:10)


### Cold open (0:00)

**P3-S01** | 0:00 | 8s | 8s, 16:9, 1080p
- Prompt: A large white cruise ship anchored off a small island harbor town at golden hour, tenders ferrying passengers to a pier, palm trees and hills behind. No ship name or logo visible.
- Camera: Wide, handheld from a small boat, gentle bob.
- Graphics (add in edit): Lower note: "Avalon, Catalina Island"
- Audio: NARRATOR: "In Part Two, Greg left Catalina Island on a stretcher."
- Native audio cue: Ship horn, far off. Water slapping the hull. One low piano note.
- Reference slots: REF-LOC-01, REF-LOC-02, REF-LOC-04

**P3-S02** | 0:08 | 9s | 9s, 16:9, 1080p
- Prompt: GREG-BOOT steps off a tender boat onto the Avalon pier, one hand on the rail, the black walking boot landing carefully on the wet planks.
- Camera: Low angle at boot level, handheld, tilts up to his face.
- Graphics (add in edit): none
- Audio: NARRATOR: "This summer, he came back on a cruise ship. He took the stairs very slowly."
- Native audio cue: Boot thunk on wood. Gulls. Tender engine idling.
- Reference slots: REF-LOC-01

**P3-S03** | 0:17 | 7s | 7s, 16:9, 1080p
- Prompt: GREG-BOOT stands on the pier, sunglasses pushed up, looks down at the planks, then steps around one wet patch with great care.
- Camera: Medium, handheld, slight push-in.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Gulls. A single bass pulse from somewhere down the beach, felt more than heard.
- Reference slots: REF-LOC-01

**P3-S04** | 0:24 | 6s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "THE GREG BLUNDER" / "Part Three: The Drop" / "a documentary"
- Audio: none
- Native audio cue: Room tone. Distant bass pulse.

**P3-S05** | 0:30 | 6s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "For the first time, Greg agreed to be interviewed."
- Audio: none
- Native audio cue: Room tone.


### XII. Correction (0:36)

**P3-S06** | 0:36 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XII. A CORRECTION"
- Audio: none
- Native audio cue: Room tone.

**P3-S07** | 0:40 | 8s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "In Part Two, we said Greg's ankle had healed. It has mostly healed."
- Audio: none
- Native audio cue: Room tone.

**P3-S08** | 0:48 | 13s | 13s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT on a folding chair on the sand at dusk, the walking boot propped on a cooler, harbor lights behind him.
- Camera: Medium close-up, tripod, slight drift.
- Graphics (add in edit): Lower-third: "GREG / Former Forecasting Lead"
- Audio: GREG: "The boot is precautionary. The doctor said six weeks. I've been doing my own forecast. I'm at week eleven."
- Native audio cue: Waves. Faint bass through the sand.

**P3-S09** | 1:01 | 10s | 10s, 16:9, 1080p
- Prompt: FRED's desk terminal, screen glowing blue.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "Greg is wearing the boot on the correct foot. I have confirmed this."
- Native audio cue: Quiet office hum.


### XIII. The flyer (1:11)

**P3-S10** | 1:11 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XIII. THE FLYER"
- Audio: none
- Native audio cue: Room tone.

**P3-S11** | 1:15 | 8s | 8s, 16:9, 1080p
- Prompt: Close-up of a paper flyer taped to a wooden lamp post on Avalon's waterfront, a black-and-gold abstract wave design, a date and the word BEACH. No real names or logos.
- Camera: Close-up, handheld, slight rack focus.
- Graphics (add in edit): Text in edit only. Flyer text: "FRONT STREET SUNSET / MELODIC TECHNO / SAND STAGE"
- Audio: NARRATOR: "He saw the flyer on a lamp post forty feet from the dock where he fell."
- Native audio cue: Breeze rattling the paper. Gulls.
- Reference slots: REF-LOC-05

**P3-S12** | 1:23 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT, beach chair set, dusk.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: GREG: "I'd never been to one. In accounting you go to a conference. There's a lanyard and a buffet. Nobody turns the lights off."
- Native audio cue: Waves.

**P3-S13** | 1:35 | 13s | 13s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA, CREATIVE STUDIO set, amused.
- Camera: Close-up, slight drift.
- Graphics (add in edit): Lower-third: "CAROLINA / Marketing Strategist"
- Audio: CAROLINA: "Miss Monique-style melodic techno is long builds and a big emotional release. It's for people who like to wait for the payoff. Greg is that audience. He just never got the payoff."
- Native audio cue: Room tone.

**P3-S14** | 1:48 | 10s | 10s, 16:9, 1080p
- Prompt: GREG-BOOT at a beachfront souvenir stand under string lights, paying cash for a neon glow bracelet, holding it up to read the price tag.
- Camera: Medium, handheld.
- Graphics (add in edit): none
- Audio: NARRATOR: "He bought one glow bracelet. He asked for a receipt."
- Native audio cue: Cash register ding. Distant kick drum.
- Reference slots: REF-LOC-05


### XIV. Sand stage (1:58)

**P3-S15** | 1:58 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XIV. SAND STAGE"
- Audio: none
- Native audio cue: Kick drum, muffled, growing.

**P3-S16** | 2:02 | 12s | 12s, 16:9, 1080p
- Prompt: Drone shot at blue hour: Avalon harbor, boats on moorings, the round white Avalon Casino building on its point lit warmly, and a stage on the beach below with green lasers starting to sweep over the water. No signage text.
- Camera: Drone, slow forward glide and descent.
- Graphics (add in edit): Lower note: "Avalon, 8:41 PM"
- Audio: NARRATOR: "The stage went up on the beach in an afternoon. By nine, the harbor was the loudest it's been since the dock incident."
- Native audio cue: Melodic techno, wide pads, a slow arpeggio. Crowd murmur rises.
- Reference slots: REF-LOC-02, REF-LOC-03, REF-VEN-03, REF-VEN-05

**P3-S17** | 2:14 | 8s | 8s, 16:9, 1080p
- Prompt: Stage crew in black shirts testing a row of lasers on a truss above the sand; single green beams flick on, fan out and fan back in. Haze machines puff white clouds.
- Camera: Medium wide, handheld from side stage.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Laser fan whir, haze hiss, crew radio chatter, kick drum test hits.
- Reference slots: REF-VEN-01

**P3-S18** | 2:22 | 8s | 8s, 16:9, 1080p
- Prompt: A huge LED wall behind the DJ booth cycles through slow abstract waves of deep blue and amber, the shape of a crowd silhouetted in front of it.
- Camera: Wide, handheld from mid crowd, slight sway.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Pads swell. Crowd cheers at a color change.
- Reference slots: REF-VEN-02, REF-VEN-04

**P3-S19** | 2:30 | 10s | 10s, 16:9, 1080p
- Prompt: GREG-BOOT at the edge of the sand, glow bracelet on, looking up at the lasers with his mouth slightly open, the beams reflected in his mirrored sunglasses.
- Camera: Close-up, handheld, slow push-in.
- Graphics (add in edit): none
- Audio: NARRATOR: "Greg stood at the edge of the sand for twenty minutes. Witnesses describe him as stationary."
- Native audio cue: Arpeggio climbing. Bass muffled, as if heard from outside.

**P3-S20** | 2:40 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: a realistic woman in her 20s with an invented face, braids, a sequined bucket hat, glow paint on one cheek, seated on a lifeguard stand at night, laser light passing over her.
- Camera: Medium close-up, handheld, slight drift.
- Graphics (add in edit): Lower-third: "JADE / Raver"
- Audio: JADE: "There was a guy in a walking boot just looking at the speakers like they owed him money. I asked if he was okay. He said he was running the numbers."
- Native audio cue: Muffled set behind her.

**P3-S21** | 2:52 | 9s | 9s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT, beach chair set.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: GREG: "Ticket, bracelet, ferry back. It came to less than one Ohtani at-bat. I did the math. Then I stopped doing the math."
- Native audio cue: Waves.


### XV. The build (3:01)

**P3-S22** | 3:01 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XV. THE BUILD"
- Audio: none
- Native audio cue: A rising synth, held.

**P3-S23** | 3:05 | 10s | 10s, 16:9, 1080p
- Prompt: The HEADLINER in the DJ booth, seen only from behind, a dark silhouette against the LED wall, one hand raised over the mixer, the crowd a sea of raised arms beyond.
- Camera: Wide, from behind the booth, handheld, slight sway.
- Graphics (add in edit): Lower note: "Headliner: fictional"
- Audio: NARRATOR: "The headliner played a set in the Miss Monique style. Twelve-minute builds. Very few words."
- Native audio cue: Long melodic techno build, filtered kick, choir-like pad.
- Reference slots: REF-VEN-02, REF-VEN-04

**P3-S24** | 3:15 | 8s | 8s, 16:9, 1080p
- Prompt: Wide view from the shoreline: a fan of green and white laser beams spreading flat across the dark harbor water, the Casino building glowing on the point behind, haze drifting.
- Camera: Wide, tripod, slight wind shake.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Build continues. Water lapping. Crowd roar far off.
- Reference slots: REF-LOC-02, REF-LOC-03, REF-VEN-03

**P3-S25** | 3:23 | 8s | 8s, 16:9, 1080p
- Prompt: Inside the crowd: dancers with glow sticks and phone lights, haze, beams slicing overhead, sweat and sand, everyone facing the stage.
- Camera: Handheld, moving through the crowd at chest height.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Build, kick filtered out, crowd chanting a count.
- Reference slots: REF-VEN-04

**P3-S26** | 3:31 | 8s | 8s, 16:9, 1080p
- Prompt: Moving-head lights on the truss sweep thick white beams through the haze, crossing and uncrossing above the crowd like searchlights.
- Camera: Low angle from the crowd, handheld, slight sway.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Build, rising snare roll, crowd whoops.
- Reference slots: REF-VEN-01, REF-VEN-04

**P3-S27** | 3:39 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set, a phone in his hand.
- Camera: Close-up, slight drift.
- Graphics (add in edit): Lower-third: "ELLIOTT / Chief Financial Officer"
- Audio: ELLIOTT: "Carolina sent me a video at eleven at night. No caption. I watched it four times. I knew the shirt before I knew the face."
- Native audio cue: Room tone.

**P3-S28** | 3:51 | 9s | 9s, 16:9, 1080p
- Prompt: Shaky vertical phone video, pillarboxed: GREG-BOOT in the middle of the crowd, slowly starting to nod his head, glow bracelet raised.
- Camera: Handheld phone, zooming in and out.
- Graphics (add in edit): Overlay: "VIDEO SENT TO ELLIOTT, 11:02 PM"
- Audio: none
- Native audio cue: Phone-mic distortion, bass clipping.
- Reference slots: REF-VEN-04

**P3-S29** | 4:00 | 10s | 10s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT, beach chair set, eyes on the water.
- Camera: Close-up, slow push-in.
- Graphics (add in edit): none
- Audio: GREG: "The song kept building and building. I kept thinking, it's too long, it's too much. And then I thought, maybe I always say that."
- Native audio cue: Waves. A single sustained pad note.


### XVI. The drop (4:10)

**P3-S30** | 4:10 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XVI. THE DROP"
- Audio: none
- Native audio cue: Silence for one beat.

**P3-S31** | 4:14 | 6s | 6s, 16:9, 1080p
- Prompt: The LED wall goes black. Every laser cuts out. The crowd is lit only by phone lights in the haze.
- Camera: Wide, handheld, very still.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Two seconds of near silence. A held breath across the beach.
- Reference slots: REF-VEN-02, REF-VEN-04

**P3-S32** | 4:20 | 8s | 8s, 16:9, 1080p
- Prompt: The drop hits: every laser fans out at once in white and green over the crowd and the water, the LED wall explodes into gold, CO2 jets blast white plumes from the stage front.
- Camera: Wide, handheld, the camera jolted by the bass.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Full drop. Deep kick and bass, crowd scream, CO2 jet blast.
- Reference slots: REF-VEN-02, REF-VEN-04

**P3-S33** | 4:28 | 8s | 8s, 16:9, 1080p
- Prompt: GREG-BOOT in the crowd, both arms up, dancing with his weight on the good foot, the boot planted like an anchor, a huge grin, laser beams crossing above him.
- Camera: Medium, handheld, circling him.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Drop continues at full volume.
- Reference slots: REF-VEN-04

**P3-S34** | 4:36 | 10s | 10s, 16:9, 1080p
- Prompt: Drone shot at night pulling back and up from the beach: the crowd, the lasers over the water, the glowing Casino building, the dark harbor full of moored boats, the cruise ship lit far out at sea.
- Camera: Drone, slow pull back and rise.
- Graphics (add in edit): none
- Audio: NARRATOR: "For eight minutes, the man who passed on seven hundred million dollars didn't pass on anything."
- Native audio cue: Drop rolls on, heard from above, wind on the drone.
- Reference slots: REF-LOC-02, REF-LOC-03, REF-LOC-04, REF-VEN-03, REF-VEN-04, REF-VEN-05

**P3-S35** | 4:46 | 8s | 8s, 16:9, 1080p
- Prompt: Close-up of the walking boot on the sand, keeping time, tapping once per beat, glow-stick light flickering across it.
- Camera: Low close-up, handheld.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Kick drum, boot thump in sync.

**P3-S36** | 4:54 | 8s | 8s, 16:9, 1080p
- Prompt: A tunnel of green laser beams fans low over the crowd's raised hands, haze glowing, confetti drifting down through the light, the Casino building lit beyond the stage.
- Camera: Handheld from mid crowd, slow tilt up.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Drop continues, crowd singing a wordless melody.
- Reference slots: REF-LOC-03, REF-VEN-04

**P3-S37** | 5:02 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: MARKUS, study set, reading glasses on, watching a tablet.
- Camera: Close-up, slight drift.
- Graphics (add in edit): Lower-third: "MARKUS SCHULTZ / Owner (fictional)"
- Audio: MARKUS: "I don't follow techno. I followed the boot. The boot never missed a beat. That's more than I can say for his forecasts."
- Native audio cue: Faint drop audio from the tablet.

**P3-S38** | 5:14 | 10s | 10s, 16:9, 1080p
- Prompt: FRED's desk terminal, screen glowing blue, a faint laser-green reflection drifting across it.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "The drop arrived at minute twelve, as forecast. Greg did not ask me. I am choosing not to mention it."
- Native audio cue: Office hum, faint bass.


### XVII. After (5:24)

**P3-S39** | 5:24 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XVII. AFTER"
- Audio: none
- Native audio cue: Last chord of the set, fading.

**P3-S40** | 5:28 | 10s | 10s, 16:9, 1080p
- Prompt: Haze drifting over an emptying beach after the set, stage lights dimming, a few dancers sitting on the sand, the Casino building lit on the point.
- Camera: Wide, tripod, slow pan.
- Graphics (add in edit): Lower note: "1:14 AM"
- Audio: NARRATOR: "After the set, Greg stayed on the sand until the crew turned off the lights."
- Native audio cue: Crowd dispersing, distant laughter, waves returning.
- Reference slots: REF-LOC-02, REF-LOC-03

**P3-S41** | 5:38 | 10s | 10s, 16:9, 1080p
- Prompt: GREG-BOOT and JADE sit on the sand sharing a bottle of water, he points at the lasers being packed up and explains something with his hands.
- Camera: Medium wide, handheld, from behind and to the side.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Waves. Muffled talk. Truss clanking.

**P3-S42** | 5:48 | 11s | 11s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: JADE, lifeguard stand set, laughing.
- Camera: Close-up, handheld.
- Graphics (add in edit): none
- Audio: JADE: "He explained the cost of the lasers per minute. Then he said it was worth it. He seemed surprised he said it."
- Native audio cue: Waves.

**P3-S43** | 5:59 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA, CREATIVE STUDIO set, warm.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: CAROLINA: "From a brand view, it's a great redemption story. Same shirt. New ending. The audience loves a man who finally waits for the drop."
- Native audio cue: Room tone.


### Epilogue (6:11)

**P3-S44** | 6:11 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "EPILOGUE"
- Audio: none
- Native audio cue: Soft piano returns.

**P3-S45** | 6:15 | 10s | 10s, 16:9, 1080p
- Prompt: Dawn on Avalon's beach: the stage half dismantled, gulls on the sand, GREG-BOOT asleep in a beach chair, glow bracelet faded, the cruise ship visible offshore.
- Camera: Wide, tripod, very slow push-in.
- Graphics (add in edit): none
- Audio: NARRATOR: "Greg nearly missed his ship. The ship waited. He did not ask how much that cost."
- Native audio cue: Gulls, waves, ship horn far out.
- Reference slots: REF-LOC-02, REF-LOC-04

**P3-S46** | 6:25 | 14s | 14s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set, the warmest light.
- Camera: Close-up, slight drift.
- Graphics (add in edit): none
- Audio: ELLIOTT: "I fired Greg for stopping at the first number. Watching that video, he stayed for the whole song. I'm glad. I'd still like him to read page two."
- Native audio cue: Piano.

**P3-S47** | 6:39 | 13s | 13s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT, beach chair set, now at dawn, sunglasses down.
- Camera: Close-up, tripod.
- Graphics (add in edit): none
- Audio: GREG: "People ask if I regret the memo. I regret the dock. The memo, I've made my peace with. I'm having the time of my life. Write that down."
- Native audio cue: Waves. Piano.

**P3-S48** | 6:52 | 10s | 10s, 16:9, 1080p
- Prompt: GREG-BOOT walks carefully down the pier toward a waiting tender, stepping around the same wet patch, glow bracelet on his wrist, the cruise ship ahead.
- Camera: Wide, from behind, handheld, slight sway.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Boot on wood. Gulls. One distant kick drum, then silence.
- Reference slots: REF-LOC-01, REF-LOC-04

**P3-S49** | 7:02 | 8s | 8s, 16:9, 1080p
- Prompt: The empty beach chair on the sand at dawn, a faded glow bracelet left on the armrest. Fade to black.
- Camera: Static, fade to black.
- Graphics (add in edit): End card: disclaimer (see assembly notes).
- Audio: none
- Native audio cue: Final piano chord rings out.

## Assembly notes

1. Shot lengths add up to the runtime. Keep the music-only rave stretches. They are the joke and the payoff.
2. Pacing. The first half stays quiet and documentary. The rave chapters (XIV to XVI) get louder and faster. Cut straight back to the plain interview look after each burst.
3. The drop (P3-S31 to P3-S33). Hold the blackout a full two seconds before the drop hits.
4. Music. Use original or licensed melodic techno in a Miss Monique style. Don't use her tracks, name or likeness. The HEADLINER is never shown from the front.
5. Greg looks the same as in Parts 1 and 2. Generate one GREG-BOOT still from the token text and reuse it. Never use a real photo of Greg.
6. Check every clip for real logos, ship names, readable signage or real faces, and regenerate any that has one.
7. Disclaimer card at the end: "Fictional parody. Greg (invented face, not based on any real person), Fred, Elliott as CFO, Carolina, Markus Schultz, Jade, the headliner and the Sand Stage event are invented. The real Dodgers ownership is not depicted. Miss Monique-style describes the music genre only. She does not appear and is not involved. Avalon appears as a location."
