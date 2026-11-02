# Optional Grok interpretation

The local desk works without an account. The explicit AI CLI sends one selected theme's research packet to xAI's Responses endpoint. It does not collect social posts, follow links or execute trades.

## Configure locally

Set `XAI_API_KEY` to your own account credential and `MEMELY_MODEL` to a model identifier that your account supports. The project intentionally has no default model name.

PowerShell:

```powershell
$env:XAI_API_KEY = 'YOUR-KEY'
$env:MEMELY_MODEL = 'YOUR-AVAILABLE-MODEL'
node ai-cli.mjs reference-corpus.json night-shift local-ai-research.json
```

Bash:

```sh
export XAI_API_KEY='YOUR-KEY'
export MEMELY_MODEL='YOUR-AVAILABLE-MODEL'
node ai-cli.mjs reference-corpus.json night-shift local-ai-research.json
```

Keep credentials outside GitHub and screenshots. The browser has no credential field and makes no model request. The returned file defaults to a local filename excluded from normal source uploads.

## Request contract

`ai-adapter.mjs` uses a fixed HTTPS xAI endpoint, separates system instructions from packet content, sends `store: false`, sets a 2,000 output-token request budget and a 30-second timeout. The local adapter rejects packet strings above 150,000 characters. It checks HTTP status, completion status and a post-read response-size limit before parsing output.

The response must be JSON with title, summary, one to eight source-cited observations and up to eight research questions. Unknown IDs and malformed shape are rejected. No model-side browsing or tools are requested. Provider billing and account capabilities apply to an explicit request.

## Verification boundary

The release tests the contract with mocked responses, including HTTP errors, incomplete output and invalid citations. A credentialed live inference was not run while preparing the package. A completed local mock test is not a provider receipt. Actual CLI results record the returned response ID when supplied.

For a file-based research workflow in your Grok Bot account, see [operator instructions](GROKBOT-OPERATOR.md) and [review task](GROKBOT-REVIEW.md).
