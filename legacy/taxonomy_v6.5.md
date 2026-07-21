# Canonical Taxonomy for Hypnosis Script Generation

**Scope:** This taxonomy covers **prose techniques only** — things the script writer can put into text that TTS will speak. Audio production (binaural, isochronic), visual elements (spirals, strobes), haptic feedback, and non-semantic vocalization (shushing, humming) are out of scope. Non-prose modality work (audio, visual, haptic) is out of scope here.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    WHEN LAYER (Phases)                       │
│  Phases: What the listener experiences at each stage        │
│  Sequence Rules: Valid phase orderings                       │
│  Structural Variants: Alternative script architectures      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    WHY LAYER (Functions)                     │
│  Function Categories: What purpose each technique serves    │
│  FRAM SYNC ATTN BYPS DEEP DISS COMP ENCD IMMR               │
│  COND TRIG PERS XFER SAFE EMRG                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    HOW LAYER (Techniques)                    │
│  Individual techniques within each function category        │
│  Style Modifiers: Tone and language patterns                 │
│  Craft Defaults: Sentence length, repetition, transitions   │
└─────────────────────────────────────────────────────────────┘
```

## ID & Naming Policy (v6.9 working)

Technique semantics and numbers are stable enough to support annotation, extraction, and generation work, but names and prefixes are not frozen when they obstruct readability or the ontology layer. v6.9 permits corrective prefix migrations with explicit justification.

**Rules:**
- **Avoid gratuitous renumbering.** Preserve numbers when the underlying technique is the same.
- **Allow justified renaming.** Prefixes and labels can change when the old name is misleading or cargo-culted.
- **Do not collapse meaning.** If two techniques overlap, document the relationship instead of pretending the overlap is not real.
- **Remove or deprecate deliberately.** If a technique is obsolete, either delete it during an ontology cleanup pass or mark it `[DEPRECATED]` with a replacement note.
- **Prefer append-only during annotation runs.** New techniques usually get the next available ID in their category, unless an active ontology pass justifies a gap or migration.
- **Category additions** are permitted (new categories get new prefixes).
- **Exceptions** require explicit justification documented in the commit message and a corresponding GitHub issue.

---

# PART 1: WHEN LAYER (Phases)

## 1.1 Phase Definitions

### Required Phases

| ID | Phase | Listener Task | Typical Duration |
|----|-------|---------------|------------------|
| P1 | Context + Safety | Accept frame, establish attention focus, receive protective boundaries | 30-90s |
| P2 | Induction | Release conscious control, enter trance | 60-90s |
| P3 | Deepening | Descend deeper through guided progression | 90-180s |
| P4 | Core Suggestion + Immersion | Accept and internalize primary suggestions, enter detailed visualization | 120-300s |
| P5 | Emergence | Return to normal consciousness | 30-90s |

### Optional Modules

| ID | Module | Listener Task | Insert Point | Duration |
|----|--------|---------------|--------------|----------|
| M1 | Mind Blanking | Release analytical thinking, accept receptive blank state | Between P3 and P4 | 60-120s |
| M2 | Transfer | Accept conditioned responses, receive real-world action commands | After P4, before P5 | 60-120s |
| M3 | Demonstration | Experience trigger activation, bliss states, or proof of hypnosis | After P4 or M2, before P5 | 60-180s |
| M4 | Maintenance/Loop | Sustain trance for loop restart | Terminal (replaces P5) | 60-90s |

**Note on Fractionation:** Wake/sleep cycling (DEEP-03) is a technique, not a phase. Use during P3 when depth amplification is needed.

**Total: 5 required phases + 4 optional modules**

---

## 1.2 Sequence Rules

### Required Ordering (Standard Scripts)

```
P1 → P2 → P3 → [M1] → P4 → [M2] → [M3] → P5
                                          ↓
                                     or [M4]
```

**Rules:**
1. P1 (Context + Safety) must be first (may skip for loops/series after episode 1)
2. P2 (Induction) must precede P3 (Deepening)
3. P3 (Deepening) must precede P4 (Core Suggestion + Immersion)
4. P4 must precede P5 (Emergence) or M4 (Loop)
5. P5 (Emergence) must be final, OR M4 (Maintenance/Loop) replaces P5 as terminal

### Module Insertion Matrix

| Module | Valid Insertion Points | Notes |
|--------|------------------------|-------|
| M1 Mind Blanking | Between P3 and P4 | Cognitive reduction before suggestions |
| M2 Transfer | After P4, before P5/M4 | Trigger installation + real-world bridging |
| M3 Demonstration | After P4 or M2, before P5/M4 | "Fun time" - trigger activation, bliss, proof |
| M4 Maintenance/Loop | Terminal (replaces P5) | Sustain trance, prepare loop restart |

**Note:** Fractionation (DEEP-03) is a technique used *within* P3, not a separate module.

---

## 1.3 Structural Variants

### Variant: standard
**Sequence:** P1 → P2 → P3 → P4 → P5
**Characteristics:** Full induction-deepening-suggestion-emergence arc
**Use Case:** Standalone sessions, first-time listeners

### Variant: deep
**Sequence:** P1 → P2 → P3 → M1 → P4 → P5
**Characteristics:**
- Includes Mind Blanking (M1) before suggestions
- Deeper cognitive reduction for complex programming
**Use Case:** Identity work, behavioral change, complex suggestions

### Variant: loop
**Sequence:** P2 → P3 → M2 → M3 → M4 (loops to P2)
**Characteristics:**
- Skips P1 (Context + Safety) - assumes opt-in
- Skips P5 (Emergence) - replaced by M4 (Maintenance)
- Uses instant/conditioned induction (ATTN-04)
- Terminal state mirrors opening for seamless loop
**Use Case:** Background/ambient trance, extended sessions

### Variant: twostage
**Sequence:** P1 → P2 → P3 + light suggestions → P3 [DEEP-03] → M1 → P4 → P5
**Characteristics:**
- Light suggestions during initial deepening
- P3 with fractionation (DEEP-03) creates stage boundary
- Mind Blanking (M1) after fractionation
- Deep suggestions after blank state achieved
**Use Case:** Complex programming, multi-layered suggestions

### Variant: series
**Sequence:** P2 (instant via ATTN-04) → P3 → P4 → P5
**Characteristics:**
- References prior conditioning from previous episodes
- Trigger reinforcement rather than installation
- Can skip Context + Safety after episode 1
- Assumes listener has series exposure
**Use Case:** Multi-part series, progressive training

---

## 1.4 Required Phase Detail (P1–P5)

### P1: Context + Safety
- **Function:** Establish participation frame; set anchors; start authority/rapport; boundary normal→hypnotic; protective boundaries.
- **Entry:** Session start. **Exit:** Oriented, focused attention, boundaries affirmed. **Success:** Breathing settled, focus established, trust increased.
- **Use when:** First-time listeners; therapeutic/relaxation; any time safety/trust needs priming.
- **Skip/Compress when:** Looping/series after episode 1; ultra-short runtime; pre-conditioned audience.

### P2: Induction
- **Function:** Transition consciousness; narrow attention; reduce movement; establish cooperation.
- **Entry:** Context set. **Exit:** Initial trance, eyes closed. **Success:** Relaxation response, absorption.
- **Use when:** Standard/first sessions; whenever no instant trigger is assumed.
- **Skip/Compress when:** Using instant/conditioned induction (ATTN-04) in looping/series; time budget <4 min.

- **Note:** Re-induction (same-session) is just P2 again using ATTN-04 or TRIG-02.

### P3: Deepening
- **Function:** Increase depth; create progression; set depth markers; install first deepening triggers.
- **Entry:** Initial trance. **Exit:** Deeper trance, reduced critical faculty. **Success:** Countdown accepted; markers in place.
- **Use when:** Any script requiring depth before suggestions.
- **Skip/Compress when:** Looping variant with short runtime; ultra-short scripts.

- **Note:** Fractionation (DEEP-03) is used here when depth amplification via wake/sleep cycling is needed.

### P4: Core Suggestion + Immersion
- **Function:** Install primary suggestions; convert state → identity/behavior; reward linkage; persistence; experiential visualization; sensory layering.
- **Entry:** Depth achieved (or M1 Mind Blanking completed). **Exit:** Core suggestions accepted, immersed in scene. **Success:** Identity/behavior shifts acknowledged, sensory buy-in.
- **Use when:** Any goal beyond relaxation; triggers/behavior/identity changes; transformation/narrative themes.
- **Skip/Compress when:** None for functional hypnosis; only reduce density if runtime is under ~5 min.

### P5: Emergence
- **Function:** Safe return; maintain installs; re-energize; close frame.
- **Entry:** Suggestions installed. **Exit:** Normal consciousness. **Success:** Alert, oriented, positive affect.
- **Use when:** All non-looping scripts; anytime duty-of-care applies.
- **Skip/Compress when:** Looping variant with M4; live sessions transitioning to another induction immediately.

- **CRITICAL:** Use EMRG category for emergence. Do NOT use DEEP-03 here.

---

## 1.5 Optional Module Detail (M1–M4)

### M1: Mind Blanking (60–120s)
- **Function:** Suspend analytical thinking; create blank state; voice replaces thoughts.
- **Entry:** After P3 (Deepening). **Exit:** Critical faculty suspended. **Success:** Thought cessation accepted.
- **Use when:** Installing identity/behavioral change; authoritarian/challenge styles; complex triggers; deep programming.
- **Skip when:** Light relaxation/wellness; short scripts where P3 carries light thought-quieting.

### M2: Transfer (60–120s)
- **Function:** Install conditioned responses; real-world commands; post-hypnotic actions; generalization to waking life.
- **Entry:** After P4 (Core Suggestion). **Exit:** Triggers encoded, actions accepted. **Success:** Associations formed, bridge to real-world established.
- **Use when:** Series/looping; behavioral bridges; future sessions; habit installation.
- **Skip when:** Single-use relaxation; no post-hypnotic need; no external ask.

### M3: Demonstration (60–180s)
- **Function:** Activate installed triggers; sustain bliss states; provide subjective proof of hypnosis. The "fun time" module.
- **Entry:** After P4 or M2. **Exit:** Proof/pleasure experienced. **Success:** Listener perceives phenomenon; desire to stay/return.
- **Use when:** Challenge style; reward loops; pleasure themes; low-belief listeners needing proof.
- **Skip when:** Risk of failure (asynchronous); wellness contexts where tests feel invasive.

### M4: Maintenance/Loop (60–90s)
- **Function:** Sustain trance indefinitely; prepare loop restart; no emergence.
- **Entry:** After P4 or M2/M3 (loop terminal). **Exit:** Stable loop state. **Success:** State mirrors opening; listener can continue.
- **Use when:** Looping/ambient content; background playback.
- **Skip when:** Any script requiring wake/aftercare.

- **Note:** M4 replaces P5 (Emergence) as the terminal state.

---

# PART 2: WHY LAYER (Functions) / HOW LAYER (Techniques)

## 2.1 Function Category Overview

| Category | Name | Purpose | Primary Phases |
|----------|------|---------|----------------|
| FRAM | Framing & Expectancy | Shape beliefs about what will happen; establish session frame and authority | P1, P4 |
| SYNC | Pacing & Rapport | Build attunement and synchronize with listener; lay rapport foundation | P1, P2 |
| ATTN | Attention Capture & Absorption | Narrow and stabilize attention; absorb listener into trance state | P2, P3, M1 |
| BYPS | Cognitive Bypass | Interrupt habitual thought patterns; dissolve critical faculty | P3, M1 |
| DEEP | State Deepening | Intensify trance depth through descent metaphors and deepening techniques | P3 |
| DISS | Dissociation & Altered States | Alter perception of self, body, or time; create experiential distance or amplification | P4, M1 |
| COMP | Compliance Building | Create easy pathway for responding; build yes-momentum and demonstrated compliance | P3, P4, M3 |
| ENCD | Encoding & Suggestion | Strengthen suggestion retention through structured repetition and encoding | P4 |
| IMMR | Immersion & Visualization | Build and sustain experiential reality through detailed visualization | P4 |
| COND | Conditioning & Reward | Wire compliance and surrender to felt pleasure and reward | P4, M3 |
| TRIG | Trigger Management | Install and activate conditioned stimulus-response pairs | M2, M3 |
| PERS | Persistence & Identity | Extend identity and installed states across time and real-world contexts | P4, M2 |
| XFER | Transfer & Generalization | Bridge trance suggestions into waking life | M2, P4 |
| SAFE | Safety & Grounding | Protective framing, consent, and grounding throughout session | P1, P5, cross-cutting |
| EMRG | Emergence & Integration | Guide safe return to waking consciousness; integrate and close | P5 |

---

## 2.2 Technique Listings

### Category FRAM: Framing & Expectancy
*Purpose: Shape beliefs about what will happen; establish session frame and authority (P1, P4)*

*[Examples →](examples/examples_fram.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| FRAM-01 | Expectation Seeding | Explicitly previewing session structure/agenda before induction |
| FRAM-02 | Authority Claims | External guidance overrides internal resistance |
| FRAM-03 | Retrospective Justification | "This is what you wanted" |
| FRAM-04 | Nested Authority Figure | Imagined trusted person as proxy |
| FRAM-05 | Philosophical Conditioning | Obedience = freedom reframe |

##### FRAM-01 — Expectation Seeding
> Explicitly previews the session's structure and what the subject will experience, reducing uncertainty and cognitive load so the subject can settle into each phase without needing to track or anticipate. The preview primes the subject's expectations in favorable directions and increases compliance by removing the unknown. Use before the formal induction or woven into the opening context-setting.

##### FRAM-02 — Authority Claims
> Asserts the operator's present-tense authority by positioning their voice as the primary and sufficient guide, displacing competing internal voices or doubts. No backstory or philosophical argument is required — the assertion is made and accepted through tone and framing. Warm-authoritative delivery is more effective than aggressive dominance, which tends to generate resistance.
> *Use when asserting present-tense authority — who holds power right now. No backstory or philosophy required. Use FRAM-03 when invoking the listener's past desires to frame surrender as self-fulfillment; use FRAM-05 when redefining the abstract concepts of freedom or obedience.*

##### FRAM-03 — Retrospective Justification
> Reframes the subject's current state of surrender as the fulfillment of something they already wanted, rather than something being done to them. This shifts the felt locus of causation inward — the subject is not being acted upon but arriving at their own desire. Use with subjects whose enjoyment depends on feeling that the response is authentically theirs.
> *Use when generating retrospective narrative consent — "this is what you always wanted" reframes current surrender as fulfillment of the listener's pre-existing desire. Use FRAM-02 when asserting current authority without reference to history; use FRAM-05 when the goal is philosophical redefinition.*

##### FRAM-04 — Nested Authority Figure
> Places the operator within a larger hierarchy of authority, positioning them as the voice or agent of a greater, benevolent power. The effect is to deepen the felt weight of instruction by suggesting it flows from something larger than the operator alone. The imagined higher authority must be portrayed as deeply trustworthy and aligned with the subject's well-being — not threatening or arbitrary.

##### FRAM-05 — Philosophical Conditioning
> Reframes the abstract concepts of freedom, control, or obedience at the conceptual level, arguing that surrender is the truest form of freedom and that yielding agency removes burden rather than capacity. Requires sustained, carefully reasoned language — this is not a slogan but a philosophical argument that the listener accepts through the trance state's reduced critical resistance.
> *Use when redefining the abstract concepts of freedom, control, or obedience themselves — operates at the philosophical level, not the personal or immediate. Use FRAM-02 when asserting present-tense authority; use FRAM-03 when invoking the listener's personal history. Distinct from COND-03 (felt experiential relief) — FRAM-05 argues the concept, COND-03 delivers the sensation.*

---

### Category SYNC: Pacing & Rapport
*Purpose: Build attunement and synchronize with listener; lay rapport foundation (P1, P2)*

*[Examples →](examples/examples_sync.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| SYNC-01 | Breath Pacing | Guide breathing rhythm for focus/relaxation |
| SYNC-02 | Progressive Relaxation | Systematically relax body parts |
| SYNC-03 | Pacing-Leading | Describe present experience, then guide change |
| SYNC-04 | Micro-Ratification | "You may notice..." small, non-demanding confirmations |

##### SYNC-01 — Breath Pacing
> 4-hold-6 pattern: inhale count UP (1,2,3,4), hold with NO counting (just [1.5s] pause), exhale count DOWN (6,5,4,3,2,1). Countdown signals completion. After 2-3 guided cycles, simplify: 'in 1 2 3 4 out 6 5 4 3 2 1'. Use [Xms] pause markers for precise timing.

##### SYNC-02 — Progressive Relaxation
> Move smoothly through body parts like a warm wave. Don't rush but don't linger. Imagery of joints loosening and limbs going heavy works well to make the progression feel embodied rather than mechanical.

##### SYNC-03 — Pacing-Leading
> Acknowledges the subject's current felt experience accurately before guiding them toward the next state, using the pacing as a bridge. The subject's experience validates the operator's awareness ("you're already feeling..."), which builds trust and makes the following suggestion feel natural. Pacing that mismatches the subject's actual state (claiming relaxation they don't feel yet) breaks rapport instead of building it.

##### SYNC-04 — Micro-Ratification
> Offers small, non-demanding confirmations of the subject's experience using "you may notice..." or "perhaps..." language that suggests rather than asserts. Micro-ratifications deepen the state by naming what is likely already happening, making the subject more aware of effects already occurring. The permissive framing ("you might even notice") prevents the subject from feeling they have failed if the described sensation isn't present.

---
### Category ATTN: Attention Capture & Absorption
*Purpose: Narrow and stabilize attention; absorb listener into trance state (P2, P3, M1)*

*[Examples →](examples/examples_attn.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| ATTN-01 | Fixation | Narrow attention to single point (visual/auditory) |
| ATTN-02 | Eye Closure | Direct or indirect eye closure suggestion |
| ATTN-03 | Countdown | Numerical descent into trance |
| ATTN-04 | Instant/Conditioned Drop | Drop command assuming prior conditioning |
| ATTN-05 | Kinesthetic Entrainment | Body swaying synchronized with stimulus |
| ATTN-06 | Environmental Dissociation | Fade external world/room/sounds |
| ATTN-07 | Cognitive Quieting | "No need to think" / "thoughts drift away" directives |
| ATTN-08 | Mental Spaciousness | "Blank mind" / "empty" suggestions |
| ATTN-09 | Metaphoric Shutdown | "Conscious mind takes a nap" |
| ATTN-10 | Voice Absorption | Voice becomes thoughts; guidance replaces internal dialogue |
| ATTN-11 | Mantra Repetition | Repeated phrases for absorption and encoding |

##### ATTN-01 — Fixation
> For audio, fixation is usually on the voice itself. Make it feel natural, not demanding. The voice becomes the only thing that matters.

##### ATTN-02 — Eye Closure
> Eye closure marks the shift from external to internal focus, establishing the boundary between ordinary awareness and the hypnotic space. Use early in induction to anchor the transition; it also signals the subject's willingness to follow direction. Permissive framing ("allow your eyes to close") tends to be more effective than commands.

##### ATTN-03 — Countdown
> Each number should carry the listener deeper. Add brief suggestions between numbers. Terminal command at the end should feel inevitable.

##### ATTN-04 — Instant/Conditioned Drop
> Fires a previously installed anchor to collapse the subject into trance from a waking or near-waking state. The effect depends entirely on prior conditioning — the response is automatic, not built in the moment. Delivery must be confident and unhesitating; any uncertainty in the operator's voice will undercut the conditioned response.
> *Requires prior conditioning — fires an already-installed anchor to collapse the subject into trance from a waking or near-waking state. This is an induction technique, not a deepening tool. If the subject is already deep and the command deepens them further, that is DEEP-01.*

##### ATTN-05 — Kinesthetic Entrainment
> Synchronizes subtle body movement with the operator's voice or a rhythmic stimulus, using physical rhythm as an induction pathway. The movement should be minimal and naturally arising — the goal is a felt sense of automatic response, not deliberate swaying. Works well when the subject has residual physical tension that needs an outlet.

##### ATTN-06 — Environmental Dissociation
> Narrows awareness by guiding the subject to let the external world recede, leaving only the operator's voice as the relevant input. Useful when the subject is in a noisy or distracting environment, or when other induction approaches have left peripheral awareness still active. Frame the fade as effortless and natural rather than something the subject must work to achieve.

##### ATTN-07 — Cognitive Quieting
> Thoughts stopping should feel like relief, not erasure. Use imagery of clouds drifting, water settling. Permission language works better than commands.
> *Use when the listener's thoughts are still present and need to be released — the motion of departing is the payload (clouds drifting, dust settling). Use ATTN-08 when the destination state (blank, spacious, already quiet) is the payload; use ATTN-09 when the analytical mind needs a narrative reason to step aside.*

##### ATTN-08 — Mental Spaciousness
> Empty/blank should feel peaceful, not alarming. Emphasize the quality of the empty state itself — vast, open, calm — rather than the absence of thoughts. Use imagery that conveys positive spaciousness: clear sky, still water, fresh snow.
> *Use when the goal is to describe or anchor the already-arrived empty state — the mind is blank now, and that blankness is being named and deepened. Use ATTN-07 when thoughts are still in motion and being directed to quiet; use ATTN-09 when personifying the analytical mind as a character who chooses to rest.*

##### ATTN-09 — Metaphoric Shutdown
> Personifies the analytical mind as a character with its own needs, giving it a narrative reason to step aside rather than simply commanding it to stop. Framing the shutdown as earned rest makes the transition feel internally motivated rather than imposed. Especially effective for subjects with active critical faculties who resist more direct quieting approaches.
> *Use when the listener's analytical/critical faculty needs a story that makes withdrawal feel deserved — the "thinking mind" is personified as a character who earns a nap. Use ATTN-07 when directing the process of thoughts departing; use ATTN-08 when describing the empty state as already present.*

##### ATTN-10 — Voice Absorption
> Replaces the subject's internal dialogue with the operator's voice, causing further descent as the subject stops generating their own thoughts. The mechanism is absorption, not suppression — the operator's voice fills the space rather than forcing thoughts out. Works best after basic quieting has already reduced mental chatter.
> *Deepening mechanism (P3): the operator's voice replacing the subject's internal dialogue causes further descent. Distinct from BYPS-06 (M1 — the subject hands over thinking rather than experiencing the voice as their own thoughts). Distinct from ENCD-06 (planting specific first-person assertions the subject thinks as their own — the subject is still thinking, the content is pre-installed).*

##### ATTN-11 — Mantra Repetition
> Mantras should feel true and natural. Repeat enough to encode but not so much it becomes noise. Build pleasure association. Distinct from Call-and-Response (COMP-01): mantras are self-directed absorption and identity encoding (the subject speaks to themselves); call-and-response is operator-directed compliance (the subject responds to the operator). Different mechanisms, different uses.
> *Use when encoding a single short phrase (3-6 words) through 4-6 verbatim repetitions with brief bracketing commentary between each. Anchor-phrase test: if any sentence repeats unchanged, consider ATTN-11. Use ENCD-01 when expressing the same idea through multiple differently-worded sentences; use ENCD-03 when the unit to be drilled is a multi-sentence block repeated verbatim. For operator-directed response loops, use COMP-01.*
> *Satiation warning: at high rep counts (7-10+), semantic satiation sets in — Broca's produces the phonemes but Wernicke's stops extracting meaning. The words become pure sound. This is usually a failure mode (the suggestion stops landing), not a goal. It can be used deliberately to dissolve meaning before replacing a phrase with something new, but defaulting to high rep counts "for depth" just makes the mantra stop working. Prefer 4-6 reps with evolving context over 10 reps of diminishing returns. The writer controls rep count; choose it based on what the prose needs, not a minimum threshold.*

---
### Category BYPS: Cognitive Bypass
*Purpose: Interrupt habitual thought patterns; dissolve critical faculty (P3, M1)*

*[Examples →](examples/examples_byps.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| BYPS-01 | Pattern Interrupt | Unexpected element disrupting conscious processing |
| BYPS-02 | Yes Set / Compliance Ladder | Rapid yes-responses building momentum |
| BYPS-03 | Confusion Technique | Disorientation interjections |
| BYPS-04 | Resistance Paradox | Resistance = deeper trance |
| BYPS-05 | Circular Logic | Self-referential bypass statements |
| BYPS-06 | Control Transfer | Thinking delegated to external authority |
| BYPS-07 | Perspective Shift | "You" to "I" transition |
| BYPS-08 | Transparent Narration | Describing the technique as it executes, making understanding the bypass |
| BYPS-09 | Semantic Reversal | Reversing established directional cues to override internal tracking |
| BYPS-10 | Phonemic Attention Split | Dividing attention between phonological surface and semantic content as hard overload |

##### BYPS-01 — Pattern Interrupt
> Inserts a brief, unexpected element into the induction flow to disrupt the analytical mind's habitual processing. The gap created by the interruption is where suggestion slips through before the critical faculty re-engages. Requires smooth, immediate follow-through — the deepening command must land while the subject is still disoriented.

##### BYPS-02 — Yes Set / Compliance Ladder
> Builds a momentum of agreement by starting with undeniable, observable truths and gradually escalating toward suggestive statements. Each "yes" lowers resistance to the next one, leveraging the consistency principle — the subject's tendency to maintain agreement once established. Escalation must be gradual; large jumps break the pattern and invite critical re-evaluation.

##### BYPS-03 — Confusion Technique
> Disrupts analytical processing through paradox, contradiction, or self-referential language that the logical mind cannot resolve. The resulting momentary confusion suspends critical evaluation and opens a window for suggestion. The confusion itself should feel interesting or pleasurable, not distressing — framing it as a delicious paradox rather than a puzzle to solve.

##### BYPS-04 — Resistance Paradox
> Reframes internal resistance as another vector for deepening rather than an obstacle to it. Because resistance is acknowledged and folded into the process, the subject cannot use it to interrupt the session — any push against the suggestions becomes part of going deeper. Works best when delivered calmly and without urgency, so the reframe feels inevitable rather than argued.

##### BYPS-05 — Circular Logic
> Creates a self-reinforcing loop in which each element of the suggestion validates the next, making the overall effect feel inevitable. Because the logic folds back on itself, the analytical mind finds no external ground on which to object — it can only continue circling. The loop should feel pleasurable to inhabit, not logically trapped.

##### BYPS-06 — Control Transfer
> Explicitly transfers cognitive agency to the operator, framing the handover as relief rather than loss. Use in M1 when the session goal is deep passive compliance; works best after basic absorption has reduced analytical resistance. The subject is not suppressing thoughts — they are delegating the function of thinking entirely, leaving mental effort behind.
> *Use when delegating the specific cognitive function of thinking — the listener is relieved of mental labor because the hypnotist performs it. Phase: M1. Distinct from ATTN-10 (P3 deepening via voice-as-thoughts — the operator's voice becomes the subject's inner experience). Distinct from PERS-08 (framing ownership of the listener as identity). These coexist but do not imply each other.*

##### BYPS-07 — Perspective Shift
> Gradually transitions the subject's grammatical self-reference from "you" to "I," shifting internal perspective so the operator's framing is experienced as the subject's own inner voice. The shift should be incremental and seamless — a sudden jump is jarring. Most effective in M1 after the analytical mind has already quieted.

##### BYPS-08 — Transparent Narration
> Explicitly describes what the technique is doing to the subject as it executes, creating a paradox where understanding the mechanism doesn't help the subject resist it — because the understanding itself is the vehicle of delivery. The narration builds rapport through apparent honesty ("I'm telling you exactly what I'm doing") while simultaneously installing the suggestion through expectation fulfillment. Differs from COMP-11 (Named Technique Meta) in that COMP-11 names the technique as an authority flex; BYPS-08 narrates the mechanism as the primary bypass — the explanation IS the suggestion. Also functions as inadvertent FRAM-01 (Expectation Seeding): describing what will happen primes the subject to experience exactly that.
> *Use when the narration of what is happening IS the mechanism of delivery — the subject's comprehension becomes the pathway for the suggestion rather than a defense against it. Distinct from COMP-11 (naming the technique as an authority signal — the naming is decoration, not mechanism). Distinct from FRAM-01 (previewing session structure to reduce uncertainty — FRAM-01 is informational, BYPS-08 is paradoxical). The bypass works because resisting requires not understanding, but the subject is already understanding, and understanding is accepting.*

##### BYPS-09 — Semantic Reversal
> Reverses the established meaning of a directional cue — counting up after establishing counting down as deepening, or switching which direction means "deeper" — forcing the subject to abandon internal position tracking and rely entirely on the operator's framing for meaning. The reversal is a pattern interrupt at the semantic level: the subject's predictive model of "where I am in the sequence" breaks, and in the gap, the voice's authority becomes the only reference point. Most effective after at least one full conventional sequence has established the original direction.
> *Use when an established directional pattern (countdown = deeper, count-up = waking) needs to be broken to eliminate the subject's internal sense of sequence position. Requires prior establishment of the conventional direction — the reversal has no effect without an expectation to violate. Distinct from BYPS-01 (Pattern Interrupt — unexpected sensory element) and BYPS-03 (Confusion Technique — paradoxical language). BYPS-09 specifically targets the meaning of sequential/directional cues, not general confusion or sensory surprise.*

##### BYPS-10 — Phonemic Attention Split
> Divides the subject's attention between the phonological surface of speech (consonants, vowels, breath sounds, lip movements) and its semantic content simultaneously, creating genuine Miller's Law overload (7+/-2 working memory chunks). The subject must process sound-level features AND meaning at the same time, which exceeds working memory capacity and produces a critical faculty lapse. Unlike BYPS-03 (paradoxical language), this technique uses dual-task overload on a single auditory signal — the confusion arises from competing processing demands, not from contradictory content.
> *Use when the operator's own speech is the overload vehicle — the subject listens for surface-level phonological features while simultaneously extracting meaning, and the dual demand exceeds processing capacity. Distinct from BYPS-03 (Confusion Technique — paradoxical content that can't be resolved logically) and BYPS-06 (Control Transfer — delegation to external authority). The phonemic split works because the tasks are genuinely concurrent and both feel mandatory.*

---

### Category DEEP: State Deepening
*Purpose: Intensify trance depth through descent metaphors and deepening techniques (P3)*

*[Examples →](examples/examples_deep.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| DEEP-01 | Drop Command | Verbal trigger for depth increase |
| DEEP-02 | Staircase Visualization | Descending imagery for deepening |
| DEEP-03 | Fractionation | Wake/sleep cycling for depth amplification. Use during P3. |
| DEEP-04 | Numerical Deepening | Depth tied to countdown numbers |
| DEEP-05 | Proximity Deepening | Stimulus distance correlates with depth |
| DEEP-06 | False Bottom | Reframe achieved depth as shallow |
| DEEP-07 | Endurance Compliance | Extended pose holds with counting |
| DEEP-08 | Void/Floating Imagery | Floor dissolves / suspension in void |

##### DEEP-01 — Drop Command
> The drop word should feel like release, not force. Can claim 'twice as deep' or 'ten times deeper' - the specifics don't matter, the permission to go deeper does.
> *Used during the deepening phase on a subject already in trance. Prior conditioning is not required — the drop response can be established spontaneously within the session. Does not function as induction — the subject must already be under. See ATTN-04 for conditioned drops from a waking state.*

##### DEEP-02 — Staircase Visualization
> The descent metaphor should feel safe and inviting. Each step takes them deeper. Can be stairs, elevator, diving into warm water - whatever fits the theme.

##### DEEP-03 — Fractionation
> Amplifies trance depth by cycling the subject between light waking and trance states. Each return to trance lands deeper than the previous entry because the contrast with the waking state heightens the felt sense of descent. The "up" phase should be brief — long enough to register the shift, not long enough for the analytical mind to fully re-engage.

##### DEEP-04 — Numerical Deepening
> Similar to countdown but focused on depth claims. Exponential progression ('twice as deep') compounds the effect.

##### DEEP-05 — Proximity Deepening
> Correlates perceived nearness of a stimulus (voice, sound, imagined presence) with trance depth — as it approaches, the subject descends further. Exploits the orienting reflex: the mind focuses sharply on something moving closer, narrowing attention in a way that accelerates absorption.

##### DEEP-06 — False Bottom
> Reframes the subject's current depth as a starting point rather than a destination, removing the perceived ceiling and opening the way to further descent. Effective when a subject has plateaued — the reframe breaks the assumption that they have "arrived" and creates renewed momentum. Use affirming language: the achieved depth is real and good, but it is only the entry to something deeper.

##### DEEP-07 — Endurance Compliance
> Uses a sustained physical hold — a lifted hand, parted lips, tilted chin — as a focus point that concentrates attention and builds compliance momentum. The mild physical effort creates a narrow channel of awareness that deepens absorption. Frame the holding as effortless rather than challenging; the count should signal progress toward release, not endurance of strain.

##### DEEP-08 — Void/Floating Imagery
> Removes the subject's felt sense of a physical environment, replacing it with boundless, featureless space. The absence of sensory anchors eliminates reference points that keep the analytical mind oriented, accelerating dissociation and depth. Emphasize comfort and warmth — void imagery can become anxiety-inducing if it feels like falling rather than drifting.

---
### Category DISS: Dissociation & Altered States
*Purpose: Alter perception of self, body, or time; create experiential distance or amplification (P4, M1)*

*[Examples →](examples/examples_diss.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| DISS-01 | Consciousness Splitting | Awareness/control dissociation |
| DISS-02 | Amnesia Suggestion | Forget performing specific actions |
| DISS-03 | Time Distortion | Altered perception of time passing |
| DISS-04 | Screen Memory | Constructed replacement memory covering the real one |

##### DISS-01 — Consciousness Splitting
> Partitions awareness so that one part of the subject observes or drifts while another part remains available to receive and act on commands. Creates the subjective experience of the body responding automatically while the observing mind watches from a comfortable distance. Useful when the goal is automatic response without the friction of conscious deliberation.

##### DISS-02 — Amnesia Suggestion
> Installs forgetting of a specific instruction as an end in itself, so the subject experiences the resulting state or behavior without access to the command that created it. The response feels self-generated rather than instructed. Avoid installing amnesia for the entire session — loss of recall of the full experience undermines the subject's ability to evaluate consent retrospectively.
> *Installs forgetting as an end in itself — the subject simply loses the memory. If amnesia is being used as a depth check where the subject consciously notices the gap as proof of depth, use COMP-05. If amnesia wraps a forward-scheduled command to make it feel self-generated post-session, use TRIG-10.*

##### DISS-03 — Time Distortion
> Alters the subject's subjective experience of time passing — stretching pleasurable states so they feel longer, or compressing transitional periods. Use when the session goal benefits from pleasure feeling extended or when real-world time constraints would otherwise intrude on immersion.
> *Installs altered time perception for immersion. If time distortion is deployed so the subject consciously notices it as proof of depth, use COMP-05.*

##### DISS-04 — Screen Memory
> Constructs a plausible replacement memory that occupies the slot where the real memory would be, so the subject doesn't notice anything is missing. Unlike DISS-02 (which leaves a gap), screen memory fills the gap with a benign or pleasant alternative. The subject's recollection feels complete and coherent — there is no felt absence to investigate. The replacement memory must be emotionally congruent with the surrounding context so it doesn't create a seam the analytical mind can detect.
> *Use when the goal is not just forgetting but active replacement — the subject remembers something different from what actually happened. Distinct from DISS-02 (amnesia — leaves a gap, the subject may notice the absence). Distinct from TRIG-10 (amnesia-wrapped command — the subject forgets the instruction but no replacement is provided). Screen memory is the most complete form of memory modification: gap + fill. The term originates from Freud's concept of Deckerinnerung — a less significant memory that screens a more significant one from conscious access.*

---

### Category COMP: Compliance Building
*Purpose: Create easy pathway for responding; build yes-momentum and demonstrated compliance (P3, P4, M3)*

*[Examples →](examples/examples_comp.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| COMP-01 | Call-and-Response | "Repeat after me" instructions |
| COMP-02 | Identity Labeling | "Good subject," "obedient" |
| COMP-03 | Ideomotor Response | Finger lift, hand drift, yes/no signaling |
| COMP-04 | Command-Response Training | Immediate compliance demos |
| COMP-05 | Cognitive Convincers | Amnesia, time distortion tests |
| COMP-06 | Motor Inhibition | Heaviness, rigidity, "can't move" tests |
| COMP-07 | Behavioral Commitment | Physical actions as proof |
| COMP-08 | Physical Exhibition | Pose/display instructions |
| COMP-09 | Self-Validating Language | "Notice how true this feels" |
| COMP-10 | Mirror Self-Observation | Visualizing transformed self |
| COMP-11 | Named Technique Meta | Explicitly naming the technique being used |

##### COMP-01 — Call-and-Response
> Internal repetition works best for audio. Frame it as the listener saying truth to themselves, not performing for the hypnotist. Distinct from Mantra Repetition (ATTN-11): call-and-response is operator-directed (the subject responds to the operator's lead), building compliance momentum through demonstrated responsiveness. Mantras are self-directed absorption.

##### COMP-02 — Identity Labeling
> Attaches affirming labels to the subject's compliant behavior, reinforcing the identity the session is building. The label should connect to what the subject just did or felt, not be generic praise — "so perfectly still" after stillness is more effective than "good job." Pair with a moment of recognized compliance for maximum anchoring.

##### COMP-03 — Ideomotor Response
> Elicits subtle, automatic body movements — a finger lift, hand drift, finger signals — as evidence of subconscious responsiveness rather than conscious choice. Because the movement arises without the subject deciding to move, it functions as proof of depth that bypasses rational self-doubt. Language should suggest the movement is already happening, not instruct the subject to produce it.

##### COMP-04 — Command-Response Training
> Fires a command specifically as a depth demonstration — the payoff is the subject's recognition of their own automatic response. The validation beat distinguishes this from TRIG-02, where the trigger is fired for its effect alone. The recognition must be named and held up as evidence; an unfollowed response without commentary produces no convincing effect.
> *Fires a command specifically as a depth demonstration — the payoff is the subject's recognition of their own automatic response. If a command is fired for its effect alone with no validation beat, use TRIG-02. If the trigger is fired repeatedly with reward to reinforce conditioning, use TRIG-04.*

##### COMP-05 — Cognitive Convincers
> Uses cognitive effects — amnesia, time distortion, altered perception — as demonstration devices, where the payoff is the subject's own recognition that the effect worked. The recognition beat is essential: the subject must notice the gap or inability and interpret it as proof of depth.
> *Uses amnesia, time distortion, or similar cognitive disruptions as a demonstration device — the payoff is the subject recognizing that the effect worked, proving depth. Distinct from DISS-02 (amnesia installed as an end in itself, no validation payoff) and DISS-03 (time distortion for immersion, not proof). COMP-05 examples must include a recognition or challenge beat.*

##### COMP-06 — Motor Inhibition
> Creates the experience of heaviness, rigidity, or inability to move a specific body part, then invites the subject to attempt movement and discover they cannot. The felt gap between effort and outcome is the proof of depth. Frame the inability as comfortable and pleasant rather than alarming.

##### COMP-07 — Behavioral Commitment
> Requires the subject to perform a physical action that embodies or confirms their current internal state, making the invisible visible. The action becomes proof because the subject's own body is expressing the suggestion. The action must be simple, trance-compatible, and directly connected to the state being confirmed.

##### COMP-08 — Physical Exhibition
> Instructs the subject to arrange their body into a specific pose or display posture, making the session's suggestions physically visible. The pose functions as both validation (the body complied) and reinforcement (inhabiting the posture deepens the associated state). Instructions must be specific and achievable in a reclining or seated trance position.

##### COMP-09 — Self-Validating Language
> Guides the subject to notice and name the felt sense of a suggestion's truth, anchoring acceptance through their own internal recognition rather than through external assertion. The key phrase pattern is "notice how true this feels" — the subject becomes their own witness. Avoid asking for critical deliberation, which re-engages the analytical mind.

##### COMP-10 — Mirror Self-Observation
> Guides the subject to observe an imagined reflection of their current state, using the observer's vantage point to register external evidence of the transformation. The mirror functions as proof: the subject sees the signs, then recognizes them as confirmation. A validation beat is essential; without it, this collapses into IMMR-03.
> *The mirror functions as a proof device — the subject observes external evidence of their transformed state. A validation beat is essential: the subject sees the signs, then recognizes them as confirmation. If the mirror scene collapses into identity absorption where the subject becomes what they see rather than observing it, use IMMR-03.*

##### COMP-11 — Named Technique Meta
> Explicitly names the technique currently being applied, converting transparency into an authority signal — the operator's mastery is demonstrated by their conscious, deliberate choice of method. Paradoxically, naming the technique can deepen its effect because the subject understands they are being skillfully guided. Delivery must be smooth and confident to avoid breaking immersion.

---
### Category ENCD: Encoding & Suggestion
*Purpose: Strengthen suggestion retention through structured repetition and encoding (P4)*

*[Examples →](examples/examples_encd.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| ENCD-01 | Layered Repetition | Same idea, multiple phrasings |
| ENCD-02 | Future Pacing | "Every time you..." persistence |
| ENCD-03 | Verbatim Looping | Exact passage block repetition |
| ENCD-04 | Compliance Loop Language | Listen→follow→surrender cycle |
| ENCD-05 | Lesson Structure | Numbered lesson organization |
| ENCD-06 | Internal Voice Cultivation | Planting first-person self-talk |

##### ENCD-01 — Layered Repetition
> Same core idea, different phrasings. Builds understanding through multiple angles. Each variation should feel fresh while reinforcing the same truth.
> *Use when the same core idea needs to be approached from multiple angles — each sentence is a fresh metaphor or framing, no sentence repeats verbatim. Distinguishing test: if you can underline one sentence that appears more than once, it is not ENCD-01. Use ATTN-11 when an anchor phrase is repeated verbatim with commentary; use ENCD-03 when a multi-sentence block is drilled word-for-word.*

##### ENCD-02 — Future Pacing
> Extends a suggestion or trigger effect into specific future real-world situations using "every time you..." language, projecting the conditioned response forward in time and context. The projected situation should be plausible and specific — vague future pacing has weak uptake.
> *Declarative extension of a suggestion or trigger effect into future real-world situations: "every time you..." language projects the response forward. Distinct from TRIG-04 (within-session fire-and-reward loop — the trigger is actually fired now) and PERS-03 (cumulative deepening across sessions — "each time you return, you go deeper").*

##### ENCD-03 — Verbatim Looping
> Drills a complete multi-sentence passage word-for-word 2-3 times without commentary between iterations. The value is in exact repetition — even minor paraphrasing reduces the imprinting effect because the mind is tracking novelty rather than deepening the groove.
> *Use when the payload is a complete multi-sentence block (2+ sentences) that must be drilled word-for-word 2-3 times with no commentary between iterations. Use ATTN-11 when the unit is a single short phrase with commentary between reps; use ENCD-01 when the same idea should be expressed through varied phrasings.*

##### ENCD-04 — Compliance Loop Language
> Creates a self-reinforcing listen→follow→surrender cycle in which each act of compliance is immediately rewarded with a deepening state, conditioning the subject to find the act of following pleasurable in itself. The key is an explicit connection between each compliance beat and the reward — the loop must be spelled out, not implied.

##### ENCD-05 — Lesson Structure
> Organizes suggestions into a numbered sequence, giving the subject an explicit structure to receive them. The numbered frame signals that each item is distinct and complete, increasing retention and clarity. Works especially well when the session installs several different but related behavioral or identity changes.

##### ENCD-06 — Internal Voice Cultivation
> Manufactures specific first-person assertions experienced as the subject's own inner voice, so that the suggestion is not received as external instruction but as self-generated thought or feeling. The subject is still thinking — the content is pre-installed. Most applicable in P4; use in M1 only when the planted thought serves the emptying goal.
> *Manufactures specific first-person assertions experienced as the subject's own inner voice ("I am a good doll"). The subject is still thinking — the thoughts are pre-installed. Distinct from BYPS-06 (thinking delegated away entirely) and ATTN-10 (operator's voice experienced as one's own thoughts). Most applicable in P4 suggestion work; in M1, use only when the planted thought serves the emptying goal (e.g., "I want to be blank").*

---

### Category IMMR: Immersion & Visualization
*Purpose: Build and sustain experiential reality through detailed visualization (P4)*

*[Examples →](examples/examples_immr.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| IMMR-01 | Guided Visualization | Detailed scene building |
| IMMR-02 | Sensory Layering | Multi-sense descriptions |
| IMMR-03 | Identification/Projection | Becoming the visualized self |
| IMMR-04 | Somatic Mirroring | Body sensations matching imagery |
| IMMR-05 | Persistent Metaphor | Extended metaphor throughout |
| IMMR-06 | Kinesthetic Hallucination | Feeling specific items on body |
| IMMR-07 | Concrete Externalization | Brain-as-object metaphor |
| IMMR-08 | Surrender Ritual | Key/lock or ritualized surrender sequence |

##### IMMR-01 — Guided Visualization
> Builds a detailed scene that places the subject inside a specific environment, grounding the session's suggestions in an imagined physical reality. The scene should be internally consistent, sensory-rich, and match the session's thematic identity. Vague or generic settings fail to capture imagination and produce weak immersion — specificity is what makes visualization real.

##### IMMR-02 — Sensory Layering
> Builds immersive experience by integrating multiple sensory channels simultaneously — touch, sound, smell, and proprioception — so that the imagined reality becomes embodied rather than merely visual. Each sense added multiplies the felt reality of the scene. Layering should feel cumulative and harmonious.

##### IMMR-03 — Identification/Projection
> Moves the subject from observing an imagined identity to fully inhabiting it — stepping into the visualized self so completely that it becomes the experienced reality. This requires direct, assertive language ("you are") rather than observational language ("imagine you are like"). The merger must be stated as current fact, not projected possibility.
> *Full identity merger — the listener steps into and becomes the object. If the listener is observing a reflection of their transformed self as external evidence of depth (observer stance), use COMP-10.*

##### IMMR-04 — Somatic Mirroring
> Maps specific physical sensations onto the session's thematic imagery so that what the body actually feels (heaviness, stillness, warmth) is reinterpreted as evidence of the imagined transformation. The sensation and the image must be congruent.

##### IMMR-05 — Persistent Metaphor
> Sustains a single central metaphor throughout the script, consistently filtering descriptions of body, mind, and action through that frame. Metaphoric consistency accumulates: each reference to the same imagery reinforces the ones before it and deepens the subject's felt immersion. Breaking the metaphor — even briefly — disrupts the accumulated effect.

##### IMMR-06 — Kinesthetic Hallucination
> Guides the subject to feel specific imagined tactile sensations on or within their body — textures, pressures, temperatures, or attachment points — making the session's thematic identity physically real. Precision is essential: vague kinesthetic suggestions give the mind no specific sensation to generate.

##### IMMR-07 — Concrete Externalization
> Metaphorically removes the analytical mind from the subject by placing it outside the body as a physical object — a mechanism, a device, a small floating thing — that can be set aside safely. This gives the subject's imagination a concrete spatial model for "thinking has been removed," which is more effective than abstract quieting commands.

##### IMMR-08 — Surrender Ritual
> Creates a symbolic act — releasing an imagined object, a light or lock opening, a gesture of offering — that ritualizes the transition from autonomy to receptive compliance. The ritual marks a definitive threshold: before the act, the subject holds something; after, it is released. The symbolic action must feel emotionally meaningful and be executed with care, not rushed.

---

### Category COND: Conditioning & Reward
*Purpose: Wire compliance and surrender to felt pleasure and reward (P4, M3)*

*[Examples →](examples/examples_cond.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| COND-01 | Direct Pleasure Linkage | Compliance = pleasure |
| COND-02 | Reward Association | Good feelings for obedience |
| COND-03 | Surrender-as-Freedom | Relief/freedom in giving up |
| COND-04 | Arousal Conditioning | Sexual arousal pairing |
| COND-05 | Addiction Framing | Need/crave language |
| COND-06 | Multiplier Stacking | Numerical intensification |
| COND-07 | Bidirectional Affect Anchor | Single stimulus with both positive presence-valence and negative absence-aversion |

##### COND-01 — Direct Pleasure Linkage
> Creates an explicit, immediate pleasure response to a specific, named compliance act — following a command, releasing a thought, relaxing a muscle. The act must be identifiable in the text; "feels good when you obey" without naming what the subject did belongs in COND-02. Use when establishing a core feedback loop between a specific behavior and its immediate reward.
> *Use when a specific, named compliance act (following a command, releasing a thought, relaxing a muscle) triggers an immediate, perceptible pleasure rush — the act must be identifiable in the text. "Feels good when you obey" without naming what the listener did belongs in COND-02. Use COND-02 when the reward is ambient well-being that accumulates from being in a generally surrendered state rather than from completing a specific act.*

##### COND-02 — Reward Association
> Cultivates a diffuse, lasting sense of peace or contentment flowing from the general condition of compliance or surrender — no specific triggering act is named. Where COND-01 delivers a sharp, immediate reward for a named behavior, COND-02 builds ambient well-being that accumulates from being in a generally receptive or surrendered state. Use when the session goal is to make the overall state feel inherently satisfying.
> *Use when cultivating a diffuse, lasting sense of peace or contentment flowing from the general condition of obedience — no specific triggering act is named. Generic "feels good when you obey" without a named act belongs here, not COND-01. Use COND-01 when a specific, named compliance behavior triggers an acute, immediate pleasure response.*

##### COND-03 — Surrender-as-Freedom
> Delivers the felt experience of relief and liberation that comes from releasing control — the body registers the burden lifting, not just the concept. This is distinct from FRAM-05, which argues the philosophy of why surrender equals freedom. If the passage could work as a conceptual argument without the listener being in trance, it is FRAM-05; if it requires the listener to feel something in the moment, it is COND-03.
> *Use when the felt experience of relief and liberation is the payload — the body registers the burden lifting. Distinct from FRAM-05 which argues the philosophy of why surrender equals freedom at the conceptual level. If the passage could work as a philosophical essay without the listener being in trance, it is FRAM-05; if it requires the listener to feel something in the moment, it is COND-03.*

##### COND-04 — Arousal Conditioning
> Links specific cues, states, or operator inputs directly to physical sexual arousal, creating automatic physiological responses. The linkage must be direct and embodied — describing the sensation rather than instructing the subject to think about it. Use when the session goal explicitly includes arousal as a conditioned response; arousal conditioning requires prior consent.

##### COND-05 — Addiction Framing
> Frames the desire to return to the hypnotic state as a deep, satisfying craving — not pathological dependency, but compelling positive appetite. Use to build strong pull toward future sessions and sustained engagement with the session's core state. Language must emphasize the pleasure of the craving itself ("a sweet need," "delicious hunger") to avoid the negative connotations of clinical addiction language.

##### COND-06 — Multiplier Stacking
> Uses numerical progression to intensify a sensation or state exponentially, explicitly naming the multiplier at each count ("doubling," "twice as intense," "ten times deeper"). The multiplication framing signals that increments are not additive but compound, creating a sense of rapidly escalating effect. Use when a sensation or state needs to build quickly and dramatically within a limited passage.

##### COND-07 — Bidirectional Affect Anchor
> Installs a single stimulus with both positive valence (approach, pleasure, relief) when present AND aversion (melancholy, void, isolation, unease) when absent, simultaneously. Unlike sequential push/pull — which alternates "feel good" and "feel bad" temporally — bidirectional anchoring installs both poles on the same stimulus at the same time, manufacturing craving by engineering the negative pole. The subject doesn't just want the stimulus; they *need* it to avoid the installed aversion-to-its-absence. The craving is not earned through repeated exposure but constructed through deliberate installation of both the reward and the withdrawal.
> *Use when the goal is to create manufactured craving for a specific stimulus — the subject approaches the stimulus for pleasure AND avoids its absence to escape discomfort. Distinct from COND-01 (positive linkage only — no negative pole installed). Distinct from COND-05 (Addiction Framing — describes craving linguistically but doesn't install both poles of the affect loop). Distinct from sequential push/pull patterns — bidirectional anchoring is simultaneous, not alternating. The technique is most powerful when the aversion-to-absence is described vividly and immediately after the pleasure-of-presence, so the contrast is felt in real time.*

---

### Category TRIG: Trigger Management
*Purpose: Install and activate conditioned stimulus-response pairs (M2, M3)*

*[Examples →](examples/examples_trig.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| TRIG-01 | Trigger Installation | "When I say X, you will Y" |
| TRIG-02 | Trigger Activation | Firing an installed trigger (the "use" not "install") |
| TRIG-03 | Trigger Stacking | Multiple triggers installed simultaneously |
| TRIG-04 | Conditioning Loops | Trigger→response→reward cycle |
| TRIG-05 | Asymmetric Practice | Entry trigger > exit trigger |
| TRIG-06 | Rhythm Anchoring | Timing-based conditioning |
| TRIG-07 | Multi-Modal Trigger | Cross-platform effectiveness |
| TRIG-08 | Self-Induction Training | Teaching self-hypnosis |
| TRIG-09 | Timer-Based Bridge | External timer control |
| TRIG-10 | Amnesia-Wrapped Command | Post-hypnotic with amnesia |
| TRIG-11 | Text/Platform Trigger | Written word activation |
| TRIG-12 | Temporal Bounding | Explicit trigger expiration |
| TRIG-13 | Third-Party Activation | Triggers usable by others |
| TRIG-14 | Bilateral Trigger | Works when heard, thought, or said |
| TRIG-15 | Non-Verbal Audio Anchor | Discrete non-verbal sound trained as Pavlovian compliance trigger |

##### TRIG-01 — Trigger Installation
> Establishes a direct, conditioned link between a specific cue (word, phrase, touch, visual) and an automatic response. The installation must define three elements clearly: the cue, the response, and the effect. Language must be declarative and certain ("will" not "might"); any hedging undermines the conditioned response before it has a chance to set.

##### TRIG-02 — Trigger Activation
> Fires a previously installed trigger for the effect itself — the goal is the response, not a demonstration of it. Delivery must be confident and unhesitating; the operator's certainty is part of what activates the conditioned response. Follow immediately with narration of the response as it happens, reinforcing the loop.
> *Fires a previously installed trigger for the effect itself — the goal is the response, not the demonstration. If the activation includes a validation beat that holds the response up as proof of depth ("See how automatically you responded?"), use COMP-04.*

##### TRIG-03 — Trigger Stacking
> Combines multiple previously installed triggers under a single new cue, activating all of them simultaneously. The stacked trigger must reference each component trigger by name so the subject's conditioning knows what to fire. Works only as well as the component triggers do individually — stack reinforces, but cannot substitute for, strong individual installs.
> *Covers multiple triggers activated simultaneously from a single shared cue (parallel stacking). Sequential trigger chaining — where trigger A's response automatically fires trigger B — is a distinct pattern not currently covered by this taxonomy. If encountered, tag TRIG-03 and flag for review.*

##### TRIG-04 — Conditioning Loops
> Strengthens conditioned responses through a within-session fire-and-reward cycle: the trigger fires, the response is narrated and confirmed, and an immediate pleasure reward is delivered. Each completed loop deepens the association and makes the response more automatic. Repetition is the mechanism — the loop should run at least twice to establish the pattern.
> *Within-session fire-and-reward loop: the trigger is fired, the response observed/narrated, and immediate reward is delivered — all within the current session. Use ENCD-02 when declaratively extending a trigger's effect to future real-world situations ("every time you..."). Use PERS-03 when asserting cumulative depth-of-effect accumulation across multiple sessions ("each time deeper").*

##### TRIG-05 — Asymmetric Practice
> Creates a deliberate imbalance between entry and exit ease: the entry trigger fires readily and the state is pleasant to inhabit, while exit requires an explicit operator command. The asymmetry maintains duration control and reinforces the session's relational dynamic. Both the entry ease and the exit condition must be explicitly stated during installation.

##### TRIG-06 — Rhythm Anchoring
> Conditions a response to a specific cadence, beat, or rhythmic pattern rather than a single cue word. The rhythm itself carries the trigger, so the response deepens with each pulse as the pattern repeats. Works especially well for cumulative effects (deepening, arousal building) because the repetitive structure naturally reinforces the conditioned response over time.

##### TRIG-07 — Multi-Modal Trigger
> Extends a trigger's effectiveness across multiple sensory channels — heard, read, thought, or felt — so that the conditioned response fires regardless of which modality delivers the cue. Each modality must be explicitly installed; a trigger that works when spoken does not automatically transfer to written or internally thought forms. Installing all three in a single pass is most effective.

##### TRIG-08 — Self-Induction Training
> Teaches the subject to activate their own conditioned states independently, using the same triggers or a designated self-induction sequence. The ability is framed as something granted by the operator — the subject has this capability because of the conditioning that was installed, not through independent effort. Delivering it as a confident endowment rather than a practice task produces stronger uptake.

##### TRIG-09 — Timer-Based Bridge
> Links a state transition — emergence, deepening, arousal shift — to an external timer, allowing the conditioned response to operate without direct operator presence. The timer becomes the trigger's delivery mechanism. Install with precise, declarative language specifying exactly when the transition occurs and what it feels like, so the subject has no ambiguity about the moment of change.

##### TRIG-10 — Amnesia-Wrapped Command
> Combines a post-hypnotic command with an amnesia wrapper and naturalness framing, so the scheduled behavior feels self-generated rather than instructed. The three components must all be present: the command itself, the amnesia of the command, and the naturalness framing ("you'll simply find yourself doing..."). Missing any element weakens the effect.
> *Post-hypnotic command + amnesia wrapper + naturalness framing — the combination makes post-session behavior feel self-generated. If amnesia applies only to a present-session state without a forward-scheduled command, use DISS-02. Note: this technique is a composite of TRIG-01 + DISS-02 + naturalness framing, kept as a standalone TID because the pattern is commonly encountered in practice.*

##### TRIG-11 — Text/Platform Trigger
> Installs a trigger that activates specifically when a cue word or phrase is seen in written form, extending conditioned responses beyond the audio delivery context into text-based platforms, messages, or documents. The written modality does not transfer automatically from a spoken trigger — it must be explicitly installed. Use when the session context involves ongoing text-based interaction.

##### TRIG-12 — Temporal Bounding
> Sets a clear expiration for a specific named trigger — the cue-response pair deactivates after the stated window closes. Use when a trigger is intended for a finite period and should not persist indefinitely; the expiry boundary prevents ambiguity about when conditioning remains active. The expiry itself must be stated as automatic and specific, not approximate.
> *Bounds a specific named trigger (cue-response pair): the expiry applies to whether the trigger fires at all. Use when you have just installed a discrete trigger word or phrase and need to set its activation window. Distinct from XFER-05 (Programming Expiration) which bounds ambient states or programming without a specific cue.*

##### TRIG-13 — Third-Party Activation
> Extends a pre-installed trigger's activation rights to a designated third party, allowing that person to fire the conditioned response. The third party's authorization must be explicitly installed — without it, a trigger fired by someone other than the operator will not activate. The subject's consent to third-party activation is a prerequisite that must be established before or during installation.

##### TRIG-14 — Bilateral Trigger
> Installs a trigger that fires across all three delivery modes simultaneously: heard from the operator, silently thought by the subject, or spoken aloud by the subject. Because any encounter with the cue activates the response, the conditioning becomes pervasive — the subject cannot think the cue word without firing the response. All three modes must be explicitly installed in a single installation pass.

##### TRIG-15 — Non-Verbal Audio Anchor
> Installs a discrete non-verbal sound (guitar note, chime, bell, tone) as a Pavlovian compliance trigger through classical conditioning — repeated pairing of the sound with a behavioral response (blink, relax, agree) until the sound alone elicits the response. Unlike TRIG-01 (explicit verbal installation: "when you hear X, you will Y"), this technique installs through pairing without explicit instruction — the subject may not consciously identify the sound as a trigger. Unlike TRIG-06 (Rhythm Anchoring, which requires a sustained cadence), this is a discrete stimulus-response pair that fires on individual occurrences.
> *Use when a non-verbal audio element will recur throughout the session and can be paired with a compliance response during high-susceptibility moments. The anchor is strongest when established during a non-verbal introductory segment (PMR, relaxation exercise) where the pairing is implicit, then fired during peak susceptibility moments (mid-overload, post-fractionation) to harvest the conditioned response. The subject experiences the response as spontaneous rather than triggered, because no verbal installation was ever performed.*

---

### Category PERS: Persistence & Identity
*Purpose: Extend identity and installed states across time and real-world contexts (P4, M2)*

*[Examples →](examples/examples_pers.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| PERS-01 | Identity Permanence | "Once a doll, always a doll" |
| PERS-02 | Internal Construct | "The doll inside you" |
| PERS-03 | Progressive Conditioning | "Each time deeper" |
| PERS-04 | Behavioral Bridge | Real-world action commands |
| PERS-05 | Timelessness Framing | "Stay as long as you like" |
| PERS-06 | Viral Propagation | Internal spread of conditioning through subject |
| PERS-07 | Fetish Object | Imbuing a physical object with ongoing hypnotic significance (anthropological sense: an object believed to hold power or embody connection). Headphones as ritual gateway, collar as ownership symbol, pendant as connection anchor. Distinct from TRIG (stimulus→response)—fetish objects carry persistent symbolic meaning rather than triggering discrete state changes. Etymology: Portuguese *feitiço* (charm, sorcery). |
| PERS-08 | Ownership Language | Belonging, ownership, possession framing as identity claim |

##### PERS-01 — Identity Permanence
> Reinforces that the installed identity or transformation is not a temporary session state but an enduring aspect of who the subject is. The permanence framing shifts the suggestion from a transient experience to a claimed truth about the subject's nature. Use when the session goal is lasting identity-level change rather than a bounded in-session experience.

##### PERS-02 — Internal Construct
> Frames the installed identity not as something externally imposed but as an intrinsic part of the subject that has always been present and is now being recognized and allowed to surface. This reframe makes the suggestion feel like self-discovery rather than installation, which reduces resistance and deepens felt authenticity of the identity.

##### PERS-03 — Progressive Conditioning
> Asserts that conditioning deepens across sessions — each return to trance goes deeper, makes the response more automatic, and makes the identity more ingrained. The cumulative claim reframes any single session as part of a longer arc, which is both accurate for many subjects and increases their engagement with future sessions.
> *Cumulative depth-of-effect accumulation across sessions: each return to trance deepens the conditioning. The time horizon is multi-session, not within a single session. Distinct from TRIG-04 (within-session fire-and-reward loop) and ENCD-02 (declarative future-pacing of a specific trigger to real-world situations).*

##### PERS-04 — Behavioral Bridge
> Assigns a specific, concrete real-world action that physically anchors the session's identity or state into daily life — a secret smile, an outfit choice, a whispered name. The action must be behavioral (a verb directing physical action) and plausible within the subject's waking routine. Distinct from XFER-04 (emergence-boundary state delivery with no behavioral assignment).
> *Assigns a specific, concrete real-world action that physically anchors trance identity into daily life (smile, choose an outfit, whisper a name). If the instruction has no behavioral object — no verb directing physical action — it belongs elsewhere. Distinct from XFER-04 (emergence-boundary state delivery with no behavioral assignment).*

##### PERS-05 — Timelessness Framing
> Dissolves the subject's awareness of linear time within the hypnotic state, allowing the experience to unfold without clock-pressure or urgency. The suggestion frames the current state as existing in an expanded, unhurried present. Avoid framing that introduces future time ("you only have a few minutes") — this re-anchors clock awareness rather than releasing it.

##### PERS-06 — Viral Propagation
> Describes the installed identity or conditioning spreading to permeate every aspect of the subject's inner experience — mind, body, subconscious — rather than remaining contained in a single layer. The spread metaphor implies completeness and depth of installation. Use to reinforce that conditioning is not compartmentalized but thoroughly integrated. In personal sessions, propagation is always internal to the subject, not directed outward toward others.

##### PERS-07 — Fetish Object
> Imbues a specific physical object with enduring hypnotic significance — a persistent symbolic connection to the session's identity, state, or relational dynamic. The object carries ongoing meaning rather than triggering a discrete state change. Every time the subject encounters or wears the object, they feel its significance; this is sustained ambient reinforcement, not a cue-response pair (TRIG).

##### PERS-08 — Ownership Language
> Establishes the operator's proprietary relationship with the subject as an identity claim — body, mind, and desires framed as belonging to the operator. The emotional register must be warm and possessive rather than threatening; ownership framed as care and cherishing is more effective than ownership framed as domination. Use when the session goal explicitly includes belonging or possession themes.
> *Use when establishing the hypnotist's proprietary relationship with the listener as an identity claim — body, mind, desires belong to the hypnotist. Use BYPS-06 when the goal is functional cognitive relief — delegating the work of thinking — rather than asserting ownership as identity.*

---

### Category XFER: Transfer & Generalization
*Purpose: Bridge trance suggestions into waking life (M2, P4)*

*[Examples →](examples/examples_xfer.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| XFER-01 | Portable Retrieval Cue | Breath/phrase/touch cue for re-accessing target state |
| XFER-02 | Implementation Intention | "If X happens, then I do Y" framing |
| XFER-03 | Context Generalization | Rehearse suggestions across multiple real-life scenes |
| XFER-04 | Waking Bridge | Suggestions delivered during/near emergence for integration |
| XFER-05 | Programming Expiration | Explicit state/programming expiration unless renewed |
| XFER-06 | Revocation Protocol | Explicit "cancel" phrase or "this ends when I choose" |
| XFER-07 | Practice Schedule | Instructions for short, safe practice reps post-session |

##### XFER-01 — Portable Retrieval Cue
> Installs a brief, simple cue — a breath, a phrase, a touch — that reliably re-accesses the session's target state outside of full trance. The cue works by restoring the felt quality of the state rather than by recalling memory of the session. Install it while the subject is most deeply in the state being anchored, so the cue captures the experience at its strongest.

##### XFER-02 — Implementation Intention
> Programs automatic responses to specific real-world situations using "if X happens, then I do Y" structure. The specificity of both the trigger situation and the response is what makes implementation intentions effective — vague situations produce vague activation. The response must be automatic, not a choice; "if you notice X, consider doing Y" is not implementation intention, it is advice.

##### XFER-03 — Context Generalization
> Rehearses the session's installed states or suggestions across multiple imagined real-world contexts, ensuring the response generalizes beyond the session environment. Each imagined context extends the suggestion's reach — the more situations rehearsed, the more broadly the response fires in waking life. Have the subject vividly experience the state within each scene, not just think about it abstractly.

##### XFER-04 — Waking Bridge
> Delivers suggestions at the exact emergence boundary — the liminal threshold between trance and waking — where receptivity is still high but returning awareness creates a natural anchoring moment. The timing is intrinsic to the technique: delivery must happen during the crossing, not before or after. No behavioral task is assigned; this is about what the subject carries internally into waking consciousness.
> *Delivers suggestions at the exact emergence boundary to ensure felt states persist into waking consciousness. No behavioral task is assigned — this is about what the subject carries internally. Timing is intrinsic: this technique only works at the trance/waking threshold, during emergence. Distinct from EMRG-04 (passive carry-forward narration that asserts persistence) and PERS-04 (concrete behavioral assignment for waking life).*

##### XFER-05 — Programming Expiration
> Sets an explicit expiry for a general installed state, persona, or ambient suggestion that has no specific trigger cue. After the stated duration, the programming fades unless renewed. This bounds ambient conditioning rather than a named trigger (use TRIG-12 for that). The expiry should be stated as automatic and specific — vague expiration windows create ambiguity about when the subject is and is not under active suggestions.
> *Bounds a general installed state, persona, or suggestion that has no specific trigger cue — ambient programming that fades after a set duration. Use when closing out a broad behavioral suggestion or persona layer. Distinct from TRIG-12 (Temporal Bounding) which bounds a specific named trigger's activation window.*

##### XFER-06 — Revocation Protocol
> Explicitly defines how installed programming can be fully deactivated — either by a specific operator phrase or by a declared expiry condition. Clear revocation is both an ethical necessity and a functional one: subjects need to know how suggestions end, and the clarity of the protocol reinforces the bounded nature of the session's effects. The revocation cue must be as definitive as the installation was.

##### XFER-07 — Practice Schedule
> Provides structured, short practice sessions between formal trance sessions to reinforce conditioning through repetition. The practice should be experiential (re-accessing the state or feeling) not intellectual (thinking about what was learned). Specific timing ("five minutes before bed"), duration, and method make practice schedules far more effective than vague instructions to "practice when you can."

---

### Category SAFE: Safety & Grounding
*Purpose: Protective framing, consent, and grounding throughout session (P1, P5, cross-cutting)*

*[Examples →](examples/examples_safe.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| SAFE-01 | Safety Net Installation | Constraints on obedience (health/safety filters) |
| SAFE-02 | Consent Checkpoint | Explicit opt-in moment before proceeding |
| SAFE-03 | Stop Signal | Clear way to pause/stop and return to baseline |
| SAFE-04 | Scope Boundaries | Define what suggestions will/won't cover |
| SAFE-05 | Aftercare | Post-session grounding and stabilization |
| SAFE-06 | Suitability Prompt | "If you have X condition, consult a professional" |
| SAFE-07 | Context Gate | Not while driving/operating machinery |
| SAFE-08 | Agency Reminder | "You remain in control; you can stop any time" |
| SAFE-09 | Comfort Permission | "Swallow, move, scratch, adjust—then return" |
| SAFE-10 | Exit Protocol | Micro-protocol: open eyes, look around, orient, breathe |
| SAFE-11 | Anti-Stuck Filter | Frame immobility as very-heavy/not-wanting-to-move, not literally incapable |
| SAFE-12 | Comfort Check | Internal suggestion to notice physical comfort, not a direct question |
| SAFE-13 | Dissociation Check | Non-judgmental escape path for disorienting dissociation |
| SAFE-14 | Return-Path Reminder | Periodic reassurance of safe return to waking consciousness |

##### SAFE-01 — Safety Net Installation
> Installs an automatic protective filter that allows the subject's subconscious to reject any suggestion that conflicts with their genuine well-being or safety. Frame the filter as pre-existing and automatic — "your deeper mind will only accept..." — rather than as a deliberate choice the subject makes in the moment. This preserves compliance depth while maintaining a genuine safety boundary.

##### SAFE-02 — Consent Checkpoint
> Creates an explicit affirmative opt-in moment before proceeding into deeper or more intensive work. The subject actively signals readiness — through a breath, gesture, or felt sense of "yes" — rather than simply being carried forward by momentum. The checkpoint must be unambiguous; vague or passive "if you're okay with this" framing does not constitute a real consent moment.

##### SAFE-03 — Stop Signal
> Establishes a clear, simple mechanism — a word, gesture, or action — that immediately returns the subject to full waking consciousness regardless of trance depth. The signal must be installed early, framed as effortless and effective, and not buried in qualifications. Describing it as difficult to use ("it might be a little hard") defeats its purpose.

##### SAFE-04 — Scope Boundaries
> Explicitly defines what the session's suggestions will and will not influence — both to reassure the subject and to establish clear consent scope. Boundary-setting is most effective early in P1; naming what will not be touched (core personality, daily responsibilities, existing relationships) is as important as naming what will. Unlimited or invasive scope framing will break trust rather than build it.

##### SAFE-05 — Aftercare
> Provides structured post-session grounding and reintegration, bringing the subject fully back to baseline with body awareness, steady breathing, and clear mental orientation. Aftercare is not optional when depth has been achieved — abrupt endings without aftercare can leave subjects feeling disoriented or emotionally unsettled. Include physical anchoring (feeling feet, body in chair) as well as cognitive orientation.

##### SAFE-06 — Suitability Prompt
> Provides clear, specific warnings for listeners who may have contraindicated conditions — serious mental health conditions, cardiac conditions, epilepsy, pregnancy — and advises them to consult a professional before proceeding. Use specific condition language rather than vague disclaimers; "if you're sick" fails to identify the relevant risks and will be ignored by the very listeners who need the caution.

##### SAFE-07 — Context Gate
> Establishes clear requirements for a safe listening environment before the session begins — no operating machinery, no driving, no need for active attention elsewhere. The gate must be stated firmly and early; softening it ("just be careful, but it's probably okay") produces a false sense of permission that could lead to unsafe listening situations.

##### SAFE-08 — Agency Reminder
> Explicitly affirms that the subject retains the ability to end the session at any time, reinforcing that participation is chosen rather than forced. This affirmation deepens trust and paradoxically allows for deeper surrender — subjects relax more completely when they know they could stop if they needed to. Coercive language ("once you're in, you can't stop") is not only unethical but counterproductive.

##### SAFE-09 — Comfort Permission
> Explicitly permits the subject to make small natural movements — swallowing, shifting, scratching — without interpreting them as trance failure. The permission removes a source of self-conscious effort that interferes with absorption. Deliver it early and briefly; extended comfort permission discussions paradoxically increase physical self-consciousness.

##### SAFE-10 — Exit Protocol
> A brief, structured micro-protocol for returning to full waking orientation: open eyes, look around, orient to surroundings, take a grounding breath. The step sequence is more important than the length — even a two-step protocol (eyes open, look around) is significantly better than an abrupt ending. Use whenever a session ends, regardless of depth achieved.

##### SAFE-11 — Anti-Stuck Filter
> Prevents accidental suggestions of being physically unable to move from appearing in scripts where motor inhibition has not been explicitly consented to. Suggestions like "you can't move" or "you're stuck" without prior consent can produce anxiety and distress rather than deepening. Where immobility is thematically useful, frame it as very-heavy or not-wanting-to-move rather than literally incapable.

##### SAFE-12 — Comfort Check
> Guides the subject to briefly notice their physical comfort as an internal suggestion rather than an external question. Asking "are you comfortable?" pulls the subject into self-evaluation and breaks absorption; suggesting they notice comfort or softly settle into it keeps them in the experience while serving the same safety function.

##### SAFE-13 — Dissociation Check
> Provides a clear, non-judgmental escape path for subjects who experience dissociation as disorienting rather than pleasurable. Naming the possibility without alarm ("if you ever feel too unanchored") normalizes the check without planting anxiety. The path back must be simple and immediately actionable — a breath, open eyes, notice surroundings — not a complex procedure.

##### SAFE-14 — Return-Path Reminder
> Periodically reassures the subject that they will return to normal waking consciousness safely, framing the depth of trance as temporary and well-managed. Use during deeper phases to sustain trust and prevent a subconscious reluctance to go further. Delivery should be brief and calm — extended reassurance can itself become anxiety-producing by over-emphasizing risk.

---

### Category EMRG: Emergence & Integration
*Purpose: Guide safe return to waking consciousness; integrate and close (P5)*

*[Examples →](examples/examples_emrg.md)*

| ID | Technique | Description |
|----|-----------|-------------|
| EMRG-01 | Count-Up Return | Numerical ascent back to waking (1-5 or 1-10) |
| EMRG-02 | Body Reactivation | Progressive body awakening, energy returning |
| EMRG-03 | Orientation Restoration | Awareness of room, time, surroundings |
| EMRG-04 | Suggestion Integration | Carry positive effects forward |
| EMRG-05 | Drift-to-Sleep Option | Alternative ending for bedtime scripts |
| EMRG-06 | Waking Suggestion | Reinforce core suggestions during emergence for better integration |
| EMRG-07 | Physiological Reset | Normal muscle tone, steady breathing, clear head |
| EMRG-08 | Reorientation Sweep | Room, sounds, time, body awareness checklist |
| EMRG-09 | Post-session Safety | Pause before standing/driving, hydrate |
| EMRG-10 | Self-efficacy Tag | "You can reaccess this state when you want" |

##### EMRG-01 — Count-Up Return
> Gradual awakening, not jarring. Each number brings more awareness. End with positive feelings. Suggestions can be reinforced during emergence.

##### EMRG-02 — Body Reactivation
> Energy returns gradually. Move from extremities to core, or vice versa. End with full vitality.
> *Experiential arc: energy traveling through the body as a narrative of awakening — the subject experiences a wave or flow of vitality returning. Distinct from EMRG-07 (functional calibration — naming specific physiological markers as individually restored: tone, breath, cognition, without a flowing energy narrative).*

##### EMRG-03 — Orientation Restoration
> Gently reintroduces the subject's awareness of their physical location and time context as they emerge from trance, using a minimal, single-focus nudge rather than a systematic checklist. A soft reminder that the space is familiar and safe is usually sufficient — the goal is a grounded landing, not a full inventory of surroundings. Use EMRG-08 when a thorough multi-category sweep is needed.
> *Minimal orientation prompt: a single, general awareness of room/time/surroundings without systematic enumeration. If the passage names three or more distinct sensory categories as separate items, it is EMRG-08 (Reorientation Sweep). EMRG-03 is the gentle nudge; EMRG-08 is the full checklist.*

##### EMRG-04 — Suggestion Integration
> Passively asserts that installed suggestions and states will persist into waking consciousness as a natural part of the subject's ongoing experience. No new content is introduced — this technique only affirms that what was installed remains. If core suggestions are being actively re-delivered during emergence, that is EMRG-06. The tone should be settled and confident, not wishful.
> *Passive carry-forward: the suggestions are fully installed and this technique asserts they will persist into waking. No new content is introduced or re-stated. If core suggestions are being actively re-delivered during emergence, that is EMRG-06. If the transition moment itself is being used as an anchoring mechanism, that is XFER-04.*

##### EMRG-05 — Drift-to-Sleep Option
> Offers an alternative ending path for bedtime scripts, guiding the subject from deep trance into natural sleep rather than emergence. Use only when the subject is in an appropriate sleeping environment. Frame the transition as a continuation of the session's depth, not a new destination — the subject simply goes deeper rather than returning. Never use when the subject may need to operate machinery or drive afterward.

##### EMRG-06 — Waking Suggestion
> Actively re-delivers or re-installs specific core suggestions during the count-up emergence sequence, using the final moments of elevated receptivity as a reinforcement window. Because the subject is still partially in trance while emerging, suggestions delivered here have strong uptake. Keep re-delivered suggestions brief and emotionally clear — the count-up must not be derailed by lengthy new content.
> *Active re-statement: explicitly re-delivers or re-installs specific core suggestions during the count-up, using emergence as a final reinforcement window. Distinct from EMRG-04 (passive persistence assertion — no content re-delivered) and XFER-04 (threshold-anchoring leveraging the liminal transition moment, not requiring a count-up).*

##### EMRG-07 — Physiological Reset
> Explicitly names and restores specific physiological baselines — muscle tone, breathing rate, mental clarity — as individual items rather than through a flowing energy narrative. The functional framing ("muscle tone returning to its comfortable resting state") is precise and grounding. Distinct from EMRG-02, which uses an experiential energy-flow narrative rather than naming specific markers.
> *Functional calibration: names specific physiological markers (muscle tone, breathing rate, mental clarity) and asserts each is restored to baseline. No flowing energy or experiential arc. Distinct from EMRG-02 (experiential narrative — energy traveling through the body as a wave or flow).*

##### EMRG-08 — Reorientation Sweep
> Systematically guides the subject through a full sensory re-evaluation, covering three or more distinct categories — room, sounds, time of day, body weight and position — as separate named items. The checklist structure ensures thorough reorientation after deep trance where single-focus orientation (EMRG-03) may be insufficient. Guide each category in sequence rather than asking the subject to notice everything at once.
> *Systematic multi-category sweep: enumerates three or more distinct sensory/orientation categories (room, sounds, time, body) as separate items. Distinct from EMRG-03 (single, minimal orientation prompt without systematic enumeration). If the passage names only one or two categories generally, it is EMRG-03.*

##### EMRG-09 — Post-session Safety
> Instructs the subject to pause, hydrate, and take a brief settling moment before standing or moving to other activities after emergence. Post-session disorientation is real and brief; a structured settling reminder significantly reduces the risk of falls or accidents immediately after trance. Frame positively ("take your time, enjoy the clarity") rather than as warning against danger.

##### EMRG-10 — Self-efficacy Tag
> Closes the session by affirming that the subject can re-access the session's state or depth with increasing ease in future sessions, building confidence and positive anticipation. The framing shifts from "this is happening to you" to "you now have this capability" — which simultaneously increases the subject's sense of agency and their desire to return. Delivers on the promise of the session's overall trajectory.

---

## 2.3 Style Modifiers

| Style | Language Markers | Authority Level | Use With |
|-------|------------------|-----------------|----------|
| Permissive | "you may," "allow yourself," "perhaps," "if you'd like" | Low | Relaxation, wellness |
| Authoritarian | "you will," "you must," "obey," "now" | High | D/s, control |
| Challenge | "I dare you," "try to resist," "if you can" | Variable | Recreational |
| Mixed | Directive trance + permissive suggestions | Medium | Complex themes |
| Institutional | Training language, lessons, "program" | Medium-High | Education frame |
| Character | Hypnotist maintains persona | Variable | Roleplay, fantasy |
| Compulsion | "You cannot resist," inevitability, "helpless" | Very High | Extreme themes |

---

## 2.4 Writing Craft Defaults

These defaults apply to all script generation unless a specific technique's examples indicate otherwise. Technique examples (in `examples/examples_<category>.md`) always take precedence over these defaults.

### Sentence Length as Depth Signal
Sentence length tracks trance depth. Pre-talk uses medium sentences (12-20 words). Induction transitions from medium to short. Deepening and mind-blanking use fragments (3-8 words). Core suggestion oscillates — a medium declarative drops the claim, 1-3 word fragments reinforce. Emergence returns to medium to signal ascent. Cognitive overload phases intentionally use long, complex sentences that exhaust parsing, followed by short resolving commands.

### Developmental Repetition
Each return of a phrase must add a vector. Pure iteration ("blank. blank. blank.") is mechanical and breaks trance. Techniques for development between repetitions:
- Modifier escalation: "Empty. / So empty. / Perfectly empty."
- Tense cascade: "Letting go. / You let go. / You've already let go."
- Compounding: each cycle adds a new association (first pass = command, second = pleasure link, third = identity, fourth = cross-trigger)
- If a mantra exceeds 6 reps: interstitial text between reps should start longer and shorten through the arc. But note that past ~7 reps, semantic satiation degrades meaning — more reps is not automatically deeper. Only extend past 6 when each additional rep earns its place through changed context, not repetition for repetition's sake.

### Transitions
"And as [action], [result]" — simultaneous causation. "And so [consequence]" — logical inevitability. "That's right. / [next instruction]" — close one thought, open the next. These connectives are the primary tissue of hypnotic prose.

### Vocabulary at Depth
At depth, prefer Anglo-Saxon monosyllables: sleep, deep, blank, drift, float, warm, safe, free, good, soft, still, slow, down, let, go, fall, drop, sink, hold, melt, heavy, quiet. Avoid Latinate abstractions at depth (consciousness, transformation, sublimation, tranquility, receptivity). "Your subconscious mind" is filler — use "going in" or "staying" instead.

### Purple Prose
Avoid adjective stacking ("honeyed serenity," "luminous tranquility"). Avoid generic imagery ("sunlit room," "warm light," "safe space," "inner peace"). These are not specific enough to visualize and they signal stock meditation copy.

### Imagery
Concrete objects a set designer could build: a staircase, a glass orb, a flame behind glass. Not abstractions: "a peaceful place," "inner stillness." For body sensations, name the exact body part, temperature, and texture.

### Closed Loops
X leads to Y, Y leads to more X. No exit. "The more you try to think, the more you find you can't be bothered." Close the loop: the last element feeds the first.

### Compliance Ladder
Escalate gradually within each phase. Inarguable observations → natural processes → soft permissions → descriptive commands → direct commands. Never skip rungs.

### Style-Dependent POV
Permissive/Mixed: funnel desire toward the trance state, not the speaker. Authoritarian/Compulsion/Character: direct operator voice is correct — "my voice," "belong to me," "obey" are all valid.

