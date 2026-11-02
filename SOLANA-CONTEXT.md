# The activity layer

Each activity row names a community alias and source, records an observation time and origin, and supplies a quote reserve in SOL and active-account count. These are already prepared aggregates. The shipped app does not call RPC, decode pool accounts or reconstruct participation from signatures.

## Selection and freshness

For each labelled community, select the latest row at or before the cutoff. Select a baseline at or before the current-window start. Timestamp ties use record ID order. Age is cutoff minus latest observation time.

Default maximum age is two hours. Equality is fresh. A later age is stale, and both account change and reserve change are withheld. No baseline also withholds changes. The latest old record stays visible; it is not relabelled as current.

## Input definitions that matter

- Identify the actual pool and quote asset before calling a value a SOL reserve.
- Explain the active-account measurement window and inclusion rules.
- Preserve the source's observation clock and missing-data states.
- Do not equate token accounts, transaction counts, wallets and independent people.
- Do not infer reserve withdrawals or market-wide liquidity from one balance change alone.

Solana's `getSignaturesForAddress` returns signature information for transactions referencing an address. A signature list is not a unique-owner census or a pool decoder. [Primary reference](REFERENCES.md).

The reference corpus uses fictional pool labels and authored aggregate records. A real adapter must document its own coverage and successful operation before its outputs can be described as a connected feed.
