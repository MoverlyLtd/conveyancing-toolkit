# Conveyancing Toolkit — Multi-Model Benchmark

**Judge model:** claude-sonnet-4-20250514
**Date:** 2026-04-02

## Model Comparison (averaged across all evals)

| Model | With Skill | Baseline | Δ | Skill Helps? |
|-------|:----------:|:--------:|:-:|:------------:|
| Claude 3 Haiku | 67% | 23% | +43% | ✅ Yes |
| Claude Sonnet 4 | 93% | 63% | +30% | ✅ Yes |
| Gemini 3 Flash | 90% | 87% | +3% | ➖ Marginal |
| GPT-5.2 | 90% | 80% | +10% | ✅ Yes |
| GPT-5.4 Mini | 77% | 73% | +3% | ➖ Marginal |

## Skill × Model Matrix (with_skill score)

| Skill | Claude 3 Haiku | Claude Sonnet 4 | Gemini 3 Flash | GPT-5.2 | GPT-5.4 Mini |
|-------|:---:|:---:|:---:|:---:|:---:|
| aml-source-of-funds | 80% | 90% | 90% | 90% | 80% |
| building-regulations | 80% | 100% | 100% | 90% | 80% |
| restrictive-covenant-advisor | 40% | 90% | 80% | 90% | 70% |

## Skill × Model Matrix (baseline score)

| Skill | Claude 3 Haiku | Claude Sonnet 4 | Gemini 3 Flash | GPT-5.2 | GPT-5.4 Mini |
|-------|:---:|:---:|:---:|:---:|:---:|
| aml-source-of-funds | 30% | 70% | 80% | 80% | 70% |
| building-regulations | 20% | 60% | 90% | 70% | 60% |
| restrictive-covenant-advisor | 20% | 60% | 90% | 90% | 90% |

## Skill × Model Delta (with_skill − baseline)

| Skill | Claude 3 Haiku | Claude Sonnet 4 | Gemini 3 Flash | GPT-5.2 | GPT-5.4 Mini |
|-------|:---:|:---:|:---:|:---:|:---:|
| aml-source-of-funds | 🟢 +50% | 🟢 +20% | 🟡 +10% | 🟡 +10% | 🟡 +10% |
| building-regulations | 🟢 +60% | 🟢 +40% | 🟡 +10% | 🟢 +20% | 🟢 +20% |
| restrictive-covenant-advisor | 🟢 +20% | 🟢 +30% | 🔴 -10% | 🔴 +0% | 🔴 -20% |

## Recommendations

Skills to **keep** (consistent positive delta across models):
Skills to **improve** (positive delta on some models, not others):
Skills to **remove or rework** (zero or negative delta):

*Review delta matrix above to populate these categories.*

