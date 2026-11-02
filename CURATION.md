# Repeat filtering

Source records are sorted by admitted timestamp, then ID. Explicit reposts are excluded from the retained-original set and preserve their referenced original ID. Their references must exist, name an original and not come from the future relative to the repost.

For other posts, Memely normalises the body with Unicode NFKC, lowercasing, URL removal, replacement of non-letter/non-number runs with spaces and whitespace collapse. The first eligible original for each resulting body is kept; later exact normalised copies are excluded with its ID attached.

This curation is global across eligible history before time windows are formed. A copy of an old post does not become a new original simply because the first occurrence is outside the selected window.

## Scope

This filter does not detect semantic paraphrases, near copies, images, coordinated campaigns or bot accounts. It does not establish author identity or prove an original creative source. Removing URLs can collapse two otherwise identical posts that linked to different material; keep that tradeoff in mind when importing a corpus.

The reference edition has 52 source records: 47 retained originals, two normalised duplicate exclusions and three explicit repost exclusions. The exclusions stay inspectable in Repeat filter and the original source export.

## Sampling

Document collection intervals, platform source, search terms, missing pages, selected communities and any pre-filtering in your own source notes. Memely's counters describe the input provided, not coverage beyond it.
