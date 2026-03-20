---
name: moverly-connect
description: "Connect to Moverly's property intelligence MCP server. Use when: listing property transactions, checking transaction status, viewing PDTF state or claims, querying Moverly data, looking up a property address, uploading documents for analysis, checking processing queue status, or any interaction with the Moverly platform. Triggers on: 'transactions', 'property status', 'PDTF state', 'Moverly', 'what transactions do I have', 'show me the property', 'claims', 'upload document', 'processing status', 'queue', address lookups. NOT for: interpreting risk flags, explaining diligence findings, or drafting enquiries (use moverly-diligence). NOT for: guided multi-document upload workflows (use moverly-upload)."
---

# Moverly Connect

MCP JSON-RPC over Streamable HTTP. PAT auth.

## Setup

- PAT: `~/.openclaw/credentials/moverly-staging-pat` (format: `mvly_pat_<64hex>`)
- Endpoint: `https://api-staging.moverly.com/mcpService/mcp`
- Override with env vars: `MOVERLY_MCP_ENDPOINT`, `MOVERLY_PAT_FILE`

## Making Calls

All MCP calls go through `scripts/mcp-call.sh`:

```bash
# Initialize session (required first call)
scripts/mcp-call.sh initialize '{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"openclaw","version":"1.0"}}'

# Call a tool
scripts/mcp-call.sh tools/call '{"name":"moverly_list_transactions","arguments":{"status":"all"}}'

# Parse tool result (results are JSON inside JSON-RPC envelope)
scripts/mcp-call.sh tools/call '...' | jq -r '.result.content[0].text' | jq .
```

## Phase 1 Tools (live)

### moverly_list_transactions
```bash
scripts/mcp-call.sh tools/call '{"name":"moverly_list_transactions","arguments":{"status":"all","limit":20}}'
```
- `status`: active | completed | all (default: active — note: staging transactions are "For sale" not "active", use "all")
- `limit`: default 20
- Returns: `{transactions: [{id, address, status, callerRole, participants, riskSummary, updatedAt}]}`

### moverly_get_status
Transaction overview: address, participants, risk summary counts.
```bash
scripts/mcp-call.sh tools/call '{"name":"moverly_get_status","arguments":{"transactionId":"<id>"}}'
```

### moverly_get_state
Full PDTF state — all verified claims, EPC, flood, planning, title, searches. Large response.
```bash
scripts/mcp-call.sh tools/call '{"name":"moverly_get_state","arguments":{"transactionId":"<id>"}}'
```

### moverly_get_insights
Diligence engine flags: 37 categories, 323 checks, 2,215 scenarios.
```bash
scripts/mcp-call.sh tools/call '{"name":"moverly_get_insights","arguments":{"transactionId":"<id>","evidenceBasis":"data-driven","minRisk":5}}'
```
- `evidenceBasis`: data-driven | evidence-incomplete | no-data | clear (filter to evidenced flags)
- `minRisk`: 1-10 (minimum risk score)
- Returns: `{insights: [{category, check, title, riskScore, evidenceBasis, description, actions}], summary: {totalFlags, byRisk, byEvidence}}`

## Phase 2 Tools (live)

### moverly_upload_document
Upload a document for AI-powered analysis. Pipeline: classify → summarise → extract claims → DE re-evaluation.
```bash
# Base64-encode a PDF and upload
FILE_B64=$(base64 -w0 document.pdf)
scripts/mcp-call.sh tools/call "{\"name\":\"moverly_upload_document\",\"arguments\":{\"transactionId\":\"<id>\",\"fileContent\":\"${FILE_B64}\",\"fileName\":\"title-register.pdf\"}}"
```
- `fileContent`: base64-encoded file (required, max 30MB)
- `fileName`: original filename with extension (required)
- `mimeType`: optional, inferred from extension if omitted
- `description`: optional, human-readable note
- Returns: `{fileId, fileName, mimeType, sizeBytes, status: "processing"}`

### moverly_get_queue
Check processing status after upload. Poll until pending reaches 0.
```bash
scripts/mcp-call.sh tools/call '{"name":"moverly_get_queue","arguments":{"transactionId":"<id>"}}'
```
- Returns: `{summary: {totalItems, pending, completed, classifying, summarising}, pending: [...], recentlyCompleted: [...]}`

### Upload → Insights workflow
1. Upload document → get fileId
2. Poll get_queue until `summary.pending === 0`
3. Call get_insights to see updated risk picture
4. Check `evidenceBasis: "data-driven"` flags for new findings

### moverly_describe_path
Get the strict JSON subschema at any PDTF path. Essential before calling `vouch` — tells the agent exactly what shape of data to submit.
```bash
scripts/mcp-call.sh tools/call '{"name":"moverly_describe_path","arguments":{"path":"/propertyPack/alterationsAndChanges","overlay":"ta6ed6"}}'
```
- `path`: PDTF schema path starting with / (required)
- `overlay`: optional form overlay (e.g. `ta6ed6`, `baspiV5`) — adds `required` constraints
- Returns: `{path, title, hierarchy, schema, overlay, note}`

**Schema behaviour notes:**
- Returned schema has `additionalProperties: false` at every object level — only declared properties accepted
- Uses `discriminator` and `oneOf` clauses for conditional dependencies — the valid shape changes based on higher-level property values (e.g. answering "Yes" to a knotweed question means a details object becomes required)
- `required` arrays are only populated when an overlay is specified (e.g. `ta6ed6` makes TA6 form fields mandatory). Without an overlay, the shape is permissive on which fields are present
- Properties with `enum: ["Attached", "To follow", "Not applicable"]` indicate document attachment points. If setting `"Attached"`, also upload the document via `moverly_upload_document` with the `pdtfPath` parameter pointing to the attachment location

### moverly_vouch
Submit verified data at a PDTF path. Validates strictly against the schema — no additional properties allowed.
```bash
scripts/mcp-call.sh tools/call '{"name":"moverly_vouch","arguments":{"transactionId":"<id>","path":"/propertyPack/specialistIssues/japaneseKnotweed","value":{"hasKnotweed":"Yes","knotweedDetails":"..."},"overlay":"ta6ed6"}}'
```
- `transactionId`: required
- `path`: PDTF schema path (required)
- `value`: data matching the schema at that path (required) — call `describe_path` first to know the shape
- `overlay`: optional, applies overlay-specific required field validation
- `confidentialityLevel`: public | restricted (default) | confidential
- ✅ Returns: `{status: "accepted", callerRole, message}` — triggers DE re-evaluation
- ❌ Returns: `{isError: true}` with up to 10 human-readable validation errors and paths

### Describe → Vouch workflow
The core data collection loop for agents:
1. Get insights → find a flag with `evidenceBasis: "evidence-incomplete"` and an action with `targetPath`
2. Call `describe_path` with that `targetPath` (and overlay if applicable) → understand required shape
3. Collect data from the user following the schema's discriminator/oneOf structure — ask follow-up questions when conditional fields apply
4. If the schema includes attachment properties being set to `"Attached"`, upload the document first via `upload_document` with `pdtfPath`
5. Call `vouch` with the collected data → validates and submits
6. Call `get_insights` again → check if the flag resolved or moved to a different evidenceBasis

### moverly_upload_document (with pdtfPath)
When uploading a document that relates to a specific PDTF path (e.g. a knotweed survey for `/propertyPack/specialistIssues/japaneseKnotweed/attachments`), include the `pdtfPath` parameter. This creates a vouch-attributed document claim linking the file to the schema location:
```bash
FILE_B64=$(base64 -w0 knotweed-survey.pdf)
scripts/mcp-call.sh tools/call "{\"name\":\"moverly_upload_document\",\"arguments\":{\"transactionId\":\"<id>\",\"fileContent\":\"${FILE_B64}\",\"fileName\":\"knotweed-survey.pdf\",\"pdtfPath\":\"/propertyPack/specialistIssues/japaneseKnotweed/attachments\"}}"
```
The document claim will include full vouch provenance (attestation by the uploading user) rather than generic upload provenance.

## Error Codes

| Code | Meaning |
|------|---------|
| -32602 | Invalid params (missing required field) |
| -32601 | Tool not yet implemented |
| -32000 | Transaction not found |
| -32001 | Access denied |
| -32003 | Rate limited (1,000 req/hour) |
