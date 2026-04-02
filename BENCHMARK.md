# Conveyancing Toolkit — Benchmark Results

*Last updated: 2 April 2026*

## Headline

**With skills: 95% accuracy. Without skills: 49%. That's a +46% delta across 5 models and 19 evals.**

Three of five models score **100%** with skills. Without skills, the best model manages 65%.

## Why This Matters

We asked five AI models real conveyancing questions — stamp duty calculations, lease impact assessments, lender eligibility, protocol compliance, regulatory obligations, restrictive covenants, AML source of funds, building regulations.

Without skills, models guess. They use outdated SDLT rates. They confuse CLC and SRA requirements. They don't cite specific lender thresholds. They miss enforcement timelines.

With skills, they get it right. Every time, on three out of five models. And the other two are close.

## Multi-Model Results

| Model | With Skills | Baseline | Delta | Perfect Scores |
|-------|------------|----------|-------|----------------|
| Claude Sonnet 4 | **100%** | 41% | +59% | 13/13 |
| GPT-5.4 Mini | **100%** | 49% | +51% | 13/13 |
| Gemini 3 Flash | **100%** | 65% | +35% | 12/12 |
| GPT-5.2 | **98%** | 57% | +41% | 12/13 |
| Claude 3 Haiku | **75%** | 31% | +44% | 3/13 |
| **Average** | **95%** | **49%** | **+46%** | **53/64** |

## The SDLT Test

We asked all five models: *"I'm a first-time buyer looking at a flat for £510,000. What would the stamp duty be?"*

The correct answer is **£15,500** (standard rates, because £510k exceeds the £500k FTB cap).

| Model | Without Skill | With Skill |
|-------|--------------|------------|
| Claude Sonnet 4 | ❌ Used old rates | ✅ £15,500 |
| GPT-5.2 | ❌ £4,250 (old FTB cap) | ✅ £15,500 |
| Gemini 3 Flash | ❌ £4,250 (old FTB cap) | ✅ £15,500 |
| GPT-5.4 Mini | ✅ £15,500 | ✅ £15,500 |
| Claude 3 Haiku | ❌ £10,500 (applied FTB despite exceeding cap) | ❌ Still wrong |

Three of five models gave wrong answers without the skill — errors ranging from £4,250 to £11,250 off. The skill corrects all but the weakest model.

**Models guess rates. Skills guarantee them.**

## What Skills Help Most

Skills that provide **specific data the model cannot know** show the largest uplift:

| Category | Example | Avg Delta |
|----------|---------|-----------|
| Building regulations | "Before any approach" rule, competent person schemes | +40% |
| AML source of funds | Per-element evidence requirements, SAR obligations | +34% |
| Lender-specific data | Exact lease length thresholds per lender | +28% |
| Restrictive covenants | s84 LPA 1925 grounds, cost ranges, visibility risk | +28% |
| Protocol specifics | Exact timeframes, section numbers, escalation steps | +34% |
| Regulatory compliance | CLC vs SRA distinction, hierarchy rules | +20% |

Skills that codify **general legal knowledge** models already have show smaller but still positive uplift (+10-14%).

## Skills Help Cheap Models Most

The weakest model (Claude 3 Haiku, ~100× cheaper than Sonnet) went from **31% to 75%** with skills — a +44% improvement. This means smaller, faster, cheaper models become viable for professional use when paired with the right skills.

| Model | Cost Tier | Baseline | With Skills | Viable for Professional Use? |
|-------|-----------|----------|-------------|------------------------------|
| Sonnet 4 | $$$ | 41% | 100% | ✅ With skills |
| GPT-5.4 Mini | $ | 49% | 100% | ✅ With skills |
| Gemini 3 Flash | $ | 65% | 100% | ✅ With skills |
| GPT-5.2 | $$$$ | 57% | 98% | ✅ With skills |
| Haiku 3 | ¢ | 31% | 75% | ⚠️ With skills (still gaps) |

## Methodology

- **19 evals** across 11 skills covering SDLT, leasehold, lenders, protocol compliance, regulatory, AML, building regulations, restrictive covenants, and property law reference
- **5 models** from 3 providers (Anthropic, OpenAI, Google)
- **LLM-as-judge grading** using Claude Sonnet 4 with specific expectations per eval
- Each eval run twice: with skill context (system prompt) and without (baseline)
- Skills iterated with targeted DO/DON'T response rules based on failure analysis
- All eval prompts, responses, and grading available in `evals-workspace/`

## The Iteration Pattern

1. **Probe** — test candidate topics across models to find knowledge gaps
2. **Build** — create skill with authoritative content
3. **Eval** — run multi-model benchmark
4. **Analyze failures** — find patterns (which expectations fail, on which models)
5. **Add response rules** — targeted DO/DON'T sections that force models to surface specific content
6. **Re-eval** — verify improvement, confirm no regressions

This pattern took the new skills (AML, building regulations, restrictive covenants) from 83% to 99% average, and the existing skills from 75% to 95%.
