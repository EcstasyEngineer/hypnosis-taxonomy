# Hypnotic Devices

[Browse the reference](https://ecstasyengineer.github.io/hypnosis-taxonomy/)

An encyclopedia of hypnotic and rhetorical devices: the things a writer can do in a script.
Each entry says what the device is, how to write it, how to recognize it in a text, what
it is most often confused with, and how well supported it is.

It is built for three readers:

- **Script writers** who want to know what their options are at each point in a session.
- **Hypnosis practitioners** who want plain names and honest evidence notes.
- **Agents** that label a script against the catalog, or draft copy using named devices.

## What counts as an entry

A device is listed only if it is one move, has a plain name (the one already used in
hypnosis, behavior analysis, persuasion research or rhetoric, where there is one), works
whatever the theme, and can be pointed at in the wording. Combinations of devices, scenes,
storylines and themes are deliberately left out.

| kind | meaning |
|---|---|
| Family | An umbrella such as Conditioning or Presupposition. Families nest. |
| Device | One thing a writer does. |
| Variant | A named, narrower form of one device. A yes set is a variant of the compliance ladder. |
| Recipe | A named, ordered combination of devices, such as the Elman induction. |
| Structure | A session-scale part or shape: pre-talk, loop, series. |
| Delivery | A voice or audio choice. Heard, not read. |
| Theory | Why devices work. Background, not something to label. |

## Evidence grades

`experimental` (the effect has controlled studies), `clinical-tradition` (standard in
clinical hypnosis texts), `practitioner-lore` (taught in NLP, stage or community practice
without independent validation), `rhetorical-tradition` (a classical figure of style),
`contested` (studied, with mixed or failed replication). A grade describes what is known
about the device. It does not promise that a line will work on a given listener.

## Files

| file | what it is |
|---|---|
| `index.html` | The site. No build step, no CDN. |
| `canon.json` | Everything: entries, theory, corpus counts. Schema 4. |
| `catalog.md`, `catalog.json` | Compact catalog for labeling: id, summary, cues, nearest confusions. |
| `book.md` | The whole reference as one long document. |
| `legacy/` | Earlier editions, including the v8 graph browser. |

## Labeling a script

Give an agent `catalog.md` and a script. For each span it returns the line range, the
exact quote, the device id, a confidence and the cue it matched. Variant labels also count
as their parent, and spans may overlap. Themes and plot are not devices and stay unlabeled.

## Corpus counts

"Seen in N scripts" figures are projected from an older set of labels over a private
script collection. They show what writers do, not what works. No script text is published
here.

## Consent

This is a reference for consensual hypnosis and for recognizing influence. Entries that
depend on the listener not noticing, that persist after a session, or that come from
coercive-control research carry a consent note. Used on someone who has not agreed, those
are abuse.

## Local preview

Run `python3 -m http.server 8000` in this folder and open `http://localhost:8000/`.

Content: CC BY-SA 4.0; see [LICENSE](LICENSE).
