---
name: report-on-title
description: >
  Generate a comprehensive Report on Title for a residential property purchase.
  Maps PDTF-sourced transaction data and diligence engine risk flags into a
  professional buyer's conveyancer report. Use when asked to produce a Report
  on Title, buyer's report, title report, or property purchase summary for a
  Moverly transaction. Requires a Moverly MCP connection (moverly-connect skill).
---

# Report on Title Generator

Generate a comprehensive Report on Title from Moverly transaction data. The report
maps PDTF state, verified claims, and diligence engine risk flags into the standard
sections a buyer's conveyancer produces for their client.

## Prerequisites

- Moverly MCP connection configured (see moverly-connect skill)
- A transaction ID with sufficient data (claims, searches, flags)

## Workflow

### Step 1: Gather all transaction data

Call these MCP tools in sequence:

```
moverly_get_status    → transaction overview, participants, address, tenure
moverly_get_state     → full PDTF state (claims, searches, title, TA forms)
moverly_get_insights  → all diligence engine flags with risk scores and actions
```

For the insights call, make two requests:
1. **Evidenced flags only**: `evidenceBasis` = `["data-driven", "evidence-incomplete"]` — these drive the Major Issues and section-specific warnings
2. **All flags**: no filter — gives the complete picture including clear and no-data for gap analysis

### Step 2: Identify the firm's template preference

Ask the user:
- Do they have a firm-specific template or house style? If so, read it.
- If not, use the default section structure from `references/report-sections-mapping.md`
- Key customisation points: tone (formal/accessible), level of legal explanation, whether to include boilerplate guidance paragraphs

### Step 3: Generate the report

Work through each section in order. For each section:

1. **Extract data** from the PDTF state at the mapped paths
2. **Check for flags** in that category — incorporate risk findings and recommended actions
3. **Select the appropriate template variant** (e.g., freehold vs leasehold, registered vs unregistered)
4. **Cite data sources** inline using the provenance pattern: "(Data Source: [claim path / search name / TA form reference])"
5. **Flag gaps** — where data is missing (evidenceBasis = "no-data"), note what's needed

### Report Structure

Generate these sections in order. Read `references/report-sections-mapping.md` for
the full PDTF path and DE category mapping for each section.

#### Front Matter
- Report purpose and disclaimer (prepared for buyer, not third parties)
- Tax advice scope limitation
- Physical inspection disclaimer

#### 1. Overview
- Property address, title number, tenure
- Purchase price and apportionment (if available)
- Seller(s) and buyer(s)
- Client objective
- **Major Issues** — pull all flags with riskScore ≥ 7 and evidenceBasis "data-driven" or "evidence-incomplete". Present as a summary list with risk scores. This is the most important section — the buyer reads this first.

#### 2. The Property
- Address cross-referenced across sources
- Registered/unregistered status
- Title number

#### 3. Boundaries and Structures
- Title plan reference
- Boundary ownership from TA6 Q1.1
- General boundary guidance where title is silent
- Party wall considerations

#### 4. The Title
- Freehold or leasehold with title class (absolute/good/qualified/possessory)
- If leasehold: remaining term, lease terms reference, good leasehold implications
- Registered proprietor confirmation against contract
- HM Land Registry indemnity explanation
- **Include any flags from `tenure-leasehold` or `title-ownership` categories**

#### 5. Encumbrances and Rights Benefiting the Property
- Easements granted (from title register entries)
- Restrictive covenants benefiting
- Positive covenants benefiting
- Repair and maintenance obligations (rentcharges)

#### 6. Easements and Rights Adversely Affecting the Property
- Easements burdening the property
- Restrictive covenants burdening (with enforceability assessment)
- Positive covenants burdening
- Breach of covenant risk and insurance options
- **Include flags from `property-rights-restrictions`, `legal-title-issues`**

#### 7. Other Rights and Client Inspection
- Overriding interests
- Unregistered adverse rights
- Client inspection guidance and checklist

#### 8. Protection of Interests in the Property
- Notices on charges register (which survive completion)
- Restrictions on proprietorship register
- Challenge/removal procedures

#### 9. The TA Forms (Seller Information)
- Key TA6 findings: disputes, rights, alterations, guarantees, services
- Building works and alterations with consent status
- TA10 fixtures and fittings summary
- **Include flags from `building-regulations-*`, `planning-permission`**
- Remind buyer: seller has no duty to disclose physical defects

#### 10. Mines, Minerals and Airspace
- Exclusion/inclusion from title
- Implications for subterranean development

#### 11. Survey and Valuation
- RICS survey recommendation
- Survey findings (if available in state)
- Boundaries, defects, repairs, title issues from survey

#### 12. Energy Performance Certificate
- Current EPC rating
- Energy Act 2011 letting implications (if buy-to-let)
- Certificate validity period
- **Include flags from `condition-safety-core` EPC checks**

#### 13. Searches
For each search, report findings and flag any adverse entries:
- **a. Local Land Charges + Local Authority**: planning designations, highway status, conservation area, TPOs, listed building, Article 4, planning permissions, building regs, enforcement notices
- **b. Drainage and Water**: foul/surface water, public sewer map, water supply, metering, flood risk from overloaded sewers
- **c. Environmental and Flood**: contamination risk, flood zone, insurance implications
- **d. Other searches**: mining, chancel, radon, rail, highways as applicable
- **Include flags from `environment-location`, `listed-building`, `conservation-area`, `planning-development`, `legal-environmental-statutory`, `insurance-availability`**

#### 14. The Contract
- Purchase price, deposit, completion mechanics
- Vacant possession
- Insurance obligation timing (exchange vs completion)
- Notice to complete provisions
- Apportionment of fittings

#### 15. Mortgage and Funding
- Lender details, loan amount, rate, term
- Key obligations from mortgage terms
- **Include flags from `lenders-handbook`**

#### 16. Co-ownership
- Joint tenants vs tenants in common explanation
- Confirmed holding arrangement

#### 17. SDLT
- Calculation based on purchase price and buyer status
- First-time buyer relief if applicable
- Apportionment confirmation
- Use the sdlt-calculator skill for precise figures if available

### Step 4: Review and refine

After generating the draft:
1. Check all Major Issues are reflected in the relevant sections
2. Verify data source citations are present for each factual statement
3. Ensure gaps are clearly flagged ("We have not received..." / "This information is not yet available...")
4. Confirm the tone matches the firm's style
5. Present to the user for review

## Output Format

Default: Markdown with clear heading hierarchy. Can be adapted to:
- **Word/DOCX** — if the user needs it in Word format
- **PDF** — via markdown-to-PDF conversion
- **HTML** — for web/email delivery

## Key Principles

1. **Cite everything** — every factual statement needs a data source annotation
2. **Flag gaps prominently** — missing data is as important as found data
3. **Risk-first** — Major Issues at the top, not buried in sections
4. **Plain English with precision** — accessible to buyers but legally accurate
5. **Conditional sections** — include leasehold sections only for leasehold; skip mining for non-mining areas; etc.
6. **Professional liability awareness** — include appropriate disclaimers, recommend specialist advice where the report's scope ends
7. **Provenance trail** — Moverly's verified claims carry provenance; cite it to show the data chain

## Customisation

Firms can customise by providing:
- A template file (markdown or text) with their preferred section order, tone, and boilerplate
- Firm name and branding for the header
- Specific additional sections (e.g., leasehold-specific addendum, new-build snagging)
- Whether to include explanatory paragraphs (some firms prefer concise, others comprehensive)
