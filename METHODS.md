# Separate the observation from the reading

Memely studies a supplied corpus. It does not discover the whole internet, count all holders or infer a narrative's financial value. Its local measurements are explicit so an AI or human reader can explain them without losing the input record.

## The analysis pass

Validate the corpus. Admit records at or before the cutoff. Curate original posts across eligible history. Form equal current and preceding windows. Match complete normalised phrases against declared themes. Count posts, aliases and graph edges. Select timestamped activity records and baselines separately. Build one source packet for the selected narrative.

## Denominators

| Measurement | Meaning |
|---|---|
| Retained original posts | Supplied originals after exact repeat filtering |
| Theme assignments | Post/theme pairs; one post may have several |
| Community aliases | Distinct supplied labels attached to those posts |
| Author aliases | Distinct supplied author labels |
| Activity count | A supplied active-account measure with its own scope |

No alias count establishes independent people or independent upstream sources. The source importer must explain its sampling and account definitions. A pool quote reserve is not market-wide liquidity.

## Time

All stored record times use ISO UTC with milliseconds. Current interval: `(cutoff - window, cutoff]`. Previous interval: `(cutoff - 2*window, cutoff - window]`. Whole-hour windows from 1 to 24 are accepted. One-hour bins partition the current interval exactly.

The default analysis clock is the latest supplied post or activity timestamp. The UI allows an explicit cutoff. A dataset with no timestamps needs an explicit clock through the analysis API.

## Interpretation

The local phase and count summaries are rule outputs. The optional model is asked to interpret source content, preserve boundaries and cite supplied IDs. A citation validator checks membership, not whether the text follows logically from the cited evidence. Returned interpretations remain drafts.
