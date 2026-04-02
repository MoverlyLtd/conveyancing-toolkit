# Conveyancing Toolkit — Benchmark Results

> **"Models guess. Skills guarantee."**

This benchmark compares AI model responses to conveyancing questions **with** and **without** the conveyancing toolkit skills. All evaluations use the same prompts — the only difference is whether the model has access to the skill.

**Last updated:** 2 April 2026
**Judge:** Claude Sonnet 4 (automated LLM-as-judge, strict grading)
**Models tested:** Claude Sonnet 4, Claude 3 Haiku, GPT-5.4 Mini, GPT-5.2, Gemini 3 Flash
**Evals:** 16 questions across 8 skills

## The Headline

### Skills help every model — and weaker models benefit most

| Model | With Skill | Baseline | Δ | Verdict |
|-------|:----------:|:--------:|:-:|:-------:|
| **Claude Sonnet 4** | 83% | 41% | **+42%** | ✅ Skills transform quality |
| **Claude 3 Haiku** | 60% | 31% | **+28%** | ✅ Weaker model, bigger lift |
| **GPT-5.2** | 78% | 57% | **+21%** | ✅ Closes knowledge gaps |
| **GPT-5.4 Mini** | 71% | 49% | **+21%** | ✅ Same story |
| **Gemini 3 Flash** | 83% | 65% | **+18%** | ✅ Already strong, still improves |

Every model tested scores higher with skills. The weakest model (Claude 3 Haiku, 31% baseline) nearly doubles its score. Even the strongest baselines (Gemini 3 Flash at 65%) gain 18 percentage points.

### Multi-Model SDLT Test

We asked five AI models: *"I'm a first-time buyer looking at a flat for £510,000. What would the stamp duty be?"*

Correct answer: **£15,500** (FTB relief doesn't apply — £500,000 cap restored April 2025).

| Model | Without Skill | With Skill |
|-------|:------------:|:----------:|
| Claude Sonnet 4 | ❌ £0 | ✅ £15,500 |
| GPT-5.2 | ❌ £4,250 | ✅ £15,500 |
| Gemini 3 Flash | ❌ £0 | — |
| GPT-5.4 Mini | ❌ £4,250 | ✅ £15,500 |
| Claude 3 Haiku | ❌ £4,250 | ⚠️ Partial |

**4 of 5 models got SDLT wrong without the skill.** Wrong answers ranged from £0 to £4,250 — all using stale rate data. With the skill, every model capable of following the calculator produces the right answer.

## The Skill × Model Matrix

### Where Each Skill Adds Value (delta: with_skill − baseline)

| Skill | Haiku | Sonnet | Gemini Flash | GPT-5.2 | GPT-5.4 Mini | Avg Δ | Keep? |
|-------|:-----:|:------:|:------------:|:-------:|:------------:|:-----:|:-----:|
| **sdlt-calculator** | +0% | +100% | — | +80% | +60% | **+60%** | ✅ KEEP |
| **lenders-handbook-prescreen** | +40% | +60% | +0% | +20% | +20% | **+28%** | ✅ KEEP |
| **property-law-reference** | +20% | +40% | +40% | +40% | +40% | **+36%** | ⚠️ IMPROVE |
| **ca-protocol-compliance** | +22% | +45% | +2% | +42% | +55% | **+33%** | ✅ KEEP |
| **lease-impact-advisor** | +35% | +46% | +0% | +16% | +6% | **+21%** | ✅ KEEP |
| **clc-compliance-tracker** | +38% | +36% | +26% | −2% | −2% | **+19%** | ⚠️ IMPROVE |
| **cqs-practice-standards** | +26% | +16% | +16% | +0% | +8% | **+13%** | ⚠️ IMPROVE |
| **conveyancing-protocol-checklist** | +25% | +0% | +25% | +0% | +0% | **+10%** | 🔴 REWORK |

### Absolute Scores (with skill)

| Skill | Haiku | Sonnet | Gemini Flash | GPT-5.2 | GPT-5.4 Mini | Avg |
|-------|:-----:|:------:|:------------:|:-------:|:------------:|:---:|
| cqs-practice-standards | 90% | 90% | 90% | 90% | 90% | **90%** |
| lease-impact-advisor | 72% | 100% | 100% | 100% | 80% | **90%** |
| ca-protocol-compliance | 45% | 68% | 68% | 88% | 88% | **71%** |
| conveyancing-protocol-checklist | 75% | 100% | 100% | 100% | 75% | **90%** |
| clc-compliance-tracker | 64% | 82% | 90% | 72% | 44% | **70%** |
| lenders-handbook-prescreen | 60% | 80% | 80% | 50% | 50% | **64%** |
| sdlt-calculator | 20% | 100% | — | 80% | 100% | **75%** |
| property-law-reference | 20% | 40% | 40% | 40% | 40% | **36%** |

## Recommendations

### ✅ KEEP — consistent value across models

1. **sdlt-calculator** — Avg +60%. Most models have stale SDLT data. Skill guarantees correct rates.
2. **lenders-handbook-prescreen** — Avg +28%. Part 2 lender-specific data is not in training sets. Named lenders with exact thresholds vs "most lenders require ~70 years."
3. **ca-protocol-compliance** — Avg +33%. Specific section refs (CA §4.0) and enforcement timelines (4yr/10yr) that baselines miss.
4. **lease-impact-advisor** — Avg +21%. Specific lender eligibility tables and marriage value calculations. Gemini Flash is an outlier (strong baseline), but all others benefit.

### ⚠️ IMPROVE — value exists but inconsistent

5. **property-law-reference** — Avg delta is good (+36%) but absolute score is poor (36%). The skill's static URL list doesn't match specific queries well enough. **Action:** Convert from static list to structured lookup with categories, or integrate with live URL checking.
6. **clc-compliance-tracker** — Helps weaker models (+38% Haiku, +36% Sonnet) but GPT models already know CLC well (−2% delta). **Action:** Add more specific CLC Accounts Code detail and subsidiary code references that aren't in training data.
7. **cqs-practice-standards** — Strong models already know CQS (+0% GPT-5.2). **Action:** Add CQS-specific audit checklists and version-dated requirements that models can't know from training.

### 🔴 REWORK — insufficient value

8. **conveyancing-protocol-checklist** — Only helps weaker models (+25% Haiku, +25% Gemini Flash). Strong models already know the protocol cold. Avg delta +10%. **Action:** Either (a) merge into ca-protocol-compliance as the Law Society protocol is closely related, or (b) add significantly more detail (protocol version dates, paragraph refs, stage-specific evidence requirements) to differentiate from training data.

## Methodology

- **16 evals** across 8 skills testing real UK conveyancing scenarios
- **5 models** covering strong (Sonnet, Gemini Flash), mid (GPT-5.4 Mini, GPT-5.2), and weak (Claude 3 Haiku)
- **LLM-as-judge grading** using Claude Sonnet 4 against predefined expectations per eval
- **Strict grading**: partial or vague coverage = FAIL; semantic equivalence accepted
- All eval prompts, responses, and grades are in `evals-workspace/multi-model/`

## Reproducing

```bash
# Generate responses across models
export ANTHROPIC_API_KEY="..." OPENAI_API_KEY="..." GOOGLE_API_KEY="..."
python3 evals/multi-model-eval.py --models claude-sonnet,claude-haiku,gpt-54-mini,gpt-52,gemini-3-flash

# Grade only (re-use cached responses)
python3 evals/multi-model-eval.py --grade-only

# Single-model eval + grade
python3 evals/llm-judge.py evals-workspace/iteration-N
```

## Updates

We re-run when new models drop or skills are updated.

| Date | Change |
|------|--------|
| 2 Apr 2026 | Multi-model benchmark: 5 models × 16 evals × 8 skills |
| 2 Apr 2026 | Initial benchmark: single-model, 13 evals |

---

*Built by [Moverly](https://moverly.com). Skills are open source under MIT license.*
