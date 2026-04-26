#!/usr/bin/env bash
# Build user-facing skill zips into releases/.
#
# Usage:
#   bash scripts/build-zips.sh              # rebuild every skill
#   bash scripts/build-zips.sh <skill-name> # rebuild one skill
#
# Each zip has SKILL.md at its root (not nested under a wrapper folder), so
# users can upload it directly to Claude/ChatGPT.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RELEASES_DIR="$REPO_ROOT/releases"
mkdir -p "$RELEASES_DIR"

build_one() {
  local skill="$1"
  local skill_dir="$REPO_ROOT/$skill"
  if [[ ! -f "$skill_dir/SKILL.md" ]]; then
    echo "skip: $skill (no SKILL.md)" >&2
    return 0
  fi
  local out="$RELEASES_DIR/$skill.zip"
  rm -f "$out"
  (cd "$skill_dir" && zip -rq "$out" . -x "*.DS_Store" -x "__MACOSX*")
  echo "built: releases/$skill.zip"
}

if [[ $# -gt 0 ]]; then
  for skill in "$@"; do
    build_one "$skill"
  done
else
  for entry in "$REPO_ROOT"/*/; do
    skill="$(basename "$entry")"
    [[ -f "$entry/SKILL.md" ]] || continue
    build_one "$skill"
  done
fi
