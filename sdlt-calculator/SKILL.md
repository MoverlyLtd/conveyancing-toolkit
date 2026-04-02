---
name: sdlt-calculator
description: Calculate UK Stamp Duty Land Tax (SDLT) for residential property purchases in England and Northern Ireland. Use when asked about stamp duty, SDLT, property tax on purchase, first-time buyer relief, additional property surcharge, or non-UK resident surcharge. Handles standard purchases, first-time buyers, additional properties, and non-resident buyers.
---

# SDLT Calculator

Calculate Stamp Duty Land Tax for residential property purchases in England and Northern Ireland.

## When to Use

- Buyer asks "how much stamp duty will I pay?"
- Conveyancer needs SDLT figure for a transaction
- Comparing SDLT across scenarios (first-time buyer vs not, additional property)
- Checking whether first-time buyer relief applies

## How to Calculate

Run the calculator script:

```bash
bash {{SKILL_DIR}}/scripts/sdlt-calc.sh <price> [options]
```

**Options:**
- `--ftb` — First-time buyer relief
- `--additional` — Additional property (5% surcharge)
- `--non-resident` — Non-UK resident (2% surcharge)
- `--compare` — Show all scenarios side by side

**Examples:**
```bash
# Standard purchase
bash {{SKILL_DIR}}/scripts/sdlt-calc.sh 350000

# First-time buyer
bash {{SKILL_DIR}}/scripts/sdlt-calc.sh 450000 --ftb

# Buy-to-let (additional property, non-resident)
bash {{SKILL_DIR}}/scripts/sdlt-calc.sh 500000 --additional --non-resident

# Compare all scenarios
bash {{SKILL_DIR}}/scripts/sdlt-calc.sh 300000 --compare
```

## Presentation

When presenting results to the user:

1. State the total SDLT clearly upfront
2. Show the band-by-band breakdown
3. Note the effective rate (total tax ÷ purchase price)
4. Flag any reliefs or surcharges applied
5. Mention the SDLT filing deadline: 14 days from completion

## Key Rules

Read `{{SKILL_DIR}}/references/sdlt-rules.md` for the full rate tables and edge cases before answering detailed questions about:
- First-time buyer eligibility rules
- Additional property replacement rules (36-month window)
- Non-UK resident definition (183 days)
- Shared ownership elections
- Corporate purchases over £500k
- Leasehold NPV calculations

## Limitations

- England and Northern Ireland only (Scotland uses LBTT, Wales uses LTT)
- Residential property only (commercial/mixed rates differ)
- Does not calculate leasehold NPV rent component
- Rates current as of 1 April 2025 — verify at gov.uk/stamp-duty-land-tax if in doubt
