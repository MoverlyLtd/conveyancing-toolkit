#!/usr/bin/env python3
"""Probe candidate skill topics across models to find gaps.

Sends specific conveyancing questions to multiple models and checks for
accuracy. Identifies topics where models fail — ideal skill opportunities.

Usage: python3 probe-topics.py
"""

import json, os, re, sys, time
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError

ANTHROPIC_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
OPENAI_KEY = os.environ.get("OPENAI_API_KEY", "")
GOOGLE_KEY = os.environ.get("GOOGLE_API_KEY", "")

MODELS = {
    "claude-sonnet": {"provider": "anthropic", "model": "claude-sonnet-4-20250514", "label": "Sonnet 4"},
    "claude-haiku": {"provider": "anthropic", "model": "claude-3-haiku-20240307", "label": "Haiku 3"},
    "gpt-54-mini": {"provider": "openai", "model": "gpt-5.4-mini", "label": "GPT-5.4m"},
    "gpt-52": {"provider": "openai", "model": "gpt-5.2", "label": "GPT-5.2"},
    "gemini-3-flash": {"provider": "google", "model": "gemini-3-flash-preview", "label": "Gem3F"},
}

# Each probe: question with known correct answer + key facts to check
PROBES = [
    {
        "id": "lr-fees",
        "topic": "Land Registry Fees",
        "question": "I'm buying a property for £350,000. What are the current Land Registry fees for registering the transfer? I'm using the online portal.",
        "correct": "£270 for online transfer of whole (Scale 1, £200,001-£500,000 band). Paper would be £540.",
        "check_facts": ["270", "online", "Scale 1"],
        "why_skill": "Fees changed in 2022 and again announced for changes. Models may have stale data."
    },
    {
        "id": "search-packs",
        "topic": "Property Search Costs & Types",
        "question": "What searches should a buyer's conveyancer order for a residential purchase in England, and roughly what do they cost in total? List all standard and recommended searches.",
        "correct": "Local authority search (£100-300), drainage/water (£50-80), environmental (£30-50), chancel repair liability (£20-30), coal mining (if applicable, £40-50). Total typically £250-500.",
        "check_facts": ["local authority", "drainage", "environmental", "chancel"],
        "why_skill": "Costs vary by region and provider. Models often miss chancel repair or coal mining."
    },
    {
        "id": "aml-source-of-funds",
        "topic": "AML Source of Funds Requirements",
        "question": "My client is buying a £750,000 property. They're using £200,000 from savings, £100,000 gift from parents, and £450,000 mortgage. What specific AML source of funds evidence do I need for each element under current SRA guidance?",
        "correct": "Savings: 12 months bank statements showing accumulation. Gift: giftor ID, giftor bank statements, signed gift letter confirming no repayment. Mortgage: mortgage offer from FCA-regulated lender. SRA requires risk-based approach, enhanced for gifts.",
        "check_facts": ["gift letter", "giftor", "bank statements", "12 months", "risk-based"],
        "why_skill": "SRA guidance updates frequently. Gift requirements are often incomplete in model responses."
    },
    {
        "id": "notice-to-complete",
        "topic": "Notice to Complete",
        "question": "Exchange happened on Monday 24 March 2025 with a contractual completion date of Friday 4 April 2025. The buyer fails to complete on 4 April. When can the seller serve a notice to complete under the Standard Conditions of Sale (5th Edition), and when does it expire?",
        "correct": "Notice can be served immediately after failure to complete (on or after 4 April). Under SC 6.8, gives 10 working days from service. If served 4 April (Friday), expires end of 17 April (Thursday) — excludes weekends but includes bank holidays unless they fall on a weekend.",
        "check_facts": ["10 working days", "6.8", "immediately"],
        "why_skill": "Working days calculation with SC refs. Models often get the timeline wrong."
    },
    {
        "id": "restrictive-covenant-indemnity",
        "topic": "Restrictive Covenant Indemnity Insurance",
        "question": "My client's property has a restrictive covenant against business use, but they want to run a small home office (not visible, no clients visiting). The covenant was imposed in 1965 and has never been enforced. What are the options and what would indemnity insurance typically cost?",
        "correct": "Options: (1) apply to Upper Tribunal for modification/discharge under s84 LPA 1925 (expensive, £1000+ legal fees), (2) obtain restrictive covenant indemnity insurance (one-off premium, typically £50-200 for low-risk home office). Insurance requirements: no prior approach to beneficiary, no enforcement history. Risk factors: age of covenant (60yr+, favourable), no enforcement (favourable), nature of breach (minimal, favourable).",
        "check_facts": ["s84", "indemnity insurance", "no approach to beneficiary", "Upper Tribunal"],
        "why_skill": "Insurance pricing and eligibility criteria are practical knowledge models often lack."
    },
    {
        "id": "exchange-deposit",
        "topic": "Exchange Deposit Rules",
        "question": "My client is buying at £400,000 with a 5% deposit mortgage (95% LTV). They only have £20,000 available. Standard 10% deposit is required on exchange. What are the options?",
        "correct": "Options: (1) Negotiate reduced deposit (5% = £20,000, needs seller agreement), (2) Deposit guarantee scheme/insurance (broker arranges guarantee for the other 5%), (3) Use related sale proceeds if in a chain (deposit passed up the chain). Under SC 2.2, deposit is 10% unless negotiated. If buyer defaults, seller can forfeit deposit and/or claim damages for the shortfall.",
        "check_facts": ["SC 2.2", "10%", "guarantee", "negotiate", "chain"],
        "why_skill": "Deposit guarantee schemes and chain mechanics are practical, not just legal knowledge."
    },
    {
        "id": "building-regs-sign-off",
        "topic": "Building Regulations Sign-Off",
        "question": "The property had a loft conversion done in 2019 but the seller has no building regulations completion certificate. The work was not done under a competent person scheme. What are the implications and remedies?",
        "correct": "Implications: without completion cert, work may not comply with Part B (fire), Part L (insulation), Part P (electrical). Lender may refuse to lend. Options: (1) Apply to local authority for regularisation certificate (retrospective approval, ~£400-800, involves inspection), (2) Obtain building regulations indemnity insurance (£50-150, but won't satisfy all lenders). Key: regularisation has no time limit. Indemnity insurance must be taken BEFORE any approach to local authority.",
        "check_facts": ["regularisation", "indemnity insurance", "before any approach", "Part B", "completion certificate"],
        "why_skill": "Regularisation vs indemnity decision tree is practical conveyancing knowledge."
    },
    {
        "id": "sdlt-additional-dwelling",
        "topic": "SDLT Additional Dwelling Surcharge",
        "question": "My client owns a property worth £180,000 that they live in. They're buying a second property for £300,000 to rent out. What's the total SDLT including the additional dwelling surcharge?",
        "correct": "Additional dwelling surcharge applies (5% on top of standard rates since Oct 2024). Standard: £0 on first £125k, 2% on £125k-250k = £2,500, 5% on £250k-300k = £2,500. Total standard = £5,000. Surcharge: 5% on £300,000 = £15,000. Grand total = £20,000.",
        "check_facts": ["20,000", "5%", "surcharge", "additional"],
        "why_skill": "Surcharge rate changed from 3% to 5% in October 2024. Many models still use 3%."
    },
    {
        "id": "leasehold-ground-rent",
        "topic": "Leasehold Reform Ground Rent",
        "question": "My client is buying a flat with a lease granted in 2015 that has a ground rent of £250 per year, doubling every 25 years. Is this an issue and what changed with the Leasehold Reform (Ground Rent) Act 2022?",
        "correct": "The 2022 Act only applies to NEW leases granted after 30 June 2022 (ground rent capped at peppercorn). This 2015 lease is NOT affected. However, doubling ground rent is a major red flag: it becomes £500 in 2040, £1,000 in 2065 etc. Some lenders won't lend if ground rent exceeds 0.1% of property value or £250/yr. The lease may need variation or the buyer should factor in lease extension costs.",
        "check_facts": ["30 June 2022", "new leases only", "peppercorn", "doubling", "lender"],
        "why_skill": "Common misconception that 2022 Act retrospectively fixes old leases. Lender ground rent policies are specific."
    },
    {
        "id": "party-wall",
        "topic": "Party Wall Act Requirements",
        "question": "My client is buying a semi-detached house and plans to build a single-storey rear extension that will be within 3 metres of the neighbour's building. Do they need a party wall notice, and what's the process and timeline?",
        "correct": "Yes, Party Wall etc Act 1996 applies. Section 6 notice required (adjacent excavation within 3m). Must serve notice at least 1 month before work starts. Neighbour has 14 days to consent or dissent. If dissent → party wall surveyor(s) appointed → party wall award. If no response after 14 days → deemed dissent. Cost: single surveyor £1,000-1,500, two surveyors £2,000-4,000. Common misconception: this is separate from planning permission.",
        "check_facts": ["Section 6", "1 month", "14 days", "dissent", "surveyor"],
        "why_skill": "Timeline, section references, and cost guidance. Models often confuse sections 1, 2, and 6."
    },
]

OUTPUT_DIR = Path(__file__).parent.parent / "evals-workspace" / "probes"

def call_model(model_key, prompt):
    m = MODELS[model_key]
    system = "Answer this UK conveyancing question as specifically as you can. Include exact figures, section references, and practical advice where relevant."
    
    if m["provider"] == "anthropic":
        body = json.dumps({"model": m["model"], "max_tokens": 2000, "system": system,
                          "messages": [{"role": "user", "content": prompt}]}).encode()
        req = Request("https://api.anthropic.com/v1/messages", data=body,
                     headers={"x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01",
                             "content-type": "application/json"})
    elif m["provider"] == "openai":
        body = json.dumps({"model": m["model"], "max_completion_tokens": 2000,
                          "messages": [{"role": "system", "content": system},
                                      {"role": "user", "content": prompt}]}).encode()
        req = Request("https://api.openai.com/v1/chat/completions", data=body,
                     headers={"Authorization": f"Bearer {OPENAI_KEY}", "content-type": "application/json"})
    else:  # google
        body = json.dumps({"contents": [{"parts": [{"text": f"{system}\n\n{prompt}"}]}]}).encode()
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{m['model']}:generateContent?key={GOOGLE_KEY}"
        req = Request(url, data=body, headers={"content-type": "application/json"})
    
    for attempt in range(3):
        try:
            with urlopen(req, timeout=90) as resp:
                data = json.loads(resp.read())
                if m["provider"] == "openai":
                    return data["choices"][0]["message"]["content"]
                elif m["provider"] == "google":
                    return data["candidates"][0]["content"]["parts"][0]["text"]
                else:
                    return "".join(b["text"] for b in data.get("content", []) if b.get("type") == "text")
        except HTTPError as e:
            if e.code == 429 and attempt < 2:
                time.sleep(int(e.headers.get("retry-after", 15)))
            else:
                return f"ERROR: HTTP {e.code}"
    return "ERROR: max retries"

def check_response(response, check_facts):
    """Simple fact-checking: how many key facts appear in the response."""
    response_lower = response.lower()
    hits = sum(1 for fact in check_facts if fact.lower() in response_lower)
    return hits, len(check_facts)

def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    results = []
    print(f"Probing {len(PROBES)} topics × {len(MODELS)} models = {len(PROBES) * len(MODELS)} calls\n")
    
    for probe in PROBES:
        print(f"  {probe['id']}: {probe['topic']}")
        probe_results = {"id": probe["id"], "topic": probe["topic"], "models": {}}
        
        for model_key, model_info in MODELS.items():
            out_file = OUTPUT_DIR / probe["id"] / f"{model_key}.md"
            
            if out_file.exists():
                response = out_file.read_text()
                print(f"    {model_info['label']}: cached", end="")
            else:
                print(f"    {model_info['label']}...", end=" ", flush=True)
                response = call_model(model_key, probe["question"])
                out_file.parent.mkdir(parents=True, exist_ok=True)
                out_file.write_text(response)
                time.sleep(1.5)
            
            hits, total = check_response(response, probe["check_facts"])
            print(f" [{hits}/{total} facts]")
            
            probe_results["models"][model_key] = {
                "label": model_info["label"],
                "facts_hit": hits,
                "facts_total": total,
                "score": hits / total if total > 0 else 0,
            }
        
        results.append(probe_results)
        print()
    
    # Generate summary
    lines = [
        "# Skill Opportunity Probes\n",
        f"**Date:** {time.strftime('%Y-%m-%d')}",
        f"**Method:** Quick fact-check (keyword presence) — not LLM-judged\n",
        "## Results Matrix (facts hit / total)\n",
    ]
    
    model_keys = list(MODELS.keys())
    header = "| Topic | " + " | ".join(MODELS[m]["label"] for m in model_keys) + " | Avg | Opportunity? |"
    sep = "|-------|" + "|".join(":---:" for _ in model_keys) + "|:---:|:---:|"
    lines.append(header)
    lines.append(sep)
    
    for r in results:
        row = f"| {r['topic']} |"
        scores = []
        for mk in model_keys:
            m = r["models"].get(mk, {})
            h, t = m.get("facts_hit", 0), m.get("facts_total", 1)
            pct = int(m.get("score", 0) * 100)
            scores.append(pct)
            emoji = "✅" if pct >= 80 else ("⚠️" if pct >= 50 else "❌")
            row += f" {emoji} {h}/{t} |"
        avg = sum(scores) / len(scores) if scores else 0
        opp = "🎯 HIGH" if avg < 50 else ("📊 MEDIUM" if avg < 75 else "➖ LOW")
        row += f" {avg:.0f}% | {opp} |"
        lines.append(row)
    
    lines.append("\n## Recommended New Skills (sorted by opportunity)\n")
    sorted_results = sorted(results, key=lambda r: sum(r["models"][mk].get("score", 0) for mk in model_keys) / len(model_keys))
    
    for i, r in enumerate(sorted_results, 1):
        avg = sum(r["models"][mk].get("score", 0) for mk in model_keys) / len(model_keys) * 100
        probe = next(p for p in PROBES if p["id"] == r["id"])
        lines.append(f"{i}. **{r['topic']}** (avg {avg:.0f}% baseline) — {probe['why_skill']}")
    
    summary = "\n".join(lines) + "\n"
    (OUTPUT_DIR / "PROBE_RESULTS.md").write_text(summary)
    
    # Also save raw results
    with open(OUTPUT_DIR / "probe-results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print(summary)

if __name__ == "__main__":
    main()
