# Contributing

We welcome contributions to the conveyancing skills collection.

## Adding a New Skill

Each skill is a self-contained directory under `skills/`:

```
skills/your-skill/
├── SKILL.md              # Required: instructions for the agent
├── scripts/              # Optional: deterministic tools
│   └── your-script.sh
└── references/           # Optional: detailed knowledge
    └── your-reference.md
```

### SKILL.md Requirements

- YAML frontmatter with `name` and `description`
- Description must contain all trigger phrases (how the agent knows when to use this skill)
- Clear instructions for: when to use, how to use, what to present to the user
- Reference bundled scripts and files using `{{SKILL_DIR}}` placeholder

### Guidelines

- **Deterministic over probabilistic.** If there's a calculation, write a script. Don't rely on the LLM getting numbers right.
- **Self-contained.** Skills should work without external dependencies beyond standard shell tools.
- **Accurate.** Legal and financial information must cite sources. Include effective dates for rates and thresholds.
- **Agent-native.** Write the SKILL.md for an AI agent, not a human developer. Clear instructions, structured output guidance, explicit edge case handling.

## Improving Existing Skills

- Rate/threshold updates (cite the source)
- Bug fixes in calculation scripts
- Better edge case handling
- Clearer agent instructions

## Pull Requests

1. Fork the repo
2. Create a branch for your change
3. Test your skill with at least one agent platform
4. Submit a PR with a description of what the skill does and how you tested it

## Questions?

Open an issue or reach out at [moverly.com](https://moverly.com).
