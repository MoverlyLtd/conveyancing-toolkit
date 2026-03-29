# Authentication

## Standalone skills — no auth needed

Skills like SDLT Calculator, Lender Pre-Screen, and Protocol Checklists work immediately with no account or API key.

## Moverly MCP — Personal Access Token (PAT)

For live transaction intelligence, you need a Moverly PAT.

### Generate a token

1. Log in to your Moverly account
2. Go to **Settings → API Access**
3. Click **Generate token**
4. Give it a label (e.g. "Claude Code")
5. Copy the token — it's shown once only

Tokens start with `mvly_pat_` followed by 64 hex characters.

### Configure Claude Code

Create `.mcp.json` in your project root or `~/.claude/.mcp.json`:

```json
{
  "mcpServers": {
    "moverly": {
      "url": "https://api-staging.moverly.com/mcpService/mcp",
      "headers": {
        "Authorization": "Bearer mvly_pat_your_token_here"
      }
    }
  }
}
```

### Configure Claude Cowork

1. Go to **Settings → Connectors → Add Custom Connector**
2. Enter the server URL
3. Use OAuth authentication (generate connector credentials from API Access page)
4. Claude Cowork will redirect through Moverly's OAuth flow

### Configure OpenClaw

Add to your `openclaw.yaml`:

```yaml
mcp:
  moverly:
    url: https://api-staging.moverly.com/mcpService/mcp
    transport: streamable-http
    headers:
      Authorization: "Bearer ${MOVERLY_API_TOKEN}"
```

Set the environment variable:
```bash
export MOVERLY_API_TOKEN=mvly_pat_your_token_here
```

### Token security

- Tokens are hashed (SHA-256) before storage — Moverly never stores the raw token
- Each token is scoped to your organisation
- Tokens can be revoked from the API Access page
- Rate limit: 1,000 requests per hour per token

### Verify your connection

Ask Claude: "List my Moverly transactions"

If connected correctly, you'll see your active transactions with addresses and status.
