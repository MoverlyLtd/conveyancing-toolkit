# The Conveyancer Journey — A Complete Transaction with AI

This walkthrough follows a buyer's conveyancer through a real residential purchase, showing how the Moverly toolkit saves time and legwork at every stage while keeping the conveyancer fully in control of judgment and decision-making.

**The property:** 14 Oakwood Terrace, Bristol BS6 7QP — a Victorian semi-detached house, leasehold, 68 years remaining on a 125-year lease from 1969. Listed at £425,000.

**The conveyancer:** Sarah, a senior conveyancer at a CQS-accredited firm. She has 40 active matters and uses Claude Code with Moverly MCP connected.

---

## Day 1: Instruction and Initial Assessment

### What Sarah says to Claude:

> "New instruction — purchase of 14 Oakwood Terrace, Bristol BS6 7QP. Buyer is James Chen, first-time buyer, 90% LTV mortgage with Nationwide. Run an initial assessment."

### What happens:

Claude connects to Moverly MCP and:

1. **Lists the transaction** — finds it in Sarah's caseload via `list_transactions`
2. **Pulls the current state** via `get_state` — sees the PDTF data already populated (address, EPC, flood risk, council tax from free collectors that ran when the transaction was created)
3. **Gets risk insights** via `get_insights` — the Diligence Engine has already evaluated the available data:

> **Initial risk assessment — 14 Oakwood Terrace:**
>
> [critical] **Very short lease** (risk 10/10) — 68 years remaining on a 125-year lease from 1969. Most mortgage lenders require a minimum of 70-85 years at completion. Nationwide requires the unexpired term to exceed the mortgage term plus 30 years. On a 25-year mortgage, that's 55 years minimum — but their Part 2 also states minimum 55 years unexpired at the start. At 68 years, this passes Nationwide's minimum but is borderline. (Source: HMLR Practice Guide 27, UK Finance Lender's Handbook)
>
> [high] **Loft conversion — building regulations status unknown** (risk 8/10) — Seller's TA6 indicates structural alterations including loft conversion completed 2024. No building regulations completion certificate provided. (Source: GOV.UK Building Regulations)
>
> [moderate] **Flood Zone 2** (risk 5/10) — Environment Agency data shows the property in Flood Zone 2 (medium probability). Recommend specialist flood insurance quote and lender notification. (Source: GOV.UK Check Flood Risk)
>
> [moderate] **Rear extension — planning status not confirmed** (risk 5/10) — TA6 mentions rear extension completed 2024. Planning permission status recorded as "Not known." (Source: GOV.UK Planning Permission)
>
> 4 data-driven flags. 12 evidence-incomplete flags awaiting search results.

4. **Runs a lender pre-screen** using the standalone Lender Handbook skill — checks Nationwide Part 2 requirements against the property specifics:

> **Nationwide Part 2 check:**
> - Lease length: 68 years ✅ (min 55 years unexpired, but must exceed mortgage term + 30 = 55 years at completion)
> - Note: If completion is delayed beyond ~13 years, the property would fall below threshold. No issue for normal timeline.
> - Ex-council: Not applicable
> - Building type: Semi-detached ✅
> - Flood zone: Report to valuer and confirm buildings insurance available ⚠️

5. **Calculates SDLT** via the standalone calculator:

> First-time buyer on £425,000: **£6,250** (effective rate 1.47%)
> FTB relief saves £5,000 vs standard rate.

### Sarah's judgment call:

The lease is the main issue. 68 years is technically above Nationwide's minimum but well below the 80-year threshold where marriage value kicks in for lease extensions. Sarah needs to advise James on the lease extension implications before he commits. She also needs to decide whether to recommend negotiating a lease extension as a condition of the purchase.

**Time saved: ~2 hours** (manual title review, handbook checking, SDLT calculation, initial risk assessment)

---

## Day 2-3: Searches Ordered and Contract Pack Review

### What Sarah says:

> "The seller's solicitor has sent the contract pack. I've got the draft contract, title register, TA6, TA7, and office copy entries. Upload them all."

### What happens:

Claude uploads each document via `upload_document`. The processing pipeline runs automatically:

1. **File classifier** identifies each document type
2. **Document summariser** extracts structured data
3. **Claims mapper** writes PDTF claims with provenance
4. **Diligence Engine** re-evaluates all 37 categories

Sarah puts the kettle on. By the time she's back with a cup of tea:

> "What's the status on those documents?"

Claude calls `get_queue`:

> All 5 documents processed:
> - Draft contract ✅ — completion date, deposit, special conditions extracted
> - Title register ✅ — 2 registered charges, 1 restrictive covenant noted
> - TA6 ✅ — structural alterations, flooding answers, boundaries confirmed
> - TA7 ✅ — leasehold information, service charges, ground rent details
> - Office copy entries ✅ — title plan, property register, charges register

Then `get_insights` shows the updated risk picture:

> **Updated assessment (5 documents processed):**
>
> [critical] **Very short lease** — unchanged (risk 10/10). TA7 confirms 125-year lease from 1969, ground rent £150/year with 10-yearly review. No lease extension in progress.
>
> [high] **Loft conversion building regs** — upgraded to risk 8 with full details from TA6. Works completed March 2024. No completion certificate. Builder details provided. **3 actions available:** (1) Request certificate from local authority, (2) Request from builder, (3) Consider indemnity insurance.
>
> [high] **Restrictive covenant — no user restriction** (risk 7/10) — NEW. Title register shows covenant restricting use to single private dwelling. Draft contract silent on compliance. (Source: HMLR Practice Guide 19)
>
> [moderate] **Flood Zone 2** — unchanged (risk 5/10). Environmental search will provide definitive assessment.
>
> [moderate] **Ground rent escalation** (risk 5/10) — NEW. TA7 shows ground rent £150 with 10-yearly review to "reasonable proportion of rental value." Open-ended review clause. Check Leasehold Reform Act 2024 provisions on ground rent caps.
>
> Resolved: 3 flags cleared by document evidence.
> Outstanding: 5 data-driven, 8 evidence-incomplete.

---

## Day 5-7: Search Results and Enquiries

### What Sarah says:

> "Environmental search, local authority search, and drainage search have come back. Upload them. Then show me what needs enquiries raised."

### What happens:

Documents uploaded. A few minutes later:

> "What changed after the search results?"

Claude calls `get_insights`:

> **Search results impact:**
>
> ✅ **Flood Zone 2** — RESOLVED. Environmental search confirms Zone 2 but no flood history. Buildings insurance confirmed available. Flag cleared.
>
> ✅ **Planning permission** — RESOLVED. Local authority search shows planning permission granted 2023 for rear extension. Condition discharge confirmed.
>
> ⚠️ **Radon** — NEW [moderate]. Environmental search shows intermediate probability radon area. Recommend radon test.
>
> Net: 2 flags resolved, 1 new. Outstanding data-driven flags: 4.

> "What enquiries should I raise?"

Claude reviews the outstanding flags and drafts enquiries:

> **Recommended enquiries:**
>
> 1. **Loft conversion building regulations** — "Please confirm whether a building regulations completion certificate was obtained for the loft conversion completed in March 2024. If not available, please confirm whether your client would be willing to obtain a retrospective certificate or contribute to the cost of indemnity insurance."
>
> 2. **Ground rent review clause** — "The lease provides for ground rent review to a 'reasonable proportion of rental value' at 10-yearly intervals. Please confirm the current ground rent, the date of the last review, and whether your client has taken any steps regarding the ground rent provisions under the Leasehold Reform Act 2024."
>
> 3. **Restrictive covenant** — "Entry 3 on the Charges Register contains a covenant restricting use to a single private dwelling. Please confirm that the property has been used in accordance with this covenant and that no breach is known or contemplated."
>
> Shall I raise these via MCP?

### Sarah's judgment call:

Sarah reviews the draft enquiries, adjusts the tone on the ground rent one (she wants to be more specific about which LRA 2024 provisions apply), and approves sending them:

> "Yes, raise all three. Amend the ground rent one to reference section 21 of the Leasehold Reform Act 2024 specifically."

Claude calls `raise_enquiry` three times, linking each to the relevant flag and PDTF path.

**Time saved: ~3 hours** (search review, enquiry drafting, cross-referencing handbook requirements)

---

## Week 2: Enquiry Responses and Flag Resolution

### What Sarah says:

> "Check for enquiry responses."

Claude calls `list_enquiries`:

> **2 of 3 enquiries responded:**
>
> 1. **Loft conversion** — Seller's solicitor confirms no building regulations certificate. Builder (ABC Construction Ltd) has been asked to obtain retrospective. Seller willing to provide indemnity insurance if certificate not obtained before exchange. *(Status: open)*
>
> 2. **Restrictive covenant** — Confirmed property used as single private dwelling since purchase in 2019. No breach known. *(Status: resolved)*
>
> 3. **Ground rent** — No response yet (5 days). *(Status: pending)*

> "Vouch the covenant confirmation and chase the ground rent response."

Claude calls `vouch` to record the covenant confirmation against the relevant PDTF path. The Diligence Engine re-evaluates — the restrictive covenant flag resolves to `clear`.

For the ground rent chase, Claude calls `respond_enquiry` to send a follow-up.

### What Sarah says next:

> "Run the CA Protocol check — where are we against the protocol?"

Claude runs the CA Protocol compliance skill:

> **CA Protocol compliance — 14 Oakwood Terrace:**
>
> ✅ Identity verification — buyer IDV complete
> ✅ Pre-sale preparation — contract pack received and reviewed
> ✅ Searches — environmental, local authority, drainage all received
> ⚠️ Section 4.0 — Loft conversion building regs outstanding (CA Protocol: works completed 2024, within 10-year enforcement window, certificate or indemnity needed before exchange)
> ⚠️ Section 1.6 — Outstanding enquiry responses (ground rent)
> ⚠️ Section 6.0 — Leasehold: ground rent review terms not yet clarified
> ❌ Section 1.10 — Completion arrangements not yet agreed
> ❌ Section 5.0 — Certificate of title not yet prepared

---

## Week 3: Lender Report and Pre-Exchange Preparation

### What Sarah says:

> "The building regs certificate isn't coming. Seller will provide indemnity. Vouch that resolution and then run the full lender check for Nationwide."

Claude vouches the indemnity resolution. The building regs flag updates from `risk 8` to `risk 2` (mitigated by indemnity). Then runs the lender pre-screen:

> **Nationwide Certificate of Title readiness:**
>
> ✅ Title: Good leasehold, registered at HMLR
> ✅ Lease: 68 years unexpired — passes Nationwide minimum (55 years)
> ✅ Construction: Standard (brick, tile)
> ✅ Building regs: Indemnity insurance in place for loft conversion
> ✅ Flood: Zone 2, buildings insurance confirmed
> ⚠️ Ground rent: Review clause — Nationwide Part 2 requires ground rent not to exceed 0.1% of property value. At £150 on £425,000, currently 0.035%. Review clause is open-ended — **report to Nationwide for instruction.**
> ✅ Restrictive covenant: Use as single dwelling — compliant
> ✅ Radon: Intermediate area — no Part 2 restriction
>
> **Action needed:** Report ground rent review clause to Nationwide valuer before issuing certificate of title.

### Sarah's judgment call:

The ground rent is fine now (£150 on £425k is negligible) but the review clause could theoretically push it above Nationwide's threshold at a future review. Sarah decides to report this to Nationwide with her assessment that the risk is low, and to highlight the LRA 2024 protections. This is exactly the kind of judgment that can't be automated.

---

## Week 4: Report on Title and Exchange

### What Sarah says:

> "Generate the Report on Title for James."

Claude calls `get_state` and `get_insights`, then maps the data to the firm's Report on Title template:

> **Report on Title generated — 14 Oakwood Terrace**
>
> 17 sections completed from verified data:
> - Title, ownership, encumbrances — from title register
> - Searches — from processed search results
> - Property information — from TA6/TA7
> - Risk flags — 1 remaining (short lease, critical but disclosed)
> - Enquiry resolutions — all cited with dates and responses
> - Lender requirements — Nationwide-specific notes included
>
> **Sections requiring your review:**
> - §4 Encumbrances: The restrictive covenant assessment needs your professional view on enforceability
> - §11 Lease: Your recommendation on lease extension strategy
> - §14 Mortgage: Your assessment of the ground rent review clause risk for Nationwide
>
> Draft saved. Review and amend before sending to James.

### Sarah's judgment call:

She reviews the three flagged sections, adds her professional assessment on the lease extension (recommend statutory route post-completion, budget ~£15,000 including premium and costs), amends the covenant section based on her experience with similar restrictions in BS6, and finalises the report. What took 3-4 hours of drafting is now 20 minutes of review and professional input.

### Exchange:

> "Run the final pre-exchange check."

Claude pulls the latest insights and protocol status:

> **Pre-exchange readiness — 14 Oakwood Terrace:**
>
> Risk flags: 1 remaining (short lease — disclosed and accepted by buyer)
> Resolution rate: 6 of 7 original flags resolved
> Enquiries: all resolved or accepted
> Searches: all received and current
> Mortgage offer: confirmed, no outstanding conditions
> Deposit: 10% (£42,500) — confirmed held
> Insurance: buildings insurance arranged from completion
> Completion date: agreed
> CA Protocol: all sections cleared except lease (disclosed)
> Certificate of title: issued
>
> **Ready to exchange.** ✅

---

## What Changed

| Stage | Without AI toolkit | With AI toolkit |
|-------|-------------------|-----------------|
| Initial assessment | 2-3 hours: manual title review, handbook check, risk identification | 5 minutes: automated risk analysis with citations |
| Document review | 1-2 hours per document: read, extract, cross-reference | Upload and wait: AI extracts, maps, re-evaluates overnight |
| Enquiry drafting | 30-60 min per enquiry: research issue, draft, cross-reference | 2 minutes: AI drafts from flag data, conveyancer reviews |
| Lender compliance | 2-3 hours: manual Part 2 checking | 15 seconds: parallel lender pre-screen |
| Protocol compliance | 1 hour: manual checklist review | 30 seconds: automated audit against transaction state |
| Report on Title | 3-4 hours: manual drafting from multiple sources | 20 minutes: generated from verified data, conveyancer reviews |
| **Total per transaction** | **~12-15 hours of intelligence work** | **~2-3 hours of judgment work** |

The conveyancer's time shifted from gathering and compiling information to reviewing, assessing, and advising. Every decision point — the lease extension strategy, the lender reporting approach, the covenant enforceability assessment, the client advice — remained fully in Sarah's hands.

That's the judgment line. Everything above it happens automatically. Everything below it is where the conveyancer's expertise, experience, and professional judgment create the value that no algorithm can replicate.
