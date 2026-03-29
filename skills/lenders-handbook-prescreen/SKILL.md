---
name: lenders-handbook-prescreen
description: >
  Exhaustive UK Finance Lender's Handbook Part 1 pre-screen for residential
  mortgage transactions. Use when asked about lender requirements, whether
  to refer something to the lender, mortgage compliance, certificate of
  title checks, lender reporting obligations, or any "does the lender need
  to know about X" question. Covers ALL Part 1 sections. Works standalone
  (manual assessment) or auto-completes with Moverly MCP. Miss nothing.
---

# Lender's Handbook Pre-Screen

Exhaustive checklist covering every Part 1 requirement of the UK Finance
Mortgage Lenders' Handbook for residential transactions in England & Wales.

## Quick Start

1. Read the full checklist: `references/part1-checks.md`
   — 24 categories, 90+ checks, every Part 1 requirement
2. When a check says "check Part 2": read `references/lenders/{slug}.md`
   for the specific lender's requirements (~108 Q&A per lender)
3. Follow the reporting decision tree below for any issue found

## Important Rules

- Part 1 = general requirements for ALL lenders
- Part 2 = lender-specific overrides and thresholds
- Express requirements in plain language — cite handbook section numbers
- When in doubt: REPORT to lender before completion (HB 2.3)
- Do NOT complete until written instructions received after reporting

## The Golden Rule

> If you believe any matter should reasonably be considered important by
> the lender in deciding whether to lend, and you cannot disclose it due
> to conflict of interest, you must cease acting and return instructions
> (HB 5.3.1).

## Reporting Decision Tree

When you identify any issue:

```
Can you certify title as good and marketable?
├── YES → Proceed without referral
│   └── Exception: some items ALWAYS require reporting regardless
│       (purchase price discrepancy, sub-6-month ownership,
│        non-owner seller, cashback/incentives, letting, HMO)
├── NO → Can indemnity insurance resolve it?
│   ├── YES → Arrange insurance (check Part 2 for acceptance)
│   │   └── You can now certify → Proceed
│   └── NO → Report to lender (HB 2.3) BEFORE exchange
│       ├── Identify relevant handbook provision
│       ├── Summarise legal risks
│       ├── Recommend how lender should protect interest
│       └── DO NOT COMPLETE until written instructions received
└── CONFLICT OF INTEREST prevents disclosure?
    └── CEASE ACTING → Return instructions (HB 5.3.1)
```

## Part 2: Lender-Specific Requirements

When a "check Part 2" item is triggered, read the specific lender's
reference file from `references/lenders/{lender-slug}.md`.

Each file contains the lender's answers to every Part 2 question
(~108 items) scraped from the UK Finance website.

**To look up a lender's Part 2 requirement:**
1. Identify the section number from the Part 1 checklist (e.g. 5.14.1)
2. Read `references/lenders/{lender-slug}.md`
3. Find the matching section number
4. Apply the lender's specific requirement

**Tier 1 lenders** (~80% of UK mortgages):
nationwide-building-society, santander-uk-plc, barclays-bank-uk-plc,
hsbc-uk-bank-plc, national-westminster-bank-plc, halifax,
bank-of-scotland-beginning-a, tsb-bank-plc, virgin-money,
yorkshire-building-society, skipton-building-society,
coventry-building-society, leeds-building-society,
principality-building-society, metro-bank-plc

Plus 50+ Tier 2 and Tier 3 lenders in the same directory.

If the borrower's lender is not listed, fall back to Part 1 general
requirements and advise the conveyancer to check the UK Finance website
directly for that lender's Part 2.

## Moverly MCP Integration

When connected to Moverly, most checks auto-populate from transaction data:

| Check Category | MCP Tool | Auto-Check |
|---------------|----------|------------|
| Leasehold term (9.1) | `get_insights` → tenure-leasehold | Years remaining vs lender minimum |
| Planning/building regs (13.6) | `get_insights` → planning-permission, building-regulations | Breach + time-barring |
| Restrictive covenants (7.3) | `get_insights` → property-rights-restrictions | 20-year waiver assessment |
| Searches (13.1) | `get_status` → searchesCollector | Ordering and age tracking |
| Title quality (4.3) | `get_insights` → title-ownership, legal-title-issues | Defect identification |
| Environmental (18.1) | `get_insights` → environment-location | Flood, contamination, mining |
| New build (15.1) | `get_insights` → condition-safety-core | Build date, warranty status |
| Ground rent (9.7) | `get_insights` → tenure-leasehold | Onerous ground rent detection |
| Insurance (19.1) | `get_insights` → insurance-availability | Insurance adequacy |
| BSA 2022 (9.14) | `get_insights` → condition-safety-specialist | Relevant building ID |

## Sources

- UK Finance Mortgage Lenders' Handbook Part 1 (England & Wales):
  https://lendershandbook.ukfinance.org.uk/lenders-handbook/englandandwales/
- Part 2 data from individual lender pages on the same site
- Building Safety Act 2022, Insolvency (No 2) Act 1994

This skill provides guidance based on publicly available handbook
requirements expressed in plain language. Always refer to the current
published handbook.
