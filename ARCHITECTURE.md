# Memely's research pipeline

| Module | Owns |
|---|---|
| `corpus.mjs` | Validation, normalisation, repeat curation and phrase matches |
| `analyse.mjs` | Windows, counts, phases, source-backed graph edges and activity joins |
| `research.mjs` | Packets, local briefs, receipts and citation membership |
| `ai-adapter.mjs` | Explicit xAI request and returned-output validation |
| `ai-cli.mjs` | Account credentials from environment and local result file |
| `draw.mjs` | Newsroom colour, type, shapes and charts |
| `screens.mjs` | Twelve compositions receiving calculated state |
| `app.mjs` | Browser controls, text alternatives, storage and exports |

## Data ownership

The corpus is the input record. Analysis creates derived objects without modifying it. The selected theme packet includes all retained current and prior theme posts and relevant activity rows. A model response is a separate interpretation artifact, not a new observed source.

The browser stores one corpus locally, validates imports before replacement and uses a generation counter to avoid showing an older asynchronous receipt after a newer request. Exports are portable files owned by the user.

## Runtime routes

Source mode serves modules and JSON from a loopback read-only server. The standalone builder wraps modules in closures and resolves this repository's named imports in dependency order. The offline HTML embeds code, styles, reference data and artwork.

The model adapter is outside the browser bundle. Opening the desk cannot expose an API credential or start a paid inference request. Provider transport only runs through the explicit CLI.

## Rendering

Native figures call the same Canvas drawing functions as the interface. Their numbers come from calculated state. Captured figures are not model-generated dashboard mockups or screenshots of another service.
