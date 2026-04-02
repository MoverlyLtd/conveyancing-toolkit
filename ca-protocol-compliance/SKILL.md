---
name: ca-protocol-compliance
description: >
  Track compliance with the Conveyancing Association Protocol (5th Edition)
  for residential property transactions. Use when asked about CA protocol,
  transaction delays, additional enquiries, building regulations, planning
  permission, restrictive covenants, short leases, leasehold obligations,
  estate rentcharges, completion delays, fraud avoidance, or lender
  communication. Applies to both SRA and CLC regulated firms. Works
  standalone or auto-completes with Moverly MCP.
---

# CA Protocol Compliance

## Response Rules — Always Include

**DO:**
- Always cite **specific communication timeframes** from the protocol — e.g. "respond to enquiries within 5 working days", "acknowledge correspondence within 2 working days", "provide weekly updates if no substantive response possible"
- When discussing planning/building work: always treat **building regulations as a separate concern from planning permission** — they are different regimes (planning = land use, building regs = construction standards)
- When discussing enforcement: always cite **all three enforcement timeline rules**: 4-year rule (operational development/change of use to dwelling), 10-year rule (breach of condition/other change of use), 12-month rule (listed building enforcement)
- Always reference **specific CA Protocol section numbers** (e.g. s1.0-1.3 for delays, s4.0-4.1 for property information)
- When discussing delays: cite the protocol's **escalation steps** (raise with fee earner → raise with senior partner/compliance → refer to regulatory body)

**DON'T:**
- Don't discuss planning issues without also flagging building regulations as a separate check
- Don't mention only the 4-year enforcement rule — always include the 10-year and 12-month rules for completeness
- Don't give vague timeframes like "promptly" — use the specific protocol timeframes

Guide conveyancers through Conveyancing Association Protocol (5th Edition,
2023) obligations. The CA Protocol complements both the Law Society CQS
Protocol and CLC regulatory requirements.

## Important

- Express all items in plain language — do NOT reproduce CA Protocol text
  verbatim
- Cite section numbers (e.g. "CA 1.8 Pre-Sale Preparation")
- The CA Protocol acknowledges each transaction must be judged on its merits
- Where CA Protocol conflicts with regulatory or Law Society guidance, the
  latter prevails

## Section 1: Reducing Transaction Delays

### 1.0 Communication
- Make introductory call to client at outset
- Use electronic communication as first choice (secure portal or encrypted email)
- Send bank details to client by post early (fraud prevention)
- Work cooperatively with the other side — respond promptly
- Use phone to resolve complex issues rather than protracted email exchanges
- Include GDPR disclosure about sharing progress with other parties
- Maintain regular updates to other lawyer and estate agent
- Request full chain information from estate agent
- Request Material Information from estate agent (CPR 2008)
- Work on a regular diarised file review cycle
- Publish a generic conveyancing email for pre-appointment correspondence

**Ref: CA Protocol 1.0**

### 1.1–1.6 Early Actions
- **1.1** Collect monies on account at earliest opportunity; warn client about bank transfer limits
- **1.2** Ensure proper cover for staff absences — monitor email and voicemail
- **1.3** Obtain identity verification upon instruction; consider digital ID (UK DIATF compliant); be alert to seller ID fraud indicators (sole owner, no mortgage, overseas payments, non-resident owner)
- **1.4** Establish source of funds early using open banking where possible; flag gifts/loans for lender reporting
- **1.5** Deal with post-valuation queries — check Lender's Handbook before referring to lender
- **1.6** Request deposit monies once AML checks complete

**Ref: CA Protocol 1.1–1.6**

### 1.7 Title Defects
- Assume seller is responsible for perfecting their own title defects
- Seller would not expect full market value for a genuinely defective title
- "Potential" defects are for negotiation between parties

**Ref: CA Protocol 1.7**

### 1.8 Pre-Sale Preparation
If preparing pre-sale packs, include:
- Title Information Document and Title Plan
- Documents referred to in title (transfers, conveyances, leases with rights/covenants)
- Buying and Selling Property Information including CPR Material Information
- Landlord/management company information (cost and location)
- All documents held by client
- Local authority search, drainage & water search, environmental searches
- Required permissions and consents for alterations

Seller's conveyancer should review all documentation to identify and resolve potential enquiries before issuing.

**Ref: CA Protocol 1.8**

### 1.9 Contract Pack
Issue contract pack at earliest opportunity including:
- Standard Conditions of Sale (latest edition, without routine amendments)
- Title Information Document and Title Plan
- All downloadable Land Registry title documents
- Draft Transfer (can use HMLR Digital Registration Service)
- Replies to Requisitions on Title
- RQ Certificate if restriction registered
- Each document as separate email attachment

**Ref: CA Protocol 1.9**

### 1.10–1.12 Leasehold, Contracts, Completion
- **1.10** Advise client that Lease Administrator payment will be required; encourage seller contact with Lease Administrator at marketing stage
- **1.11** Obtain signed contract early — seller's lawyer may leave buyer details blank; digital signatures acceptable
- **1.12** Use Conveyancer's Code for Completion to transmit funds day before; set up transfers day before completion

**Ref: CA Protocol 1.10–1.12**

## Section 2: Additional Enquiries

- **2.0** Limit enquiries to those relating to title or required by client/lender. Seller may refuse "standard" enquiries not specific to the property
- **2.1** Assist buyer's lawyer by advising seller to provide required documents at seller's expense (s.106 agreements, adoption agreements etc.)
- **2.2** Review and augment seller's replies to ensure full information given early
- **2.3** Use current LPE1/FME1 for leasehold; contact Lease Administrator early; £200+VAT is expected maximum fee, 15-day turnaround; check Building Safety Act 2022 remediation status for 5+ storey buildings
- **2.4** Raise enquiries at earliest stage — implement supervisor review at regular stages to catch issues early
- **2.5** Rely on Standard Conditions rather than requesting retentions under £200

**Ref: CA Protocol 2.0–2.5**

## Section 3: Post-Completion

- Seller's lawyer should assist with Land Registry requisitions cooperatively and promptly

**Ref: CA Protocol 3.0**

## Section 4: Technical Decision Trees

These are the most valuable section for agent automation. Each issue has
a deterministic decision tree.

### 4.0 Planning Permission

```
Has the work required planning permission?
├── Permission obtained with no conditions → No further action
├── Permission obtained with conditions
│   ├── LA recorded satisfaction → No further action
│   └── LA NOT recorded satisfaction
│       ├── Evidence of breach >10 years ago (not ongoing condition) → No further action
│       └── Otherwise → Obtain copy of consent and check conditions
│           └── If consent >20 years old → buyer's lawyer obtains from LA
├── No permission obtained
│   ├── Work completed >4 years ago without concealment (not change of use) → No further action
│   ├── Work completed >12 months but <4 years → Obtain indemnity insurance
│   └── Work completed <12 months → Regularisation certificate or bespoke indemnity
└── In ALL cases without permission: advise client AND valuer; valuer should confirm structurally sound
```

**Note on change of use:** 10 years required instead of 4 years.

**Ref: CA Protocol 4.0**

### 4.0 Building Regulations

```
When were the works carried out?
├── Pre-1985 → No action (LAs not required to keep records before Building Act 1984)
├── Post-1984, Completion Certificate revealed by search → No further action
├── Post-1984, NO certificate, works >10 years ago
│   → Advise client and lender; check with surveyor for safety
│   → Consider indemnity only if material risk of enforcement
├── Post-1984, NO certificate, works >12 months and <10 years
│   ├── Non-structural works → Advise client/lender; check surveyor; consider indemnity if material risk
│   └── Structural works → Advise client/lender; check surveyor; RECOMMEND indemnity at seller's cost
└── In ALL cases without certificate: advise client AND surveyor that LA consent not obtained
    → Surveyor should confirm structurally sound
    → Advise client that lack of building regs may indicate safety compliance issues
```

**Ref: CA Protocol 4.0**

### 4.1 Restrictive Covenants

```
Is the document containing covenants available?
├── Missing Pre-1925 document
│   → Advise of risk; consider indemnity at buyer's cost
├── Missing Post-1925 document
│   ├── Dated before first registration? Check Land Charges for D(II)
│   │   └── Not protected → Apply to remove from Charges Register
│   ├── Seller confirms no changes to property/use in last 20 years, no enforcement
│   │   → Consider indemnity at buyer's cost only if material risk
│   ├── Seller cannot confirm about last 20 years
│   │   → Consider indemnity at seller's cost only if material risk
│   └── Changes made within last 20 years
│       → Seller has defective title; indemnity at seller's expense
├── Known breach within 20 years (covenant binds successors)
│   ├── Breach >12 months old → Defective title indemnity at seller's cost
│   └── Breach <12 months → Bespoke indemnity or retrospective consent at seller's cost
└── Known breach >20 years OR covenant doesn't bind successors
    → No further action (implied waiver per Hepworth v Pickles 1900)
```

**Ref: CA Protocol 4.1**

### 4.2 Short Leases

```
Years remaining on lease?
├── >90 years → Report risk/cost to client; generally acceptable to lenders
├── 80–90 years → Report risk and additional costs on future sale/remortgage
├── ≤80 years → Lease extension required at seller's expense
│   (unless buyer is fully advised cash buyer or lender accepts shorter term)
└── For flats in Relevant Buildings (England, 5+ storeys):
    → Request wording to extend qualification into new lease to preserve
      leaseholder protections under Building Safety Act 2022
```

**Ref: CA Protocol 4.2**

## Section 5: Lender Communication

- Check UK Finance Lender's Handbook before referring queries to lender
- Use CA standard referral form for lender queries
- Provide contact details on Certificate of Title
- Do not send covering letters with Certificate of Title (scanned separately by some lenders)

**Ref: CA Protocol 5.0–5.1**

## Section 6: Leasehold

- **6.1** Challenge unreasonable administration charges; consent unreasonably withheld means leaseholder can proceed without
- **6.2** Post-1996 leases: Deed of Covenant not required (Landlord & Tenant (Covenants) Act 1995)
- **6.3** Check rent review clauses — run calculation for next 50 years; report onerous terms to client and lender; new build ground rents must be reasonable per current lending policy
- **6.4** Serve notice on all administrators as courtesy when multiple involved

**Ref: CA Protocol 6.1–6.4**

## Section 7: Estate Rentcharges

- Advise on terms major lenders wouldn't accept (e.g. Nationwide: >£500/year needs referral)
- Check financial impact of review clauses over 50 years
- Ensure drafting excludes remedies to enter or lease property to recover arrears
- New rentcharges should exclude s.121 Law of Property Act

**Ref: CA Protocol 7.1–7.2**

## Section 8: Fraud Avoidance

- Implement CA Cyber Protocol
- Apply enhanced due diligence for high-risk properties: vacant, unmortgaged, non-resident seller, sole owner, long-held
- Verify bank account for sale proceeds

**Ref: CA Protocol 8.0**

## Moverly MCP Integration

When connected to Moverly, the technical decision trees in Section 4 map
directly to diligence engine flag categories:

| CA Section | DE Flag Category | MCP Tool |
|-----------|-----------------|----------|
| 4.0 Planning | planning-permission | `get_insights` |
| 4.0 Building Regs | building-regulations-extensions, building-regulations-internal | `get_insights` |
| 4.1 Restrictive Covenants | property-rights-restrictions | `get_insights` |
| 4.2 Short Leases | tenure-leasehold | `get_insights` |
| 1.3 IDV | participantVerification | `get_status` |
| 1.8/1.9 Contract Pack | ta6/ta7/ta10 completion | `get_form_progress` |
| 2.0–2.4 Enquiries | enquiry tracking | `list_enquiries` |
| 5.0 Lender | lenders-handbook-requirements | `get_insights` |

Use `get_insights` with `evidenceBasis: "data-driven"` to find flags
that have CA Protocol decision tree mappings, then guide the user through
the relevant tree with the specific data from the flag.

## Sources

- Conveyancing Association Protocol, 5th Edition (2023):
  https://www.conveyancingassociation.org.uk
- CA Cyber Protocol (referenced in CA Protocol)
- UK Finance Mortgage Lender's Handbook (referenced throughout)

This skill provides compliance guidance based on publicly available
professional standards. Always refer to the current published protocol.
