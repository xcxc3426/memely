# Declared themes and visible associations

A theme has an ID, name, description and one to twelve keyword phrases. A corpus contains one to six themes. The text matcher applies the same normalisation to phrases and source text, then tests a complete phrase bounded by spaces.

For example, `night-shift` normalises to `night shift`. A `coffee` keyword matches a complete coffee token, not the substring in `scoffee`. Matching is literal and language-dependent; it does not infer sarcasm, a visual meme, an image character or a semantic paraphrase.

## Multiple assignments

An office-goose post mentioning the night shift can support both themes. Each assignment retains its matched phrases and source post ID. Counts are derived from those assignments; a map edge is the subset sharing one community alias.

## Local phases

| Phase | Declared rule |
|---|---|
| unobserved | Zero current retained matching originals |
| forming | At least one current match, below the next rules |
| spreading | At least three current matches in at least two community aliases |
| cross-community | At least five current matches in at least three community aliases |

Cross-community is checked before spreading. These are descriptive corpus labels, not calibrated adoption stages or predictions. A phase can change when the window, dictionary, source coverage or cutoff changes.

## Future semantic layer

The optional AI adapter interprets a selected theme packet; it does not alter the dictionary or graph. A future semantic assignment layer should emit proposed assignments with source references for review, keep its model/version and preserve disagreement with lexical assignments.
