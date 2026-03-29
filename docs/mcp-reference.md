# MCP API Reference

## Connection

- **Endpoint:** `https://api-staging.moverly.com/mcpService/mcp`
- **Transport:** Streamable HTTP (MCP 2025-06-18 spec)
- **Auth:** Bearer token with PAT (`mvly_pat_...`)

## Tools

### Transaction Discovery

#### `moverly_list_transactions`

List transactions accessible to your organisation.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | string | No | Filter: "active" (non-cancelled, default), "For sale", "Under offer", "Sold subject to contract", "Completed", "Cancelled", "all" |
| limit | integer | No | Max results (default 20, max 100) |

Returns: transactions with address, status, participants, riskSummary, readiness (form completion, searches, IDV status), showing/totalAvailable counts.

---

### State & Claims

#### `moverly_get_state`

Get the composed PDTF state for a transaction — the current view of all verified data.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |

Returns: full PDTF state object filtered by your role's access level. Claims with `confidential` terms_of_use are excluded unless you're in the allowed roles.

#### `moverly_get_status`

Quick status overview of a transaction.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |

Returns: address, status, callerRole, riskSummary (flag counts by severity), participants.

#### `moverly_get_claims`

Get verified claims with full provenance — who provided each data point, when, and how.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |
| path | string | No | PDTF path prefix filter |
| source | string | No | Filter: "collector", "participant", "document", "all" (default) |
| since | string | No | ISO datetime — only claims after this time |

Returns: array of claims with verification evidence (trust framework, voucher identity, electronic record sources, attachments).

#### `moverly_get_provenance`

Trace the evidence chain for a specific PDTF path — every claim that contributed to the current value.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |
| path | string | Yes | PDTF path to trace |

Returns: chronological list of claims affecting that path with full provenance.

---

### Risk Intelligence

#### `moverly_get_insights`

Get Diligence Engine risk analysis — flags sorted by severity with evidence trails and recommended actions.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |
| minRisk | integer | No | Minimum risk score (1-10) |
| evidenceBasis | string | No | Filter: "data-driven", "evidence-incomplete", "no-data", "clear" |

Returns per flag: category, check, scenario, riskScore (1-10), evidenceBasis, rationale, legalContext, legalContextUrls, evidencePaths (which claims contributed), and actions (with targetPath for resolution).

**Evidence basis meanings:**
- `data-driven` — Definitive finding based on sufficient evidence
- `evidence-incomplete` — Some data present but not enough for definitive assessment
- `no-data` — No information available to evaluate
- `clear` — Evaluated and ruled out (no issue found)

#### `moverly_get_risk_history`

Historical risk timeline for a transaction.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |

---

### Actions

#### `moverly_vouch`

Submit verified data against the PDTF schema. The agent attests to the data's accuracy.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |
| path | string | Yes | PDTF path (e.g. `/propertyPack/alterationsAndChanges/hasStructuralAlterations`) |
| data | object | Yes | Data conforming to the schema at that path |

The server validates against the PDTF schema with strict `additionalProperties: false`. Returns detailed validation errors on failure. Triggers Diligence Engine re-evaluation.

Use `describe_path` first to understand the expected schema, including discriminator/oneOf conditional fields.

#### `moverly_upload_document`

Upload a document for classification and analysis.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |
| fileContent | string | Yes | Base64-encoded file content |
| fileName | string | Yes | File name with extension |
| mimeType | string | No | MIME type |
| pdtfPath | string | No | PDTF schema path for document linking |
| description | string | No | Description |

Triggers: file classifier → document summariser → claims extraction → DE re-evaluation. Use `get_queue` to monitor processing progress.

When `pdtfPath` is provided, the document is linked to that schema location. When a flag action specifies a `targetPath` and `documentTypes`, uploading with that pdtfPath helps resolve the flag.

#### `moverly_handle_flag`

Manage a risk flag (acknowledge, dismiss with reason, etc.)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |
| flagId | string | Yes | Flag ID |
| action | string | Yes | Action to take |

---

### Enquiries

#### `moverly_raise_enquiry`

Raise a new enquiry on a transaction, optionally linked to a risk flag.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |
| subject | string | Yes | Enquiry subject |
| messageText | string | Yes | Enquiry message |
| destinationRole | string | Yes | Target role (e.g. "Seller's Conveyancer") |
| relatedFlagId | string | No | Link to a specific risk flag |
| pdtfPath | string | No | PDTF path hint for where resolution data should go |

#### `moverly_list_enquiries`

List enquiries for a transaction.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |
| status | string | No | Filter: "pending", "open", "resolved", "all" |
| direction | string | No | "raised" (by you) or "received" (to you) |

#### `moverly_respond_enquiry`

Respond to an existing enquiry. Can update status and add resolution conditions.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |
| enquiryKey | string | Yes | Enquiry ID |
| messageText | string | Yes | Response message |
| status | string | No | Update status: "open", "resolved", "resolvedWithCondition" |
| resolutionCondition | string | No | Condition text (when status is "resolvedWithCondition") |
| pdtfPath | string | No | PDTF path hint |

---

### Forms

#### `moverly_get_form_progress`

Get completion status for all applicable property information forms.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |

Returns: per-form completion percentage, overlay in use, per-section status (complete/incomplete/not-started) with validation error counts.

#### `moverly_describe_form_path`

Get the schema for a specific form section, filtered to only the fields required by the transaction's overlay.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |
| path | string | Yes | PDTF path for the form section |

Returns: filtered schema with form reference numbers (e.g. "5.1b"), discriminator/oneOf for conditional fields, strict validation rules.

---

### Schema

#### `moverly_describe_path`

Get the PDTF subschema at any path — titles, types, required fields, enums.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| path | string | Yes | PDTF path |

Returns: strict schema with `additionalProperties: false` at every level. Use before `vouch` to understand what data shape is expected.

#### `moverly_list_overlays`

List available PDTF schema overlays and their effects.

---

### Monitoring

#### `moverly_get_queue`

Check document processing and collector status.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| transactionId | string | Yes | Transaction ID |

Returns: processing items grouped by state (available/running/settled), document classification and summarisation progress.

---

## Error codes

| Code | Meaning |
|------|---------|
| -32600 | Invalid request |
| -32601 | Tool not found / not yet implemented |
| -32602 | Invalid parameters |
| -32000 | Transaction not found |
| -32001 | Access denied |
| -32002 | Schema validation failed (vouch) |
| -32003 | Rate limited |
