# Rebuild Memely

Prepared with Node.js 24.22.1. Source targets Node.js 20+ and browsers with Web Crypto. Core runtime, source generation, tests, receipts and offline build use no third-party package.

```sh
npm run data
npm run build
npm test
npm run check
```

`reference.mjs` writes an authored deterministic corpus and selected research packet, receipt and brief. The reference records are not obtained from a network call. Preserve exact source JSON and runtime conventions when comparing historic bytes.

## Optional native figures

```sh
npm install --no-save --package-lock=false @napi-rs/canvas
npm run screenshots
```

The capture tool uses local DejaVu Sans and Sans Mono fonts, including bold variants. Set `MEMELY_FONT_DIR` to their directory. Set `MEMELY_CANVAS_MODULE` to an existing native renderer installation if needed. The default font directory is `/usr/share/fonts/truetype/dejavu`. Fonts and the optional renderer are not bundled.

Browser pixels can differ because of fonts and rendering engines. Native capture checks outer text boundaries and is followed by visual inspection. It does not establish cross-browser layout or accessibility by itself.

## Tests

Core tests check matching, repeat exclusions, cutoff boundaries, matrix/edge consistency, stale activity, absent baselines, receipt changes and source citation membership. AI adapter tests use mocked network responses; they are not live provider tests. The DOM harness executes the complete offline bundle and exercises views, a user post, imports, exports and invalid controls. It is not a browser layout engine.

## Package bytes

After deliberate changes, regenerate derived files, inspect them and run the checks. Then refresh the package manifest with `node manifest.mjs`. `npm run integrity` checks file coverage and hashes against that manifest. Local Git metadata and node_modules are not package files.
