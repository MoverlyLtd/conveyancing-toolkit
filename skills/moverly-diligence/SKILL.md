---
name: moverly-diligence
description: "Property risk intelligence and diligence analysis via Moverly's deterministic engine. Use when: analysing property risks, explaining risk flags, interpreting diligence findings, summarising what needs attention on a transaction, drafting enquiries from flags, explaining issues in plain English to buyers or sellers, comparing risk across a caseload, identifying what blocks exchange, or monitoring transaction progress. Triggers on: 'risk flags', 'what are the issues', 'any problems', 'diligence', 'risk analysis', 'what needs attention', 'explain this flag', 'draft an enquiry', 'what's blocking', 'portfolio risk', 'caseload'. Requires moverly-connect skill for MCP access."
---

# Moverly Diligence

Interpret risk intelligence from the deterministic diligence engine (37 categories, 323 checks, 2,215 scenarios). Depends on `moverly-connect` for MCP calls.

## Evidence Basis — the key concept

Every flag has an `evidenceBasis`. Default to showing only evidenced flags:

| Basis | Meaning | Show by default? |
|-------|---------|-----------------|
| `data-driven` | Definitive finding from verified data | ✅ Yes |
| `evidence-incomplete` | Partial data, needs more info | ✅ Yes |
| `no-data` | Nothing available to assess | ❌ Noise |
| `clear` | Checked, no issues | ❌ Unless asked |

## Risk Scores

- 🔴 Critical (9-10): Must resolve before exchange
- 🟠 High (7-8): Significant, may need specialist input
- 🟡 Moderate (4-6): Notable, manageable with action
- 🟢 Low (1-3): Minor or informational

For full category details → read `references/flag-categories.md`.

## Fetching Insights

Use moverly-connect's `mcp-call.sh`:

```bash
MCP=~/.openclaw/skills/moverly-connect/scripts/mcp-call.sh

# Definitive findings
$MCP tools/call '{"name":"moverly_get_insights","arguments":{"transactionId":"<id>","evidenceBasis":"data-driven"}}' | jq -r '.result.content[0].text' | jq .

# Gaps needing follow-up
$MCP tools/call '{"name":"moverly_get_insights","arguments":{"transactionId":"<id>","evidenceBasis":"evidence-incomplete"}}' | jq -r '.result.content[0].text' | jq .

# High-risk only
$MCP tools/call '{"name":"moverly_get_insights","arguments":{"transactionId":"<id>","minRisk":7}}' | jq -r '.result.content[0].text' | jq .
```

Or use the helper: `scripts/get-insights.sh <transactionId> [evidenceBasis] [minRisk]`

## Presenting Flags

Lead with plain English, not category codes. Pattern:

> 🔴 **Short lease — 68 years remaining** (risk: 10/10)
> Most lenders won't lend below 70-80 years and the value drops significantly. The seller should start a Section 42 lease extension or assign the benefit to the buyer. Must resolve before exchange.

For each flag: risk colour + plain description → why it matters → what happens next → who acts (from `canExecute`).

## Workflow Recipes

**"What needs attention?"**
1. `get_status` → overview + risk summary counts
2. `get_insights` with `evidenceBasis: "data-driven"` → definitive issues
3. `get_insights` with `evidenceBasis: "evidence-incomplete"` → gaps
4. Combine, sort by risk descending, group by theme

**"Explain to a buyer"**
Same as above but translate each flag: what it means for them, what happens next, who handles it.

**"What's blocking exchange?"**
`get_insights` with `minRisk: 7` → list unresolved actions as a checklist with owners.

**"Compare my caseload"**
`list_transactions` → for each, `get_status` gives `riskSummary` → sort by total risk score.

## Drafting Enquiries

When a flag suggests raising an enquiry:
1. Read the flag's `actions` array for specific data needed
2. Use `targetPath` (PDTF schema path) for precision
3. Draft in professional conveyancing language
4. State what evidence would resolve the flag
