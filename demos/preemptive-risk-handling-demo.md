# Pre-emptive Risk Handling Demo — Claude Cowork

## Setup

1. Open Claude Cowork (claude.ai)
2. Connect the Moverly MCP server:
   - Settings → Connectors → Moverly (should already be configured)
3. Start a new conversation
4. Paste the prompt below to begin

---

## Demo Prompt

Paste this into a new Cowork conversation:

---

You have the Moverly MCP server connected. We're going to walk through pre-emptive risk handling on a live transaction. Do not ask for confirmation at any step; just proceed directly to execute all steps and narrate what you are doing.

**Step 1: Find the demo transaction and check risks**

Find a transaction using `moverly_list_transactions` (look for "10 Downend Park" or another suitable property that has high risks, e.g., transaction ID `VsiDBwzgVw9WMpk5r76aqu` or `D2YHMFAZ4n8oJ3puvxUjqA`).
Once you have the ID, call `moverly_get_insights` with `evidenceBasis: ["data-driven", "evidence-incomplete"]` to see the current risk profile. Show me the top 2 actionable flags that require either a document upload or a data vouch.

**Step 2: Snapshot the timestamp**

Note the current time — we'll use this to reset after the demo. Store it as the "demo start" timestamp.

**Step 3: Pre-emptively fix a data risk (Vouch)**

Find a flag in the insights related to missing building regulations, an EPC, or a similar data-driven finding. Use the `targetPath` from the flag's suggested action.
Use `moverly_describe_path` on that path to understand the required JSON schema.
Then, call `moverly_vouch` to submit a "Yes" or equivalent compliant value at that path (e.g. confirming FENSA certificates or building regs are available). 

**Step 4: Pre-emptively fix a document risk (Upload)**

Find another flag that requires a document upload (e.g. an electrical safety certificate or a completion certificate).
Generate a tiny valid base64 PDF string (e.g. `%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<< /Size 1 /Root 1 0 R >>\n%%EOF` base64 encoded).
Call `moverly_upload_document` to upload this dummy file as the required document. Use the `targetPath` from the flag's suggested action as the `pdtfPath`. Wait a few seconds, then poll `moverly_get_queue` to verify it is processing or complete.

**Step 5: Verify resolution**

Call `moverly_get_insights` again with `evidenceBasis: ["data-driven", "evidence-incomplete"]`. 
Compare the new insights to the baseline from Step 1. Show me how the risk profile has changed and confirm the flags we targeted have dropped in severity or resolved completely.

**Step 6: Reset for next demo**

Use `moverly_delete_claims_after` with the "demo start" timestamp from Step 2, in `dryRun: false` directly to clean up our test vouches and documents.

Finish with a brief debrief on how pre-emptive actions immediately affect the Diligence Engine's risk scores.

---

## What This Demonstrates

1. **Pre-emptive Action** — Handling risks via direct data vouching and document upload before an enquiry is ever raised.
2. **Instant Re-evaluation** — Showing how the Diligence Engine updates risk scores in real-time as soon as structured data or classified documents hit the state.
3. **Agent Autonomy** — The agent autonomously uses `describe_path` to understand data structures and shapes valid `vouch` payloads.
4. **Document Pipeline** — Uploading a document via `upload_document` triggers the async processing queue, resolving flags that expect document evidence.
5. **Demo reset** — Clean state for repeated demonstrations using timestamp-based claim deletion.

## Expected MCP Calls

| Step | Tool | Count |
|------|------|-------|
| 1 | `list_transactions`, `get_insights` | 2 |
| 3 | `describe_path`, `vouch` | 2 |
| 4 | `upload_document`, `get_queue` | 2 |
| 5 | `get_insights` | 1 |
| 6 | `delete_claims_after` | 1 |
| **Total** | | **8 calls** |
