# Hypnosis Taxonomy

[Browse the reference](https://ecstasyengineer.github.io/hypnosis-taxonomy/)

An encyclopedia of hypnosis techniques: what each one does, how to do it, and why it works. Every "why" carries an honest evidence grade and, where one exists, a link to the real research finding behind it.

## Ways in

- **What are you training?** Nine goals, from triggers and pleasure control to identity play and trance skills. Each goal page lists recipes first, then levers.
- **Where in the session?** Eight stages in session order: prepare, induce, deepen, get it accepted, install, convince, make it stick, emerge.
- **Recipes:** named step-by-step routines such as the yes set or fractionation. Each step links to the lever it uses.
- **Search** works the way people write terms: "yes set", "yes-set" and "Yes Set" find the same entry, and name matches rank first.
- **Browse & compare / Workspace:** filter every entry by kind and risk, pin up to four, and see what tends to go with them.
- **Network:** related entries, entries used in the same scripts, and entries used one after another, colored by goal or stage.

## Kinds of entry

- **Lever:** one move.
- **Recipe:** a named, ordered run of levers.
- **Session structure:** the shape of a whole session or a large part of one.
- **Principle:** background that explains why other entries work.

## Evidence grades

Established, supported, plausible, speculative, folk. Every grade rates the research behind the explanation (the effect the "why" relies on), usually done outside hypnosis; a grade does not mean the move itself was tested in a session. When in doubt the lower grade applies. Every entry page has a "How we grade" panel with the full scale. Counts from the annotated scripts ("seen in N scripts", "often followed by") describe what writers do. They do not show that something works.

## Data

`graph.json` (schema 3) is the static data file the page reads: entries (`nodes`), hand-made links (`edges`: `see_also`, `contrasts_with`), `goals`, `stages`, and the script patterns `next` and `prev` (`[entry, count]`, top 6 per entry) and `cooc` (`[entry, count, lift]`, top 8 per entry). It is generated, together with this page and `v8_book.md`, from a private working repository. A publish gate scans every artifact before it is written here. Private source material is not part of this repository.

## Local preview

Run `python3 -m http.server 8000` in this folder and open `http://localhost:8000/`. There is no build step and no CDN. `v8_book.md` is the long-form reference, and `legacy/` keeps earlier editions.

Content: CC BY-SA 4.0; see [LICENSE](LICENSE).
