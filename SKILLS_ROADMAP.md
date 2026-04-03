# Skills Roadmap

## Published ✅

| Skill | Tier | Type | Status |
|-------|------|------|--------|
| `agentic-diligence` | 1 — Transformational | Moverly | ✅ Live — the agentic diligence loop |
| `sdlt-calculator` | 2 — Reach-for | Standalone | ✅ Live — rates from 1 Apr 2025, daily GOV.UK check |
| `lease-impact-advisor` | 2 — Reach-for | Standalone | ✅ Live — risk bands, lender eligibility, marriage value |
| `lenders-handbook-prescreen` | 2 — Reach-for | Standalone | ✅ Live — Part 1 (90+ checks) + Part 2 (60+ lenders) |
| `aml-source-of-funds` | 2 — Reach-for | Standalone | ✅ Live — per-element evidence requirements |
| `building-regulations` | 2 — Reach-for | Standalone | ✅ Live — approval routes, enforcement, competent person |
| `restrictive-covenant-advisor` | 2 — Reach-for | Standalone | ✅ Live — s84 grounds, indemnity, modification |
| `lender-comparison` | 2 — Utility | Standalone | ✅ Live — parallel subagent lender checking |
| `pdtf-connector` | 2 — Moverly | Moverly | ✅ Live — 19 MCP tools (PDTF Level 1-3) |
| `moverly-diligence` | 2 — Moverly | Moverly | ✅ Live — risk intelligence + enquiry management |
| `report-on-title` | 2 — Moverly | Moverly | ✅ Live — Report on Title from PDTF state + DE flags |
| `enquiry-extractor` | 2 — Workflow | PDTF Standard | ✅ Live — extract enquiries from email text |
| `enquiry-renderer` | 2 — Workflow | PDTF Standard | ✅ Live — render open enquiries for counterparty |
| `enquiry-responder` | 2 — Workflow | PDTF Standard | ✅ Live — match responses to enquiries |
| `pdtf-path-resolver` | 2 — Utility | PDTF Standard | ✅ Live — map data subjects to PDTF schema paths |

## Retired ⏹️

Moved to `retired/`. Rationale: DE flags ARE the checklist; firm-level practice management is out of scope.

| Skill | Reason |
|-------|--------|
| `conveyancing-protocol-checklist` | Protocol compliance audited after the fact, not followed step-by-step |
| `ca-protocol-compliance` | Same — DE flags cover substantive property-level checks |
| `cqs-practice-standards` | Firm-level, not transaction-level |
| `clc-compliance-tracker` | Firm-level, not transaction-level |
| `property-law-reference` | Curated URL list — models can search the web |

## Next Up 🔨

### Standalone Checklists
| Skill | Description | Complexity |
|-------|-------------|------------|
| `pre-exchange-checklist` | Everything before exchange: searches, enquiries, mortgage offer, deposit, insurance, completion date, report on title, contract | Low |
| `post-completion-checklist` | SDLT return (14 days), LR application (priority period), notice to landlord, management co, utility transfers | Low |
| `new-build-checklist` | NHBC/warranty, CML new-build requirements, snagging, longstop date, reservation agreement | Low |

### Standalone Calculators & Tools
| Skill | Description | Complexity |
|-------|-------------|------------|
| `leasehold-calculator` | Lease extension costs (marriage value, capitalisation rates, deferment rates), statutory vs voluntary routes, ground rent escalation | Medium |
| `key-dates-calculator` | SDLT filing deadline, LR priority periods, search expiry, exchange-to-completion timeline | Low |
| `completion-statement-checker` | Verify completion statement maths: purchase price ± adjustments, apportionments, fees | Medium |

### Standalone Intelligence
| Skill | Description | Complexity |
|-------|-------------|------------|
| `lender-prescreen` | Flag common Part 1 handbook issues from property data alone — short lease, non-standard construction, knotweed, flood zone 3, missing EWS1, restrictive covenants | Medium |
| `hmlr-explainer` | Explain title register entries — restriction types (Form A/J/K), charge entries, classes of title, easement/covenant implications | Low |
| `search-pack-guide` | What each property search covers, when to order extras, what results mean | Low |

### Moverly-Connected (Phase 2+)
| Skill | Description | Complexity |
|-------|-------------|------------|
| `moverly-lender-check` | Full lender-specific evaluation — property + borrower + Part 2 rules via DE | Medium |
| `moverly-portfolio` | Caseload dashboard — risk overview across all active transactions | Low |

### Public Property Lookup (MCP)
| Skill | Description | Complexity |
|-------|-------------|------------|
| `title-lookup` | Resolve address/UPRN to HMLR title number(s) — public MCP tool, no Moverly account needed. Returns title numbers with tenure type when ambiguous (e.g. flat in a block). **Depends on HMLR meeting — Ed to raise free access to UPRN-to-titles database.** | Medium — needs HMLR API access |

### CMS Integration Skills
| Skill | Description | Complexity |
|-------|-------------|------------|
| `leap-connector` | Push/pull case data from Leap Legal Software | High — needs API research |
| `proclaim-connector` | Push/pull case data from Proclaim (Eclipse) | High — needs API research |
| `osprey-connector` | Push/pull case data from Osprey Approach | High — needs API research |
| `land-registry-portal` | Interact with HMLR Business Gateway / Portal | High — needs API research |

### WhatsApp Agent Channel
| Item | Description | Complexity |
|------|-------------|------------|
| `whatsapp-adapter` | WhatsApp Business API adapter for agent chat — phone-to-user resolution, template messages for outbound, transcript-as-provenance for vouched claims | Medium |
| Seller interview via WhatsApp | Natural conversation → structured PDTF data, transcript is the evidence (no confirm-every-field) | Low (builds on interview mode) |
| Buyer briefing via WhatsApp | Plain English risk explanation, "what should I ask my conveyancer?" | Low |
| Multi-transaction routing | Same phone → multiple transactions, agent disambiguates naturally | Low |

## Ideas / Backlog 💡

- Conveyancing quiz / training skill (test knowledge of process)
- AML/IDV checklist
- Chain management tracker
- Contract review assistant (flag unusual clauses)
- Stamp duty for Scotland (LBTT) and Wales (LTT)
- Commercial property SDLT (different rates)
- Ground rent analyser (escalation clauses, peppercorn conversion)

## Design Principles

1. **Deterministic over probabilistic** — if there's a calculation, write a script
2. **Standalone first** — build trust without requiring a Moverly account
3. **Agent-native** — write for AI agents, not human developers
4. **Accurate and sourced** — cite legislation, effective dates, official sources
5. **Self-contained** — no external dependencies beyond standard shell tools

---
*Last updated: 2026-03-27*
