# Conveyancing Toolkit — Multi-Model Benchmark

**Judge model:** claude-sonnet-4-20250514
**Date:** 2026-04-02

## Model Comparison (averaged across all evals)

| Model | With Skill | Baseline | Δ | Skill Helps? |
|-------|:----------:|:--------:|:-:|:------------:|
| Claude 3 Haiku | 100% | 23% | +77% | ✅ Yes |
| Claude Sonnet 4 | 97% | 63% | +33% | ✅ Yes |
| Gemini 3 Flash | 100% | 87% | +13% | ✅ Yes |
| GPT-5.2 | 100% | 80% | +20% | ✅ Yes |
| GPT-5.4 Mini | 100% | 73% | +27% | ✅ Yes |

## Skill × Model Matrix (with_skill score)

| Skill | Claude 3 Haiku | Claude Sonnet 4 | Gemini 3 Flash | GPT-5.2 | GPT-5.4 Mini |
|-------|:---:|:---:|:---:|:---:|:---:|
| aml-source-of-funds | 100% | 100% | 100% | 100% | 100% |
| building-regulations | 100% | 100% | 100% | 100% | 100% |
| restrictive-covenant-advisor | 100% | 90% | 100% | 100% | 100% |

## Skill × Model Matrix (baseline score)

| Skill | Claude 3 Haiku | Claude Sonnet 4 | Gemini 3 Flash | GPT-5.2 | GPT-5.4 Mini |
|-------|:---:|:---:|:---:|:---:|:---:|
| aml-source-of-funds | 30% | 70% | 80% | 80% | 70% |
| building-regulations | 20% | 60% | 90% | 70% | 60% |
| restrictive-covenant-advisor | 20% | 60% | 90% | 90% | 90% |

## Skill × Model Delta (with_skill − baseline)

| Skill | Claude 3 Haiku | Claude Sonnet 4 | Gemini 3 Flash | GPT-5.2 | GPT-5.4 Mini |
|-------|:---:|:---:|:---:|:---:|:---:|
| aml-source-of-funds | 🟢 +70% | 🟢 +30% | 🟢 +20% | 🟢 +20% | 🟢 +30% |
| building-regulations | 🟢 +80% | 🟢 +40% | 🟡 +10% | 🟢 +30% | 🟢 +40% |
| restrictive-covenant-advisor | 🟢 +80% | 🟢 +30% | 🟡 +10% | 🟡 +10% | 🟡 +10% |

## Recommendations

Skills to **keep** (consistent positive delta across models):
Skills to **improve** (positive delta on some models, not others):
Skills to **remove or rework** (zero or negative delta):

*Review delta matrix above to populate these categories.*

