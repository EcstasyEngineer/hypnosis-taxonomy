# Hypnosis Taxonomy · Writer’s reference

[Browse the reference](https://ecstasyengineer.github.io/hypnosis-taxonomy/)

A static, data-driven reference for comparing writing operations, structural patterns and supporting material. The current edition contains 979 entries and 4,082 curated relationships. Entry descriptions are reference material; source occurrence and intended effects do not establish demonstrated outcomes.

## Choose a way in

- **Browse & compare:** search operations and distinctions, filter by reviewed writing role, and pin up to four entries. The desktop table becomes readable cards on mobile.
- **Workspace:** keep full operations, distinctions, setup, examples and variants together. Find candidates connected to every pin or any pin. Curated see-also, observed co-occurrence and observed-next are separate modes. Pair-count and association-lift ranking expose their basis.
- **Network:** explore relations, co-occurrence or ordered annotation observations. Circles remain the same screen size when zooming; labels yield to each other. Use search, zoom/Fit buttons, touch gestures and the accessible relationship list. Pinned entries can show shared or any neighbors.
- **Entry:** read the full operation, selection guidance, all public examples and neighbor rationales. Some examples may be explicitly withheld from this public edition.
- **Timeline:** load an annotation JSON locally in the browser to inspect line-based density and entries. The file is not uploaded.

Node colors use the stored kinds: technique, structural pattern (`container`) and principle. The table’s reviewed writing roles are a separate retrieval layer: writing move, structural pattern, supporting principle and supporting assessment. Neither labels nor graph proximity certify efficacy.

## Read the data honestly

The graph includes 525 nonempty annotation units from 527 files. Of those files, 39 have ambiguous or unresolved underlying source identity. Units therefore must not be described as verified distinct scripts or independent authors.

- `edges` are curated relationships: symmetric `see_also`/`contrasts_with`, directed `distinct_from`.
- `cooc[a] = [[b, count, lift], …]` contains full symmetric pairwise co-occurrence. Count is annotation units containing both; lift is observed overlap relative to independence in this corpus. Shared pairwise neighbors do not prove joint occurrence of all selected entries.
- `next[a] = [[b, count, share], …]` and `prev[b] = [[a, count, share], …]` use their own outgoing/incoming denominators. Overlapping spans and ambiguous boundaries are excluded. These are annotation-order observations, not prescribed next steps.
- `annotation_units` is per-entry observed annotation coverage. `provenance_counts` counts source-key units, which may include literature, scripts and unresolved aliases. These are different measures.
- `meta` describes coverage, exclusions, schema and layout limits. Layout distance is exploratory; known stale embedding vectors are excluded, and a matching text length does not prove embedding freshness.

## Retrieval for another tool

`graph.json` is a static public data contract, not a hosted reasoning service. The workspace’s **Export retrieval JSON** downloads selected entry details, all matching candidates, per-pin evidence, filters, ranking and coverage metadata. A downstream agent can inspect those records before proposing a writing decision. No agent or script generator runs in this page.

This repository contains generated public artifacts. The private working repository owns the exporter and viewer source; its update command regenerates data and scans every artifact before writing this checkout. Do not hand-copy private data or source files here. Private corpus identities and quotations are not part of the public contract.

## Local preview

Run `python3 -m http.server 8000` in this folder and open `http://localhost:8000/`. No build system, remote font, CDN or account is required. All viewer assets are local. `v8_book.md` is the long-form reference; `legacy/` preserves earlier editions.

Content: CC BY-SA 4.0; see [LICENSE](LICENSE).

## UX release evidence

[View the acceptance scorecard](ux-report.html) for the frozen rubric, measured published baseline, additional revamp gaps, solutions and final verification. It separates the owner’s approximate60% qualitative assessment from engineering acceptance toward95/100. The previous unpublished build already passed the functional checklist; additional improvements are reported separately. No visitor analytics are collected.

Workspace downloads offer compact candidate detail (all operations, selection guidance and evidence, with explicit omitted-example counts and links) or full candidate examples. Selected entries always retain full examples. All candidates remain reachable through pagination.
