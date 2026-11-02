# A packet and its bytes

A research receipt includes the full selected packet, SHA-256 digest, algorithm, exact encoding label and scope. The hash input is UTF-8 `JSON.stringify(packet)` without a trailing newline.

The encoding preserves JavaScript property insertion order and array order. Reordering object properties can change the digest even if a reader considers the JSON equivalent. It is not a canonicalisation standard.

```sh
node cli.mjs verify reference-receipt.json
```

Verification checks the declared receipt/packet schemas, algorithm, encoding and digest equality. Editing a count, source record or scope field inside the packet changes its digest.

The digest does not establish author identity, source authenticity, model correctness, a trusted timestamp or blockchain existence. Someone can replace the packet and recompute its digest. Keep trusted artifact copies or independently retained digests if replacement detection matters.

The provider response has its own result ID when supplied. That is separate from a local packet receipt. A prepared research view does not claim to be a completed provider result.
