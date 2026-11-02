# Source corpus contract

Envelope: `schema: memely/corpus/1`, name, origin (`example`, `user`, `mixed`), themes, communities, posts and activity.

## Bounds

One to six themes and one to six communities. Up to 5,000 posts and 2,000 activity rows. The browser imports at most 2 MiB; the AI adapter separately bounds its selected evidence string. Core text and numeric bounds are enforced by `validateCorpus`.

## Themes and communities

Themes: unique ID, name, description and one to twelve keyword phrases. Communities: unique ID, name and poolLabel. Names and aliases are supplied labels; a poolLabel does not prove a network address or mint association.

## Posts

Unique ID, known communityId, author alias, timestamp `at`, text, kind (`original`, `repost`), origin and source. Reposts also have `repostOf`, naming an original no later than the repost. Post bodies normalising to empty text are rejected.

## Activity

Unique ID, known communityId, timestamp, finite nonnegative quoteReserveSOL, nonnegative integer activeAccountCount, origin and source. Post and activity IDs must not collide, so packet citations remain unambiguous.

## Derived artifacts

`memely/research/1` carries a selected narrative, measurements, current and prior posts, activity joins, scope and prepared AI state. `memely/receipt/1` contains that packet and a local digest. `memely/interpretation/1` records returned model research separately.

JSON Schema documents describe envelope shapes. Runtime validation checks record relationships and domain rules. The project does not claim that a separate formal JSON Schema validator was executed.
