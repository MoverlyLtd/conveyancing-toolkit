# Conveyancing Toolkit — Multi-Model Benchmark

**Judge model:** claude-sonnet-4-20250514
**Date:** 2026-04-02

## Model Comparison (averaged across all evals)

| Model | With Skill | Baseline | Δ | Skill Helps? |
|-------|:----------:|:--------:|:-:|:------------:|
| Claude 3 Haiku | 83% | 29% | +54% | ✅ Yes |
| Claude Sonnet 4 | 99% | 48% | +51% | ✅ Yes |
| Gemini 3 Flash | 100% | 72% | +28% | ✅ Yes |
| GPT-5.2 | 99% | 64% | +35% | ✅ Yes |
| GPT-5.4 Mini | 100% | 57% | +43% | ✅ Yes |

## Skill × Model Matrix (with_skill score)

| Skill | Claude 3 Haiku | Claude Sonnet 4 | Gemini 3 Flash | GPT-5.2 | GPT-5.4 Mini |
|-------|:---:|:---:|:---:|:---:|:---:|
| aml-source-of-funds | 100% | 100% | 100% | 100% | 100% |
| building-regulations | 100% | 100% | 100% | 100% | 100% |
| ca-protocol-compliance | 90% | 100% | 100% | 100% | 100% |
| clc-compliance-tracker | 65% | 100% | 100% | 100% | 100% |
| conveyancing-protocol-checklist | 100% | 100% | 100% | 100% | 100% |
| cqs-practice-standards | 64% | 100% | 100% | 100% | 100% |
| lease-impact-advisor | 82% | 100% | 100% | 100% | 100% |
| lenders-handbook-prescreen | 80% | 100% | 100% | 100% | 100% |
| property-law-reference | 80% | 100% | 100% | 100% | 100% |
| restrictive-covenant-advisor | 100% | 90% | 100% | 100% | 100% |
| sdlt-calculator | 40% | 100% | - | 80% | 100% |

## Skill × Model Matrix (baseline score)

| Skill | Claude 3 Haiku | Claude Sonnet 4 | Gemini 3 Flash | GPT-5.2 | GPT-5.4 Mini |
|-------|:---:|:---:|:---:|:---:|:---:|
| aml-source-of-funds | 30% | 70% | 80% | 80% | 70% |
| building-regulations | 20% | 60% | 90% | 70% | 60% |
| ca-protocol-compliance | 22% | 22% | 65% | 45% | 32% |
| clc-compliance-tracker | 25% | 45% | 64% | 74% | 45% |
| conveyancing-protocol-checklist | 50% | 100% | 75% | 100% | 75% |
| cqs-practice-standards | 64% | 74% | 74% | 90% | 82% |
| lease-impact-advisor | 36% | 54% | 100% | 84% | 74% |
| lenders-handbook-prescreen | 20% | 20% | 80% | 30% | 30% |
| property-law-reference | 0% | 0% | 0% | 0% | 0% |
| restrictive-covenant-advisor | 20% | 60% | 90% | 90% | 90% |
| sdlt-calculator | 20% | 0% | 0% | 0% | 40% |

## Skill × Model Delta (with_skill − baseline)

| Skill | Claude 3 Haiku | Claude Sonnet 4 | Gemini 3 Flash | GPT-5.2 | GPT-5.4 Mini |
|-------|:---:|:---:|:---:|:---:|:---:|
| aml-source-of-funds | 🟢 +70% | 🟢 +30% | 🟢 +20% | 🟢 +20% | 🟢 +30% |
| building-regulations | 🟢 +80% | 🟢 +40% | 🟡 +10% | 🟢 +30% | 🟢 +40% |
| ca-protocol-compliance | 🟢 +68% | 🟢 +78% | 🟢 +35% | 🟢 +55% | 🟢 +68% |
| clc-compliance-tracker | 🟢 +40% | 🟢 +55% | 🟢 +36% | 🟢 +26% | 🟢 +55% |
| conveyancing-protocol-checklist | 🟢 +50% | 🔴 +0% | 🟢 +25% | 🔴 +0% | 🟢 +25% |
| cqs-practice-standards | 🔴 +0% | 🟢 +26% | 🟢 +26% | 🟡 +10% | 🟢 +18% |
| lease-impact-advisor | 🟢 +45% | 🟢 +46% | 🔴 +0% | 🟢 +16% | 🟢 +26% |
| lenders-handbook-prescreen | 🟢 +60% | 🟢 +80% | 🟢 +20% | 🟢 +70% | 🟢 +70% |
| property-law-reference | 🟢 +80% | 🟢 +100% | 🟢 +100% | 🟢 +100% | 🟢 +100% |
| restrictive-covenant-advisor | 🟢 +80% | 🟢 +30% | 🟡 +10% | 🟡 +10% | 🟡 +10% |
| sdlt-calculator | 🟢 +20% | 🟢 +100% | - | 🟢 +80% | 🟢 +60% |

## Recommendations

Skills to **keep** (consistent positive delta across models):
Skills to **improve** (positive delta on some models, not others):
Skills to **remove or rework** (zero or negative delta):

*Review delta matrix above to populate these categories.*

