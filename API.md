# Local research API

```js
import {readFile} from 'node:fs/promises';
import {analyse} from './analyse.mjs';
import {makePacket, makeReceipt} from './research.mjs';

const corpus = JSON.parse(await readFile('reference-corpus.json', 'utf8'));
const report = analyse(corpus, {
  asOf: '2026-11-02T12:00:00.000Z',
  windowHours: 6,
  activityMaxAgeHours: 2
});
const packet = makePacket(report, 'night-shift');
const receipt = await makeReceipt(packet);
console.log(packet.measurements, receipt.digest);
```

`analyse` validates the corpus before using it. `curate` and `themeMatches` are lower-level helpers intended for already validated records. `selectTheme` rejects an unknown theme ID.

## CLI

```sh
node cli.mjs list reference-corpus.json
node cli.mjs packet reference-corpus.json night-shift
node cli.mjs brief reference-corpus.json night-shift
node cli.mjs receipt reference-corpus.json night-shift
node cli.mjs verify reference-receipt.json
```

The optional fourth argument for list/packet/brief/receipt is a UTC cutoff after the theme ID. Relative input paths resolve beside the script; absolute paths work through file URL resolution. AI result output paths resolve from the current working directory.

Model interpretation uses a separate adapter accepting `apiKey`, `model` and an injectable fetch implementation for tests. It never obtains credentials from the browser.
