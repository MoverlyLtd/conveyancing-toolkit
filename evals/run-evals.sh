#!/bin/bash
# Conveyancing Toolkit Eval Runner
# Runs with-skill vs baseline comparisons for all eval prompts
# Usage: ./run-evals.sh [--skill sdlt-calculator] [--iteration 1] [--model claude-sonnet-4-6]

set -euo pipefail

TOOLKIT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
EVALS_FILE="$TOOLKIT_DIR/evals/evals.json"
WORKSPACE="$TOOLKIT_DIR/evals-workspace"
SKILL_FILTER=""
ITERATION=1
MODEL="claude-sonnet-4-6"

while [[ $# -gt 0 ]]; do
  case $1 in
    --skill) SKILL_FILTER="$2"; shift 2 ;;
    --iteration) ITERATION="$2"; shift 2 ;;
    --model) MODEL="$2"; shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

ITER_DIR="$WORKSPACE/iteration-${ITERATION}"
mkdir -p "$ITER_DIR"

echo "=== Conveyancing Toolkit Eval Runner ==="
echo "Model: $MODEL"
echo "Iteration: $ITERATION"
echo "Skill filter: ${SKILL_FILTER:-all}"
echo "Workspace: $ITER_DIR"
echo ""

# Parse evals
EVAL_COUNT=$(node -e "
  const evals = JSON.parse(require('fs').readFileSync('$EVALS_FILE', 'utf8')).evals;
  const filtered = '${SKILL_FILTER}' ? evals.filter(e => e.skill === '${SKILL_FILTER}') : evals;
  console.log(filtered.length);
")

echo "Running $EVAL_COUNT eval(s)..."
echo ""

# Generate eval configs for each test
node -e "
  const evals = JSON.parse(require('fs').readFileSync('$EVALS_FILE', 'utf8')).evals;
  const filtered = '${SKILL_FILTER}' ? evals.filter(e => e.skill === '${SKILL_FILTER}') : evals;
  
  filtered.forEach(ev => {
    const evalDir = '${ITER_DIR}/eval-' + ev.id + '-' + ev.skill;
    const fs = require('fs');
    
    // Create directories
    fs.mkdirSync(evalDir + '/with_skill/outputs', { recursive: true });
    fs.mkdirSync(evalDir + '/without_skill/outputs', { recursive: true });
    
    // Write eval metadata
    fs.writeFileSync(evalDir + '/eval_metadata.json', JSON.stringify({
      eval_id: ev.id,
      eval_name: ev.skill + '-' + ev.id,
      skill: ev.skill,
      prompt: ev.prompt,
      expected_output: ev.expected_output,
      assertions: ev.expectations.map(e => ({ text: e }))
    }, null, 2));
    
    // Write prompts for runner
    fs.writeFileSync(evalDir + '/with_skill/prompt.txt', ev.prompt);
    fs.writeFileSync(evalDir + '/without_skill/prompt.txt', ev.prompt);
    
    console.log('Prepared: eval-' + ev.id + ' (' + ev.skill + ')');
  });
"

echo ""
echo "=== Eval directories prepared ==="
echo ""
echo "To run evals in Claude Code:"
echo ""
echo "For each eval directory, spawn two parallel subagents:"
echo ""
echo "1. WITH SKILL (install plugin first):"
echo "   /plugin install ${SKILL_FILTER:-<skill>}@conveyancing-toolkit"
echo "   Then run the prompt from with_skill/prompt.txt"
echo "   Save response to with_skill/outputs/response.md"
echo ""
echo "2. WITHOUT SKILL (baseline, no plugin):"
echo "   Same prompt, no skill installed"  
echo "   Save response to without_skill/outputs/response.md"
echo ""
echo "Then grade with: node evals/grade.js $ITER_DIR"
