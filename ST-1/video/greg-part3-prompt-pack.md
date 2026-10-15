# Grok Imagine prompt pack: The Greg blunder, Part Three: The Drop

Source script: [greg-part3-rave-script.md](greg-part3-rave-script.md). 63 shots, 9:00, 620 spoken words. Script and pack are generated from one shot list, so the spoken lines match. Limits and workflow follow the Part 1 and 2 pack (`grok-prompt-pack.md`).

## Settings for every clip

- 16:9, 1080p, 6 to 15 seconds per generation. Cards under 6 seconds are made in the editor, not generated.
- Native audio on. Each shot lists the dialogue and the sound to generate. Record narration and interviews as voiceover if lip-sync drifts on longer lines.
- Reference-to-video tops out at 720p. If you attach reference stills, generate at 720p and upscale, or use image-to-video from a 1080p still.
- Add every card, lower-third, overlay and caption in the editor. Don't ask the model to render text.

## Global style line (paste first in every prompt)

> Authentic YouTube documentary look: natural light or practical lamps, mirrorless camera, iPhone or consumer drone, slight handheld movement, real places, imperfect framing, light digital noise, no film grain or heavy color grading, realistic everyday people. Not a cartoon, not a glossy music video.

Add to every prompt that shows a person: "invented face, not based on any real person or photo; no real logos, brand names or team wordmarks."

Add to every rave shot: "outdoor beach stage on sand by the water, curved layered face with neon-green and white LED bands and magenta accents, white arched shell canopy, small lit pyramid, truss beam lights through haze, LED screens with starry blue and teal floating particles only, no logos or text on screens."

## Character sheet (paste the token text exactly, every time)

| Token | Paste this |
| --- | --- |
| GREG | a realistic man in his early 40s with an invented face, short slightly thinning dark hair, round friendly face, a bit sunburned, blue mirrored sunglasses pushed up on his head, a dark short-sleeve button-down Hawaiian shirt with a light pineapple and palm-frond print and sleeves slightly rolled, dark jeans, an orange festival wristband on his right wrist |
| GREG-BOOT | GREG in the same dark Hawaiian pineapple-and-palm shirt with sleeves slightly rolled and blue mirrored sunglasses, navy board shorts with a small white repeating shark print instead of jeans, a black medical walking boot on his right foot and a white sneaker on his left, an orange festival wristband on his right wrist |
| ELLIOTT | a realistic CFO in his late 30s to 40s with an invented face, neat short hair, navy suit, open collar, calm |
| CAROLINA | a realistic woman in her late 30s with an invented face, dark shoulder-length hair, cream blazer, minimal gold jewelry, warm and sharp |
| MARKUS | a realistic man in his 60s with an invented face, fictional owner Markus Schultz, silver hair, charcoal suit, no tie |
| FRED | an AI controller: a desk terminal with a glowing blue screen and a small speaker grille, no face, calm synthetic voice |
| JADE | a realistic woman in her 20s with an invented face, braids, sequined bucket hat, glow paint on one cheek, oversized plain black t-shirt |
| RYAN | a realistic man about 35 with an invented face, lanky build, dark curly hair, tanned skin, plain teal t-shirt, an energetic grin; a generic character description, not based on any real person or photo |
| OMAR | a realistic man about 40 with an invented face, wiry build, tousled dark curly hair, a plain T-shirt that reads exactly "JESUS LOVES YOU" in bold block letters across the chest, khaki cargo pants, LED gloves or light-up poi, an intense joyful showman expression; Christian raver who gives light shows; a generic character description, not based on any real person or photo |
| CAROLYN | a realistic woman in her 40s with an invented face, red top, white skirt, glow bracelets on both wrists, a big laugh; a generic character description, not based on any real person or photo |
| MARCEL | a realistic man in his 40s with an invented face, teal floral aloha shirt, white shorts, sandals, a wide grin; a generic character description, not based on any real person or photo |
| HEADLINER | a fictional DJ shown only from behind or as a dark silhouette against the stage LED screens, black hoodie, headphones on one ear, face never shown, not based on any real DJ |

Interview sets. GREG-BOOT: a folding beach chair on the Isthmus Cove sand at Two Harbors, boot propped on a cooler, moored boats and green hills behind (dusk for most bites, dawn for the last). ELLIOTT: glass-walled conference room. CAROLINA: bright home office with mood boards. MARKUS: home study with a window. JADE: a lifeguard stand at night with laser light passing over. RYAN, OMAR, and CAROLYN with MARCEL: an overturned crate beside the sand stage at night. FRED: a desk in a quiet home office.

## Reference image placeholders (location and venue only)

Location slots are filled with Elliott's Two Harbors photos in `refs/`. Venue slots stay open for his rave pictures. Use them for places and stage design only. Never attach a real photo of Greg, Ryan, Omar, Carolyn, Marcel or anyone else. They all come from the character sheet text and generated stills.

| Slot | File name | What it shows | Used in |
| --- | --- | --- | --- |
| REF-LOC-01 | refs/two-harbors-catalina-harbor.png | Elliott's photo: hilltop view of a turquoise cove with pier and moorings, green hills, village, ocean beyond | P3-S07, P3-S20, P3-S32, P3-S46, P3-S47, P3-S54, P3-S59, P3-S62 |
| REF-LOC-02 | refs/two-harbors-aerial.png | Elliott's photo: aerial of Isthmus Cove, moored-boat field, pier, beach, village, far harbor through the neck | P3-S20, P3-S32, P3-S46, P3-S47, P3-S49, P3-S54, P3-S59, P3-S62 |
| REF-LOC-03 | refs/two-harbors-coast.png | Elliott's photo: aerial of coastline, campground and winding road above a blue bay with boats | P3-S07 |
| REF-LOC-04 | ref-avalon-pier.jpg (open) | Avalon pier and tender landing, daytime | P3-S05, P3-S06, P3-S15 |
| REF-LOC-05 | ref-cruise-ship-anchored.jpg (open) | Cruise ship anchored off Avalon (logos removed); also usable for night deck silhouette | P3-S01, P3-S02, P3-S03, P3-S04 |
| REF-VEN-01 | ref-stage-truss-beams.jpg (open) | Outdoor beach stage on sand: curved layered face with horizontal neon-green and white LED bands, magenta accents, truss beam lights in haze | P3-S20, P3-S21, P3-S22, P3-S23, P3-S31, P3-S32, P3-S33, P3-S35, P3-S40, P3-S41, P3-S42, P3-S43, P3-S46, P3-S47, P3-S49, P3-S52, P3-S54, P3-S55 |
| REF-VEN-02 | ref-stage-canopy-pyramid.jpg (open) | White arched shell canopy over crowd, small lit pyramid, LED screens with starry blue/teal particles, DJ booth | P3-S20, P3-S21, P3-S22, P3-S31, P3-S33, P3-S40, P3-S41, P3-S46, P3-S54 |
| REF-VEN-03 | ref-beams-over-water.jpg (open) | Truss beams and stage LED glow over cove water at night | P3-S32, P3-S47 |
| REF-VEN-04 | ref-crowd-haze.jpg (open) | Crowd under canopy: hazy white truss beams over raised hands in silhouette, phones and wristbands, purple overhead wash | P3-S01, P3-S20, P3-S22, P3-S27, P3-S31, P3-S33, P3-S35, P3-S37, P3-S40, P3-S41, P3-S42, P3-S43, P3-S44, P3-S46, P3-S49 |
| REF-VEN-05 | ref-drone-beach-night.jpg (open) | Drone over outdoor beach stage on sand by the water, island hills behind | P3-S20, P3-S46, P3-S47 |

In each shot below, a line "Reference slots" names what to attach. LOC-01 to LOC-03 are ready in `refs/`; the rest attach once Elliott supplies them.

## Shot list (63 shots, 9:00)


### Cold open (0:00)

**P3-S01** | 0:00 | 8s | 8s, 16:9, 1080p
- Prompt: Cruise ship outdoor wooden deck at night: deep blue, purple and magenta club lights cutting through haze, white railings, cabin balconies and lifeboats behind a casual crowd holding red cups. No ship name or logo.
- Camera: Wide, handheld, slow pan across the deck.
- Graphics (add in edit): Lower note: "The night before Avalon"
- Audio: NARRATOR: "The night before Avalon, Greg went to the deck party."
- Native audio cue: Bass from deck speakers. Crowd chatter. Soft ocean wind.
- Reference slots: REF-LOC-05, REF-VEN-04

**P3-S02** | 0:08 | 7s | 7s, 16:9, 1080p
- Prompt: GREG-BOOT near a white railing on the night deck, half-asleep on his feet, chin dipping then jerking up, bobbing slightly out of time with the music. Blue and magenta light on his face.
- Camera: Medium, handheld, slight bob with him.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Muffled deck music. A red cup clinks on a rail.
- Reference slots: REF-LOC-05

**P3-S03** | 0:15 | 9s | 9s, 16:9, 1080p
- Prompt: GREG-BOOT stumbles hard forward on the wooden deck; an invented woman with long dark hair, a beige patterned maxi skirt, a dark top and a light-blue denim jacket over her shoulders catches him in an awkward, dazed hug. Both look startled and tired from standing too long, not drunk. Crowd with red cups under blue and purple lights behind them.
- Camera: Medium, handheld, a quick catch-up step as he falls.
- Graphics (add in edit): none
- Audio: NARRATOR: "He lasted forty minutes. Exhaustion got him. A stranger got him next."
- Native audio cue: A scuff on wood. Short laugh nearby. Deck music continues.
- Reference slots: REF-LOC-05

**P3-S04** | 0:24 | 8s | 8s, 16:9, 1080p
- Prompt: A large white cruise ship anchored off a small island harbor town at golden hour, tenders ferrying passengers to a pier, palm trees and hills behind. No ship name or logo visible.
- Camera: Wide, handheld from a small boat, gentle bob.
- Graphics (add in edit): Lower note: "Avalon, Catalina Island"
- Audio: NARRATOR: "In Part Two, Greg left Catalina Island on a stretcher."
- Native audio cue: Ship horn, far off. Water slapping the hull. One low piano note.
- Reference slots: REF-LOC-05

**P3-S05** | 0:32 | 9s | 9s, 16:9, 1080p
- Prompt: GREG-BOOT steps off a tender boat onto the Avalon pier, one hand on the rail, the black walking boot landing carefully on the wet planks.
- Camera: Low angle at boot level, handheld, tilts up to his face.
- Graphics (add in edit): none
- Audio: NARRATOR: "This summer, he came back on a cruise ship. He took the stairs very slowly."
- Native audio cue: Boot thunk on wood. Gulls. Tender engine idling.
- Reference slots: REF-LOC-04

**P3-S06** | 0:41 | 5s | 5s, 16:9, 1080p
- Prompt: GREG-BOOT stands on the pier, sunglasses pushed up, looks down at the planks, then steps around one wet patch with great care.
- Camera: Medium, handheld, slight push-in.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Gulls. Tender engine idling. Water against the pilings.
- Reference slots: REF-LOC-04

**P3-S07** | 0:46 | 8s | 8s, 16:9, 1080p
- Prompt: GREG-BOOT sits on the open back deck of a small shore boat running up Catalina's coastline, steep green hills, a campground and a winding dirt road above a blue bay with a few boats at anchor.
- Camera: Wide, handheld from the boat's stern, gentle bob and spray.
- Graphics (add in edit): Lower note: "Shore boat to Two Harbors"
- Audio: NARRATOR: "He did not stay in Avalon. He took the shore boat up the coast to Two Harbors."
- Native audio cue: Outboard drone, hull slapping, wind. One faint bass pulse from far up the coast.
- Reference slots: REF-LOC-01, REF-LOC-03

**P3-S08** | 0:54 | 6s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "THE GREG BLUNDER" / "Part Three: The Drop" / "a documentary"
- Audio: none
- Native audio cue: Room tone. Faint bass pulse.

**P3-S09** | 1:00 | 6s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "For the first time, Greg agreed to be interviewed."
- Audio: none
- Native audio cue: Room tone.


### XII. Correction (1:06)

**P3-S10** | 1:06 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XII. A CORRECTION"
- Audio: none
- Native audio cue: Room tone.

**P3-S11** | 1:10 | 8s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "In Part Two, we said Greg's ankle had healed. It has mostly healed."
- Audio: none
- Native audio cue: Room tone.

**P3-S12** | 1:18 | 13s | 13s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT on a folding chair on the Isthmus Cove sand at dusk, the walking boot propped on a cooler, moored boats and green hills behind him.
- Camera: Medium close-up, tripod, slight drift.
- Graphics (add in edit): Lower-third: "GREG / Former Forecasting Lead"
- Audio: GREG: "The boot is precautionary. The doctor said six weeks. I've been doing my own forecast. I'm at week eleven."
- Native audio cue: Waves. Faint bass through the sand.

**P3-S13** | 1:31 | 10s | 10s, 16:9, 1080p
- Prompt: FRED's desk terminal, screen glowing blue.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "Greg is wearing the boot on the correct foot. I have confirmed this."
- Native audio cue: Quiet office hum.


### XIII. The flyer (1:41)

**P3-S14** | 1:41 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XIII. THE FLYER"
- Audio: none
- Native audio cue: Room tone.

**P3-S15** | 1:45 | 8s | 8s, 16:9, 1080p
- Prompt: Close-up of a paper flyer taped to a wooden lamp post on Avalon's waterfront near the pier, a black-and-gold abstract wave design, a date and the word BEACH. No real names or logos.
- Camera: Close-up, handheld, slight rack focus.
- Graphics (add in edit): Text in edit only. Flyer text: "ISTHMUS SUNSET / MELODIC TECHNO / SAND STAGE / TWO HARBORS"
- Audio: NARRATOR: "He saw the flyer on a lamp post forty feet from the dock where he fell."
- Native audio cue: Breeze rattling the paper. Gulls.
- Reference slots: REF-LOC-04

**P3-S16** | 1:53 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT, beach chair set, dusk.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: GREG: "I'd never been to one. In accounting you go to a conference. There's a lanyard and a buffet. Nobody turns the lights off."
- Native audio cue: Waves.

**P3-S17** | 2:05 | 13s | 13s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA, CREATIVE STUDIO set, amused.
- Camera: Close-up, slight drift.
- Graphics (add in edit): Lower-third: "CAROLINA / Marketing Strategist"
- Audio: CAROLINA: "Miss Monique-style melodic techno is long builds and a big emotional release. It's for people who like to wait for the payoff. Greg is that audience. He just never got the payoff."
- Native audio cue: Room tone.

**P3-S18** | 2:18 | 8s | 8s, 16:9, 1080p
- Prompt: GREG-BOOT at a small beachfront stand in Two Harbors village under string lights, paying cash for a neon glow bracelet, holding it up to read the price tag beside his orange festival wristband.
- Camera: Medium, handheld.
- Graphics (add in edit): none
- Audio: NARRATOR: "He bought one glow bracelet. He asked for a receipt."
- Native audio cue: Cash register ding. Distant kick drum.


### XIV. Sand stage (2:26)

**P3-S19** | 2:26 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XIV. SAND STAGE"
- Audio: none
- Native audio cue: Kick drum, muffled, growing.

**P3-S20** | 2:30 | 12s | 12s, 16:9, 1080p
- Prompt: Drone shot at blue hour over Two Harbors / Little Harbor: Isthmus Cove packed with moored boats, the wooden Isthmus pier, steep green island hills behind, and an outdoor beach stage on the sand by the water — a curved layered face wrapped in horizontal neon-green and white LED bands with magenta accents, a glowing white arched shell canopy over part of the crowd, a small lit pyramid beside the stage, truss rigs starting to throw beam lights through haze. No signage text.
- Camera: Drone, slow forward glide and descent.
- Graphics (add in edit): Lower note: "Two Harbors, 8:41 PM"
- Audio: NARRATOR: "The stage went up on the beach in an afternoon. By nine you could hear it from the moorings."
- Native audio cue: Melodic techno, wide pads, a slow arpeggio. Crowd murmur rises.
- Reference slots: REF-LOC-01, REF-LOC-02, REF-VEN-01, REF-VEN-02, REF-VEN-04, REF-VEN-05

**P3-S21** | 2:42 | 8s | 8s, 16:9, 1080p
- Prompt: Stage crew in black shirts testing truss beam lights above the outdoor beach stage; neon-green and white LED bands on the curved stage face flicker on in layers, magenta accents pulse once, haze machines puff white clouds under the glowing white arched shell canopy.
- Camera: Medium wide, handheld from side stage.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Beam light whir, haze hiss, crew radio chatter, kick drum test hits.
- Reference slots: REF-VEN-01, REF-VEN-02

**P3-S22** | 2:50 | 8s | 8s, 16:9, 1080p
- Prompt: LED screens on the outdoor beach stage show slow starry blue and teal floating particles; the curved neon-green and white LED bands glow behind the DJ booth, a small lit pyramid to one side, the white arched shell canopy overhead, crowd silhouetted in front.
- Camera: Wide, handheld from mid crowd, slight sway.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Pads swell. Crowd cheers at a color change.
- Reference slots: REF-VEN-01, REF-VEN-02, REF-VEN-04

**P3-S23** | 2:58 | 10s | 10s, 16:9, 1080p
- Prompt: GREG-BOOT at the edge of the sand, neon glow bracelet next to his orange festival wristband, looking up at the truss beam lights and neon-green LED bands with his mouth slightly open, the beams reflected in his mirrored sunglasses.
- Camera: Close-up, handheld, slow push-in.
- Graphics (add in edit): none
- Audio: NARRATOR: "Greg stood at the edge of the sand for twenty minutes. Witnesses describe him as stationary."
- Native audio cue: Arpeggio climbing. Bass muffled, as if heard from outside.
- Reference slots: REF-VEN-01

**P3-S24** | 3:08 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: a realistic woman in her 20s with an invented face, braids, a sequined bucket hat, glow paint on one cheek, seated on a lifeguard stand at night, laser light passing over her.
- Camera: Medium close-up, handheld, slight drift.
- Graphics (add in edit): Lower-third: "JADE / Raver"
- Audio: JADE: "There was a guy in a walking boot just looking at the speakers like they owed him money. I asked if he was okay. He said he was running the numbers."
- Native audio cue: Muffled set behind her.

**P3-S25** | 3:20 | 10s | 10s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: RYAN, glow stick tucked behind his ear, seated on an overturned crate beside the sand stage at night, laser light passing over him.
- Camera: Medium close-up, handheld, slight drift.
- Graphics (add in edit): Lower-third: "RYAN / Elliott's friend"
- Audio: RYAN: "Elliott texted me: my old forecaster is at your rave, be nice. I found him by the speakers doing long division."
- Native audio cue: Muffled set behind him.

**P3-S26** | 3:30 | 8s | 8s, 16:9, 1080p
- Prompt: RYAN walks up to GREG-BOOT at the edge of the sand, cracks a green glow stick and puts it in his hand, then gives him a cold unbranded energy drink can. GREG-BOOT turns the can to read the label.
- Camera: Medium, handheld, following RYAN in.
- Graphics (add in edit): none
- Audio: NARRATOR: "Ryan handed him a glow stick and an energy drink. Greg read the nutrition label."
- Native audio cue: Glow stick snap. Can hiss. Kick drum louder.

**P3-S27** | 3:38 | 8s | 8s, 16:9, 1080p
- Prompt: In the crowd beside the sand stage, OMAR in his "JESUS LOVES YOU" T-shirt plants himself in front of GREG-BOOT and gives him a private glove show: fingertip LEDs tracing loops and figure-eights inches from Greg's face, then a wide-armed pose, leaning back, eyes to the sky. The bold block letters on Omar's chest stay readable between the light trails. GREG-BOOT stares at the lights, mouth open, glow stick forgotten in his hand.
- Camera: Medium close-up, handheld, circling the two of them.
- Graphics (add in edit): none
- Audio: NARRATOR: "Then Omar found him. Omar gives everybody light shows."
- Native audio cue: Kick drum, crowd murmur, a soft whoosh as the gloves pass the camera.
- Reference slots: REF-VEN-04

**P3-S28** | 3:46 | 8s | 8s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: OMAR in his "JESUS LOVES YOU" T-shirt, crate set, LED gloves resting on his knees, still glowing.
- Camera: Medium close-up, handheld, slight drift.
- Graphics (add in edit): Lower-third: "OMAR / Elliott's friend, lights"
- Audio: OMAR: "I told him the lights are a gift. He didn't blink for four minutes. After, he asked what the gloves cost."
- Native audio cue: Muffled set behind him.

**P3-S29** | 3:54 | 9s | 9s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT, beach chair set.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: GREG: "Ticket, bracelet, ferry back. It came to less than one Ohtani at-bat. I did the math. Then I stopped doing the math."
- Native audio cue: Waves.


### XV. The build (4:03)

**P3-S30** | 4:03 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XV. THE BUILD"
- Audio: none
- Native audio cue: A rising synth, held.

**P3-S31** | 4:07 | 10s | 10s, 16:9, 1080p
- Prompt: The HEADLINER in the DJ booth, seen only from behind, a dark silhouette against LED screens of starry blue and teal particles, neon-green and white LED bands on the curved stage face, one hand raised over the mixer, the crowd a sea of raised arms under the white arched shell canopy.
- Camera: Wide, from behind the booth, handheld, slight sway.
- Graphics (add in edit): Lower note: "Headliner: fictional"
- Audio: NARRATOR: "The headliner played a set in the Miss Monique style. Twelve-minute builds. Very few words."
- Native audio cue: Long melodic techno build, filtered kick, choir-like pad.
- Reference slots: REF-VEN-01, REF-VEN-02, REF-VEN-04

**P3-S32** | 4:17 | 8s | 8s, 16:9, 1080p
- Prompt: Wide view from the shoreline: white and neon-green truss beams from the outdoor beach stage spreading flat across the dark water of Isthmus Cove, over the moored boats' anchor lights, the Isthmus pier lit, the green island hills a dark outline behind, haze drifting, magenta stage accents reflecting on the wet sand.
- Camera: Wide, tripod, slight wind shake.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Build continues. Water lapping. Crowd roar far off.
- Reference slots: REF-LOC-01, REF-LOC-02, REF-VEN-01, REF-VEN-03

**P3-S33** | 4:25 | 8s | 8s, 16:9, 1080p
- Prompt: Inside the crowd under the white arched shell canopy: dancers with glow sticks, phones and wristbands raised, haze, hazy white truss beams over raised hands in silhouette, a purple ceiling-style overhead wash from the rigs, sweat and sand, everyone facing the curved LED stage.
- Camera: Handheld, moving through the crowd at chest height.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Build, kick filtered out, crowd chanting a count.
- Reference slots: REF-VEN-01, REF-VEN-02, REF-VEN-04

**P3-S34** | 4:33 | 8s | 8s, 16:9, 1080p
- Prompt: A ring of ravers sits and kneels on the sand around OMAR in his "JESUS LOVES YOU" T-shirt as he spins light-up poi in full-arm circles, then sinks into a deep backbend, arms flung wide. The bold block letters on his chest stay readable as the poi leave long, smeared light trails in rings and spirals, like a long-exposure photo, haze glowing around them.
- Camera: Wide, tripod at sand level, slow shutter look, gentle push-in.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Build continues. Poi whir. The ring cheers on each pose.

**P3-S35** | 4:41 | 8s | 8s, 16:9, 1080p
- Prompt: RYAN grabs GREG-BOOT by the wrist and pulls him through the crowd toward the stage barrier, GREG-BOOT hopping on the good foot, the boot swinging, dancers stepping aside and cheering him on, hazy white truss beams and a purple overhead wash crossing above them.
- Camera: Handheld, backpedaling in front of them through the crowd.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Build, rising snare roll, crowd whoops as they pass.
- Reference slots: REF-VEN-01, REF-VEN-04

**P3-S36** | 4:49 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set, a phone in his hand.
- Camera: Close-up, slight drift.
- Graphics (add in edit): Lower-third: "ELLIOTT / Chief Financial Officer"
- Audio: ELLIOTT: "Carolina sent me a video at eleven at night. No caption. I watched it four times. I knew the shirt before I knew the face."
- Native audio cue: Room tone.

**P3-S37** | 5:01 | 9s | 9s, 16:9, 1080p
- Prompt: Shaky vertical phone video, pillarboxed: GREG-BOOT in the middle of the crowd in his dark pineapple Hawaiian shirt and navy shark-print board shorts, slowly starting to nod his head, orange festival wristband and glow bracelet raised.
- Camera: Handheld phone, zooming in and out.
- Graphics (add in edit): Overlay: "VIDEO SENT TO ELLIOTT, 11:02 PM"
- Audio: none
- Native audio cue: Phone-mic distortion, bass clipping.
- Reference slots: REF-VEN-04

**P3-S38** | 5:10 | 10s | 10s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT, beach chair set, eyes on the water.
- Camera: Close-up, slow push-in.
- Graphics (add in edit): none
- Audio: GREG: "The song kept building and building. I kept thinking, it's too long, it's too much. And then I thought, maybe I always say that."
- Native audio cue: Waves. A single sustained pad note.


### XVI. The drop (5:20)

**P3-S39** | 5:20 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XVI. THE DROP"
- Audio: none
- Native audio cue: Silence for one beat.

**P3-S40** | 5:24 | 6s | 6s, 16:9, 1080p
- Prompt: The LED screens and neon stage bands go black. Every truss beam cuts out. The crowd under the dark arched shell is lit only by phone lights and glowing wristbands in the haze.
- Camera: Wide, handheld, very still.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Two seconds of near silence. A held breath across the beach.
- Reference slots: REF-VEN-01, REF-VEN-02, REF-VEN-04

**P3-S41** | 5:30 | 8s | 8s, 16:9, 1080p
- Prompt: The drop hits: a full deep-red wash floods the outdoor beach stage and crowd, white and neon-green truss beams fan out over the sand and water, LED screens burst into dense teal particle storms, CO2 jets blast white plumes from the stage front, phones and wristbands in the air.
- Camera: Wide, handheld, the camera jolted by the bass.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Full drop. Deep kick and bass, crowd scream, CO2 jet blast.
- Reference slots: REF-VEN-01, REF-VEN-02, REF-VEN-04

**P3-S42** | 5:38 | 8s | 8s, 16:9, 1080p
- Prompt: At the front barrier, RYAN hoists GREG-BOOT onto his shoulders as the drop lands. GREG-BOOT rises above the crowd, both arms up, the black walking boot raised high in the air, glow stick in his fist, deep-red wash and neon-green LED bands behind him.
- Camera: Medium wide, handheld from the barrier, tilting up.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Full drop. Crowd roar rises around them.
- Reference slots: REF-VEN-01, REF-VEN-04

**P3-S43** | 5:46 | 8s | 8s, 16:9, 1080p
- Prompt: GREG-BOOT in the crowd, both arms up, dancing with his weight on the good foot, the boot planted like an anchor, a huge grin, deep-red wash and white truss beams crossing above him, phones and wristbands raised around him.
- Camera: Medium, handheld, circling him.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Drop continues at full volume.
- Reference slots: REF-VEN-01, REF-VEN-04

**P3-S44** | 5:54 | 8s | 8s, 16:9, 1080p
- Prompt: A few feet away in the crowd, CAROLYN and MARCEL spot GREG-BOOT dancing on one foot. They point, grab each other, then turn to him and cheer, arms pumping, MARCEL yelling and clapping over his head, CAROLYN jumping in place.
- Camera: Medium, handheld, swinging from the couple to GREG-BOOT and back.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Drop continues. Two voices whooping close to the mic.
- Reference slots: REF-VEN-04

**P3-S45** | 6:02 | 7s | 7s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLYN and MARCEL side by side on the crate set, laser light passing over them.
- Camera: Medium two-shot, handheld, slight drift.
- Graphics (add in edit): Lower-third: "CAROLYN & MARCEL / Ravers"
- Audio: MARCEL: "We didn't know him. We cheered anyway."; CAROLYN: "The boot had rhythm."
- Native audio cue: Muffled set behind them.

**P3-S46** | 6:09 | 10s | 10s, 16:9, 1080p
- Prompt: Drone shot at night pulling back and up from the beach: the outdoor stage's curved LED bands and white arched shell glowing red then green over the crowd, beams over Isthmus Cove, the Isthmus pier, the dark moored-boat field, the narrow neck of land behind the stage and the open Pacific beyond it.
- Camera: Drone, slow pull back and rise.
- Graphics (add in edit): none
- Audio: NARRATOR: "For eight minutes, the man who passed on seven hundred million dollars didn't pass on anything."
- Native audio cue: Drop rolls on, heard from above, wind on the drone.
- Reference slots: REF-LOC-01, REF-LOC-02, REF-VEN-01, REF-VEN-02, REF-VEN-04, REF-VEN-05

**P3-S47** | 6:19 | 10s | 10s, 16:9, 1080p
- Prompt: Drone shot at night flying slowly along the narrow isthmus from Isthmus Cove toward Catalina Harbor: the outdoor beach stage's neon-green and white beams and magenta accents fan out over both bays at once, skimming the water of Isthmus Cove on one side and the Little Harbor cove on the other, the dark green hills on either side, the open Pacific beyond.
- Camera: Drone, slow lateral track along the neck, steady altitude.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Drop continues, softer from altitude, wind on the drone.
- Reference slots: REF-LOC-01, REF-LOC-02, REF-VEN-01, REF-VEN-03, REF-VEN-05

**P3-S48** | 6:29 | 8s | 8s, 16:9, 1080p
- Prompt: Close-up of the walking boot on the sand, keeping time, tapping once per beat, glow-stick light flickering across it.
- Camera: Low close-up, handheld.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Kick drum, boot thump in sync.

**P3-S49** | 6:37 | 8s | 8s, 16:9, 1080p
- Prompt: Hazy white truss beams fan low over the crowd's raised hands and phones in silhouette under a purple overhead wash, confetti drifting through the light, neon-green LED bands on the curved stage face ahead, the Isthmus pier and moored boats lit beyond.
- Camera: Handheld from mid crowd, slow tilt up.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Drop continues, crowd singing a wordless melody.
- Reference slots: REF-LOC-02, REF-VEN-01, REF-VEN-04

**P3-S50** | 6:45 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: MARKUS, study set, reading glasses on, watching a tablet.
- Camera: Close-up, slight drift.
- Graphics (add in edit): Lower-third: "MARKUS SCHULTZ / Owner (fictional)"
- Audio: MARKUS: "I don't follow techno. I followed the boot. The boot never missed a beat. That's more than I can say for his forecasts."
- Native audio cue: Faint drop audio from the tablet.

**P3-S51** | 6:57 | 10s | 10s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: RYAN, crate set, grinning.
- Camera: Close-up, handheld.
- Graphics (add in edit): none
- Audio: RYAN: "I've had a lot of people on my shoulders. Nobody ever held up a medical boot before. The whole front row cheered for the boot."
- Native audio cue: Muffled set behind him.

**P3-S52** | 7:07 | 10s | 10s, 16:9, 1080p
- Prompt: FRED's desk terminal, screen glowing blue, a faint neon-green reflection drifting across it.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: FRED: "The drop arrived at minute twelve, as forecast. Greg did not ask me. I am choosing not to mention it."
- Native audio cue: Office hum, faint bass.
- Reference slots: REF-VEN-01


### XVII. After (7:17)

**P3-S53** | 7:17 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "XVII. AFTER"
- Audio: none
- Native audio cue: Last chord of the set, fading.

**P3-S54** | 7:21 | 10s | 10s, 16:9, 1080p
- Prompt: Haze drifting over an emptying beach on Isthmus Cove after the set, the outdoor stage's LED bands dimming, the white arched shell canopy going dark, a few dancers sitting on the sand, moored boats rocking, the dark green hills behind.
- Camera: Wide, tripod, slow pan.
- Graphics (add in edit): Lower note: "1:14 AM"
- Audio: NARRATOR: "After the set, Greg stayed on the sand until the crew turned off the lights."
- Native audio cue: Crowd dispersing, distant laughter, waves returning.
- Reference slots: REF-LOC-01, REF-LOC-02, REF-VEN-01, REF-VEN-02

**P3-S55** | 7:31 | 10s | 10s, 16:9, 1080p
- Prompt: GREG-BOOT and JADE sit on the sand sharing a bottle of water, he points at the truss rigs and LED bands being packed up and explains something with his hands.
- Camera: Medium wide, handheld, from behind and to the side.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Waves. Muffled talk. Truss clanking.
- Reference slots: REF-VEN-01

**P3-S56** | 7:41 | 9s | 9s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: JADE, lifeguard stand set, laughing.
- Camera: Close-up, handheld.
- Graphics (add in edit): none
- Audio: JADE: "He explained the cost of the lasers per minute. Then he said it was worth it. He seemed surprised he said it."
- Native audio cue: Waves.

**P3-S57** | 7:50 | 12s | 12s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: CAROLINA, CREATIVE STUDIO set, warm.
- Camera: Close-up, static.
- Graphics (add in edit): none
- Audio: CAROLINA: "As a brand story, it's redemption. Same shirt. New ending. The audience loves a man who finally waits for the drop."
- Native audio cue: Room tone.


### Epilogue (8:02)

**P3-S58** | 8:02 | 4s | Editor card, not generated
- Prompt: Black card. White text fades up.
- Camera: Static.
- Graphics (add in edit): Card: "EPILOGUE"
- Audio: none
- Native audio cue: Soft piano returns.

**P3-S59** | 8:06 | 10s | 10s, 16:9, 1080p
- Prompt: Dawn on the Isthmus Cove beach: the outdoor stage half dismantled, white shell canopy frame still up, gulls on the sand, GREG-BOOT asleep in a beach chair, orange festival wristband and faded glow bracelet on his wrist, the moored boats and the Isthmus pier in soft light, green hills behind.
- Camera: Wide, tripod, very slow push-in.
- Graphics (add in edit): none
- Audio: NARRATOR: "Greg nearly missed his ship. The ship waited. He did not ask how much that cost."
- Native audio cue: Gulls, waves, a shore boat horn at the pier.
- Reference slots: REF-LOC-01, REF-LOC-02

**P3-S60** | 8:16 | 14s | 14s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: ELLIOTT, OFFICE set, the warmest light.
- Camera: Close-up, slight drift.
- Graphics (add in edit): none
- Audio: ELLIOTT: "I fired Greg for stopping at the first number. Watching that video, he stayed for the whole song. I'm glad. I'd still like him to read page two."
- Native audio cue: Piano.

**P3-S61** | 8:30 | 13s | 13s, 16:9, 1080p
- Prompt: YouTube-style sit-down interview, lav mic visible, window or ring light, real room: GREG-BOOT, beach chair set, now at dawn, sunglasses down.
- Camera: Close-up, tripod.
- Graphics (add in edit): none
- Audio: GREG: "People ask if I regret the memo. I regret the dock. The memo, I've made my peace with. I'm having the time of my life. Write that down."
- Native audio cue: Waves. Piano.

**P3-S62** | 8:43 | 10s | 10s, 16:9, 1080p
- Prompt: GREG-BOOT walks carefully down the Isthmus pier toward the waiting shore boat back to Avalon, stepping around a wet patch, orange festival wristband on his right wrist, moored boats and green hills around him.
- Camera: Wide, from behind, handheld, slight sway.
- Graphics (add in edit): none
- Audio: none
- Native audio cue: Boot on wood. Gulls. One distant kick drum, then silence.
- Reference slots: REF-LOC-01, REF-LOC-02

**P3-S63** | 8:53 | 7s | 7s, 16:9, 1080p
- Prompt: The empty beach chair on the sand at dawn, a faded glow bracelet left on the armrest. Fade to black.
- Camera: Static, fade to black.
- Graphics (add in edit): End card: disclaimer (see assembly notes).
- Audio: none
- Native audio cue: Final piano chord rings out.

## Standalone: Omar light show

Three prompts Elliott can generate on their own, outside the film. Paste the global style line and the OMAR token text first. No reference photos of Omar.

**OMAR-LS-01: Glove show, close.** 10s, 16:9, 1080p. OMAR at night on a beach in a T-shirt that reads exactly "JESUS LOVES YOU" in bold block letters across the chest, haze behind him, faces the camera and runs an LED glove show: ten fingertip lights in tight loops, tracers and figure-eights, hands snapping from fast to slow. The shirt text stays readable. He ends wide-armed, leaning back, eyes to the sky. Camera: medium close-up, handheld, slow orbit. Audio: melodic techno, kick drum, crowd murmur.

**OMAR-LS-02: Poi ring, long exposure.** 10s, 16:9, 1080p. OMAR in a T-shirt that reads exactly "JESUS LOVES YOU" in bold block letters across the chest spins light-up poi at the center of a ring of seated and kneeling ravers on the sand. The poi draw long, smeared light trails in circles and spirals, like a long-exposure photo. The shirt text stays readable between spins. He sinks into a deep backbend, arms flung wide, then rises into a spin. Camera: wide, tripod at sand level, slow-shutter look, gentle push-in. Audio: poi whir, techno build, cheers on each pose.

**OMAR-LS-03: Silhouette against lasers.** 8s, 16:9, 1080p. OMAR on a low sand dune in his "JESUS LOVES YOU" T-shirt, backlit so the bold block letters read as a dark shape on his chest against green laser beams and haze, holds a dramatic pose with glowing gloves raised, then sweeps both arms down in one slow arc that leaves a light trail. Full commitment, joyful. Camera: low angle, wide, static. Audio: a held synth chord, then a kick drum lands.

## Assembly notes

1. Shot lengths add up to the runtime. Don't trim the music-only rave stretches; the payoff depends on them.
2. Pacing. Keep the first half quiet. The rave chapters (XIV to XVI) run louder and faster. After each burst, cut straight back to a plain interview.
3. The drop (P3-S40 to P3-S42). Hold the blackout a full two seconds before the drop hits.
4. Music. Use original or licensed melodic techno in a Miss Monique style. Don't use her tracks, name or likeness. The HEADLINER is never shown from the front.
5. Greg looks the same as in Parts 1 and 2. Generate one still each of GREG-BOOT, RYAN, OMAR, CAROLYN and MARCEL from the token text and reuse them. Never use a real photo of any of them.
6. Check every clip for real logos, ship names, readable signage or real faces, and regenerate any that has one.
7. Disclaimer card at the end: "Fictional parody. Greg (invented face, not based on any real person), Fred, Elliott as CFO, Carolina, Markus Schultz, Jade, Ryan, Omar, Carolyn and Marcel (invented looks, not their likenesses), the headliner and the Sand Stage event are invented. The real Dodgers ownership is not depicted. Miss Monique-style describes the music genre only. She does not appear and is not involved. Avalon and Two Harbors appear as locations."
