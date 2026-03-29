# Architecture — How It All Fits Together

## Three layers

```
┌─────────────────────────────────────────────────────┐
│                    AI Agent                          │
│        (Claude Code / Cowork / OpenClaw)             │
│                                                      │
│  Reads SKILL.md → understands capabilities →         │
│  calls tools → presents results                      │
└───────────┬──────────────────┬───────────────────────┘
            │                  │
    ┌───────▼───────┐  ┌───────▼────────┐
    │  Standalone   │  │  Moverly MCP   │
    │   Skills      │  │   Server       │
    │               │  │                │
    │ • SDLT calc   │  │ • 19 tools     │
    │ • Lender HB   │  │ • PAT auth     │
    │ • Protocols   │  │ • Streamable   │
    │ • Citations   │  │   HTTP         │
    └───────────────┘  └───────┬────────┘
                               │
                    ┌──────────▼──────────┐
                    │  Diligence Engine   │
                    │                     │
                    │ • 37 categories     │
                    │ • 323 checks        │
                    │ • 2,215 scenarios   │
                    │ • Deterministic     │
                    │ • <1ms evaluation   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   PDTF State        │
                    │                     │
                    │ • Verified claims    │
                    │ • Full provenance   │
                    │ • Role-based access  │
                    │ • Evidence chains   │
                    └─────────────────────┘
```

## Standalone skills

These run entirely within the AI agent — no external API, no account needed. They're self-contained instructions and scripts that the agent reads and executes.

**How they work:**
1. Agent reads `SKILL.md` — this is the instruction manual
2. SKILL.md tells the agent what it can do, what inputs it needs, and how to present results
3. Some skills include helper scripts (e.g. `sdlt-calc.sh` for deterministic calculations)
4. Some include reference data (e.g. `references/lenders/*.md` for Part 2 requirements)

**Examples:** SDLT calculator, lender pre-screen, protocol checklists, property law reference.

## Moverly MCP Server

The MCP (Model Context Protocol) server exposes Moverly's transaction intelligence as 19 tools that any AI agent can call over HTTP.

**Connection:** Single endpoint at `https://api-staging.moverly.com/mcpService/mcp` (staging) using Streamable HTTP transport. Authentication via Personal Access Token (PAT) in the Authorization header.

**How it works:**
1. Agent initialises MCP connection (JSON-RPC handshake)
2. Agent discovers available tools via `tools/list`
3. Agent calls tools with structured arguments
4. Server validates input, checks role-based access, queries Firestore, runs the Diligence Engine
5. Results returned as structured JSON with full provenance

### Tool categories

| Category | Tools | Purpose |
|----------|-------|---------|
| Discovery | `list_transactions` | Find and filter transactions |
| State | `get_state`, `get_status`, `get_claims`, `get_provenance` | Read transaction data |
| Intelligence | `get_insights`, `get_risk_history` | Risk analysis and flags |
| Actions | `vouch`, `upload_document`, `handle_flag` | Write verified data |
| Enquiries | `raise_enquiry`, `list_enquiries`, `respond_enquiry` | Manage enquiries |
| Forms | `get_form_progress`, `describe_form_path` | PDTF form completion |
| Schema | `describe_path`, `list_overlays` | PDTF schema introspection |
| Monitoring | `get_queue` | Processing status |

## Diligence Engine

The core intelligence — a deterministic rule engine that evaluates property risk across 37 categories. Not an LLM. Not probabilistic. Every scenario has a defined set of inputs, conditions, and outputs.

**Key properties:**
- **Deterministic:** Same data → same flags, every time
- **Provenance:** Every flag includes `evidencePaths` (which PDTF claims were evaluated) and `legalContext` (the legal basis)
- **Evidence basis:** Each flag is classified as `data-driven` (definitive finding), `evidence-incomplete` (partial data), `no-data` (nothing to evaluate), or `clear` (ruled out)
- **Actions:** Each flag includes recommended actions with `targetPath` (the PDTF schema location where resolution data should be provided) and `canExecute` hints

## PDTF (Property Data Trust Framework)

The data standard underpinning everything. PDTF defines the schema for structured property data — from addresses and title information to seller disclosures and search results.

**Key concepts:**
- **Claims:** Verified data points with provenance (who provided it, when, how it was verified)
- **State:** The composed view of all claims for a transaction (latest value per path)
- **Overlays:** Schema extensions that define which fields are required for specific contexts (e.g. TA6 Edition 6 requires certain seller disclosure fields)
- **Terms of use:** Per-claim access control (public, restricted, confidential)

## Data flow: upload to resolution

```
Document uploaded via MCP
        │
        ▼
File classifier (AI) → determines document type
        │
        ▼
Document summariser (AI) → extracts structured data
        │
        ▼
Claims mapper → writes PDTF claims with provenance
        │
        ▼
Diligence Engine re-evaluates all 37 categories
        │
        ▼
Flags updated (some resolved, some new)
        │
        ▼
Agent calls get_insights → sees updated risk picture
```

The whole pipeline is automatic. Upload a search result and the flags are updated with the new intelligence within minutes.
