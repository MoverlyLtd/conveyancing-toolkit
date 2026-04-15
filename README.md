# Conveyancing Toolkit

Free, open-source AI skills for UK residential conveyancing.

Built by [Moverly](https://moverly.com). Open to everyone.

---

## What this is

AI skills that give conveyancers instant access to structured property intelligence — lender requirements, SDLT calculations, lease assessments — through the AI tools you already use.

Every skill is **free, open source, and MIT-licensed**. No subscription. No API key. No vendor lock-in.

## Skills

| Skill | What it does |
|-------|-------------|
| **[SDLT Calculator](sdlt-calculator/)** | Stamp Duty Land Tax — standard, first-time buyer, additional property, non-UK resident. Uses live rates, updated automatically. |
| **[Lease Impact Advisor](lease-impact-advisor/)** | Leasehold saleability assessment — risk banding, lender eligibility for 13 major lenders, extension cost estimates. |
| **[Lenders Handbook Pre-Screen](lenders-handbook-prescreen/)** | Full UK Finance Lender's Handbook Part 1 (90+ checks) plus Part 2 requirements for 67 individual lenders. |

More skills are coming — search report analysers, protocol compliance checkers, building regulations advisors, and more. [Tell us what you need.](https://github.com/MoverlyLtd/conveyancing-toolkit/issues)

---

## How to install

### ChatGPT

1. Go to [chatgpt.com](https://chatgpt.com) and start a new chat
2. Click the **paperclip icon** (📎) or drag and drop files
3. Upload the `SKILL.md` file from whichever skill you want (e.g. `sdlt-calculator/SKILL.md`)
4. For skills with scripts, also upload the files from the `scripts/` folder (e.g. `sdlt-calculator/scripts/sdlt-rates.json` and `sdlt-calculator/scripts/calculate-sdlt.js`)
5. That's it — just ask your question naturally

**Example:** Upload the SDLT Calculator files, then type:
> "Calculate stamp duty on a £425,000 purchase for a first-time buyer"

**Tip:** You can save a skill as a custom GPT so you don't need to upload the files every time. Click your name → My GPTs → Create a GPT, and paste the SKILL.md contents as instructions.

### Claude (claude.ai)

1. Go to [claude.ai](https://claude.ai) and start a new chat
2. Click the **paperclip icon** (📎) to attach files
3. Upload the `SKILL.md` file and any files from `scripts/` and `references/`
4. Ask your question

**Example:** Upload the Lease Impact Advisor files, then type:
> "My client's property has 72 years on the lease. Which lenders will accept this?"

**Tip:** Create a Claude Project to keep skills loaded permanently. Go to Projects → New Project, add the skill files to the project knowledge, and every conversation in that project will have the skill available.

### Claude Code (terminal)

If you use Claude Code, just clone the repo and work from the directory:

```bash
git clone https://github.com/MoverlyLtd/conveyancing-toolkit.git
cd conveyancing-toolkit
claude
```

Claude Code will automatically read the skill files when relevant to your question.

### Cursor

Add the toolkit folder to your Cursor workspace. Cursor reads the `SKILL.md` files automatically and uses the reference data and scripts when you ask relevant questions.

### Other AI tools

These skills work with any AI tool that can read files or supports the Model Context Protocol (MCP). Each skill is just a markdown file with instructions, plus helper scripts and reference data — no special integration required.

---

## What can I ask?

Once you've loaded a skill, just ask questions in plain English:

**SDLT Calculator:**
- "What's the stamp duty on a £650,000 house?"
- "SDLT for a £300,000 first-time buyer purchase"
- "Calculate stamp duty on a £950,000 second home"

**Lease Impact Advisor:**
- "This flat has 68 years on the lease — can they get a mortgage?"
- "Which lenders accept a 72-year lease?"
- "What's the estimated cost to extend a 65-year lease on a £350,000 flat?"

**Lenders Handbook Pre-Screen:**
- "Pre-screen this property against Nationwide's handbook requirements"
- "Does HSBC need to be notified about Japanese knotweed?"
- "What does Santander's Part 2 say about new-build properties?"

---

## Why skills, not just asking the AI?

AI models are trained on data that goes stale. Tax rates change on budget day. Lender thresholds change quarterly.

When we tested SDLT calculations across five leading models, **three out of five got it wrong** — the same wrong answer, confidently delivered:

| Model | Without Skill | With Skill |
|-------|:---:|:---:|
| Claude Opus 4 | ✅ Correct | ✅ Correct |
| GPT-5.4 Mini | ✅ Correct | ✅ Correct |
| GPT-5.2 | ❌ Wrong | ✅ Correct |
| Gemini 3 Flash | ❌ Wrong | ✅ Correct |
| Gemini 2.5 Pro | ❌ Wrong | ✅ Correct |

Skills fix this because they give the AI live, structured data instead of relying on its training. When rates change, the skill is updated and every user gets the right answer immediately.

---

## Contributing

We want this to become the profession's toolkit — not just ours.

**Ideas for new skills:**
- Pre-exchange checklists
- Completion statement calculators
- Search report analysers
- Protocol compliance checkers
- Building regulations advisors

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add a skill. Every contribution stays MIT-licensed and free forever.

---

## About

Built and maintained by [Moverly](https://moverly.com) · [MIT License](LICENSE) · [Documentation](docs/)
