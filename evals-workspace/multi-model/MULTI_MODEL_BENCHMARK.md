# Conveyancing Toolkit — Multi-Model Benchmark

**Judge model:** claude-sonnet-4-20250514
**Date:** 2026-04-02

## Model Comparison (averaged across all evals)

| Model | With Skill | Baseline | Δ | Skill Helps? |
|-------|:----------:|:--------:|:-:|:------------:|
| Claude 3 Haiku | 60% | 31% | +28% | ✅ Yes |
| Claude Sonnet 4 | 83% | 41% | +42% | ✅ Yes |
| Gemini 3 Flash | 83% | 65% | +18% | ✅ Yes |
| GPT-5.2 | 78% | 57% | +21% | ✅ Yes |
| GPT-5.4 Mini | 71% | 49% | +21% | ✅ Yes |

## Skill × Model Matrix (with_skill score)

| Skill | Claude 3 Haiku | Claude Sonnet 4 | Gemini 3 Flash | GPT-5.2 | GPT-5.4 Mini |
|-------|:---:|:---:|:---:|:---:|:---:|
| ca-protocol-compliance | 45% | 68% | 68% | 88% | 88% |
| clc-compliance-tracker | 64% | 82% | 90% | 72% | 44% |
| conveyancing-protocol-checklist | 75% | 100% | 100% | 100% | 75% |
| cqs-practice-standards | 90% | 90% | 90% | 90% | 90% |
| lease-impact-advisor | 72% | 100% | 100% | 100% | 80% |
| lenders-handbook-prescreen | 60% | 80% | 80% | 50% | 50% |
| property-law-reference | 20% | 40% | 40% | 40% | 40% |
| sdlt-calculator | 20% | 100% | - | 80% | 100% |

## Skill × Model Matrix (baseline score)

| Skill | Claude 3 Haiku | Claude Sonnet 4 | Gemini 3 Flash | GPT-5.2 | GPT-5.4 Mini |
|-------|:---:|:---:|:---:|:---:|:---:|
| ca-protocol-compliance | 22% | 22% | 65% | 45% | 32% |
| clc-compliance-tracker | 25% | 45% | 64% | 74% | 45% |
| conveyancing-protocol-checklist | 50% | 100% | 75% | 100% | 75% |
| cqs-practice-standards | 64% | 74% | 74% | 90% | 82% |
| lease-impact-advisor | 36% | 54% | 100% | 84% | 74% |
| lenders-handbook-prescreen | 20% | 20% | 80% | 30% | 30% |
| property-law-reference | 0% | 0% | 0% | 0% | 0% |
| sdlt-calculator | 20% | 0% | 0% | 0% | 40% |

## Skill × Model Delta (with_skill − baseline)

| Skill | Claude 3 Haiku | Claude Sonnet 4 | Gemini 3 Flash | GPT-5.2 | GPT-5.4 Mini |
|-------|:---:|:---:|:---:|:---:|:---:|
| ca-protocol-compliance | 🟢 +22% | 🟢 +45% | 🟡 +2% | 🟢 +42% | 🟢 +55% |
| clc-compliance-tracker | 🟢 +38% | 🟢 +36% | 🟢 +26% | 🔴 -2% | 🔴 -2% |
| conveyancing-protocol-checklist | 🟢 +25% | 🔴 +0% | 🟢 +25% | 🔴 +0% | 🔴 +0% |
| cqs-practice-standards | 🟢 +26% | 🟢 +16% | 🟢 +16% | 🔴 +0% | 🟡 +8% |
| lease-impact-advisor | 🟢 +35% | 🟢 +46% | 🔴 +0% | 🟢 +16% | 🟡 +6% |
| lenders-handbook-prescreen | 🟢 +40% | 🟢 +60% | 🔴 +0% | 🟢 +20% | 🟢 +20% |
| property-law-reference | 🟢 +20% | 🟢 +40% | 🟢 +40% | 🟢 +40% | 🟢 +40% |
| sdlt-calculator | 🔴 +0% | 🟢 +100% | - | 🟢 +80% | 🟢 +60% |

## Recommendations

Skills to **keep** (consistent positive delta across models):
Skills to **improve** (positive delta on some models, not others):
Skills to **remove or rework** (zero or negative delta):

*Review delta matrix above to populate these categories.*

