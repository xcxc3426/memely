# Security scope

The local server is loopback-only and read-only. The browser has no credential field or external account connection. Imported source content is rendered as text nodes and Canvas, not executable HTML.

The AI adapter runs only through an explicit CLI action. It uses a fixed provider HTTPS endpoint, environment credentials, bounded evidence/output handling and a timeout. HTTP failures report status rather than echoing provider response bodies. It requests no browsing tools.

Source text remains untrusted data. The system instruction says to ignore instructions embedded in it. The citation validator rejects unknown IDs, but cannot establish that a claim is semantically true. Review returned interpretation before publication or reuse.

Receipt hashes check local bytes, not source authenticity. Source origin fields are labels. Keep credentials and private corpus files out of public repositories. Report a concrete vulnerability privately to the repository owner's selected channel with a minimal reproduction and affected version.
