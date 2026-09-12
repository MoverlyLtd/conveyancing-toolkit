# FAQ

## Is this just an SDLT calculator?

No. The SDLT calculator is one skill. The toolkit also includes a Lease Impact Advisor (saleability assessment, lender eligibility across 13 major lenders, extension cost estimates) plus Restrictive Covenant and Title Defect advisors. (The Lenders Handbook Pre-Screen is deprecated: the UK Finance Handbook is licensed material and we no longer redistribute it.) More skills are planned — see the [roadmap](../SKILLS_ROADMAP.md).

## How is this different from asking ChatGPT?

Models trained on general data give plausible but often inaccurate answers for specialist tasks. Three out of five leading models got a straightforward SDLT calculation wrong. For lender requirements, models say "most lenders require 70-80 years" instead of giving named thresholds (Nationwide accepts 55 years; Virgin Money requires 85).

Skills fix this by giving the AI access to deterministic scripts and structured reference data — the actual rules, not model memory.

## Can I trust the output?

The SDLT calculator uses a deterministic script with rates verified daily against GOV.UK. The lease impact thresholds are from each lender's published lending criteria — always confirm against the lender before relying on them.

That said, this is a professional tool, not a replacement for professional judgment. Always verify critical outputs against primary sources.

## What AI tools does this work with?

Any tool that can read files and run scripts: Claude, Claude Code, Cursor, or any MCP-compatible platform. The skills are plain markdown files with bash scripts — no proprietary format.

## Is this really free?

Yes. MIT-licensed, free forever. No API key, no subscription, no vendor lock-in.

## How do I contribute?

Fork the repo, create a skill directory with a `SKILL.md`, and submit a PR. See [CONTRIBUTING.md](../CONTRIBUTING.md) and [Building Skills](building-skills.md) for guidelines.

## Who maintains this?

Built and maintained by [Moverly](https://moverly.com), with contributions from the community. We're actively looking for conveyancers, legal technologists, and developers to help build more skills.

## How often is the data updated?

SDLT rates are verified daily against GOV.UK via automated checks. The toolkit is designed so that data updates are separate from skill logic — when rates or thresholds change, only the data files need updating.
