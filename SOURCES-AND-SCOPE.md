# Source references are evidence pointers

A post includes an ID, community alias, author alias, ISO UTC timestamp, body, kind, origin and source reference. Original bodies must contain text after normalisation. Explicit reposts also name `repostOf`.

Source references can point to a user export row or a provider's record identifier. They are not followed by the core. `example`, `user` and `external` are supplied origin labels, not authenticated claims about provenance.

## Account and community identity

An author alias is a string. It is not a verified person. A community alias is a declared label, not proof of membership, independent ownership or a real mint association. Use a separately documented identity/mint registry if you need those mappings.

The reference labels and posts are fictional, authored specifically for this project. No actual X handle, endorsement, token contract or network transaction is asserted. The UI presents source cards in Memely's own layout, not as fabricated screenshots of another service.

## Prompt boundaries

Post text is untrusted source content. The AI instructions explicitly treat it as data. The adapter does not grant tools or ask the model to browse links. Citation checking only verifies that a referenced ID belongs to the supplied packet; a person still needs to assess the meaning.

## Public output

Research packets include full current and prior theme source text plus joined activity observations. Review private material before sharing a file or sending it to a model provider. The local app itself fetches only project files from its own server, or uses embedded data offline.
