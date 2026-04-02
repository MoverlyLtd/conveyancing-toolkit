#!/usr/bin/env bash
# SDLT Calculator — England & Northern Ireland residential property
# Usage: sdlt-calc.sh <price> [--ftb] [--additional] [--non-resident] [--compare] [--json]
# Rates effective from 1 April 2025 (post-temporary threshold revert)

set -euo pipefail

PRICE=""
FTB=false
ADDITIONAL=false
NON_RESIDENT=false
COMPARE=false
JSON=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --ftb) FTB=true; shift ;;
    --additional) ADDITIONAL=true; shift ;;
    --non-resident|--non-uk) NON_RESIDENT=true; shift ;;
    --compare) COMPARE=true; shift ;;
    --json) JSON=true; shift ;;
    --help|-h)
      echo "Usage: sdlt-calc.sh <price> [--ftb] [--additional] [--non-resident] [--compare] [--json]"
      echo ""
      echo "  --ftb           First-time buyer relief"
      echo "  --additional    Additional property (+5% surcharge)"
      echo "  --non-resident  Non-UK resident (+2% surcharge)"
      echo "  --compare       Show all scenarios"
      echo "  --json          Output as JSON"
      exit 0
      ;;
    *)
      if [[ -z "$PRICE" ]]; then
        PRICE="$1"
      else
        echo "Error: unexpected argument '$1'" >&2; exit 1
      fi
      shift
      ;;
  esac
done

if [[ -z "$PRICE" ]]; then
  echo "Error: purchase price required" >&2
  echo "Usage: sdlt-calc.sh <price> [--ftb] [--additional] [--non-resident] [--compare]" >&2
  exit 1
fi

# Strip commas, £, spaces — keep digits only
PRICE=$(echo "$PRICE" | tr -d ',£ ')
if ! [[ "$PRICE" =~ ^[0-9]+$ ]]; then
  echo "Error: invalid price '$PRICE' (whole pounds only)" >&2; exit 1
fi

# Format number with commas
fmt() {
  echo "$1" | sed ':a;s/\B[0-9]\{3\}\>/.&/;ta' | tr '.' ','
}

# Calculate tax on a band: tax_on_band <amount_in_band> <rate_percent>
# Uses integer arithmetic: amount * rate / 100
tax_on_band() {
  echo $(( $1 * $2 / 100 ))
}

# min of two values
min() { (( $1 < $2 )) && echo "$1" || echo "$2"; }
max() { (( $1 > $2 )) && echo "$1" || echo "$2"; }

# Calculate SDLT
# Args: price ftb(0/1) additional(0/1) non_resident(0/1)
calculate_sdlt() {
  local p=$1 ftb=$2 add=$3 nr=$4
  local surcharge=0
  (( add == 1 )) && (( surcharge += 5 )) || true
  (( nr == 1 )) && (( surcharge += 2 )) || true

  local total=0
  local -a bands=()   # "label|rate|tax" entries
  local remaining=$p

  # Check FTB eligibility
  local ftb_eligible=0
  if (( ftb == 1 && p <= 500000 )); then
    ftb_eligible=1
  fi

  if (( ftb_eligible == 1 )); then
    # FTB bands
    # Band 1: 0–300,000 at 0% + surcharge
    local b1; b1=$(min $remaining 300000)
    local r1=$surcharge
    local t1; t1=$(tax_on_band $b1 $r1)
    (( total += t1 )) || true
    bands+=("£0–£300,000|${r1}%|£$(fmt $t1)")
    remaining=$(max $(( remaining - 300000 )) 0)

    # Band 2: 300,001–500,000 at 5% + surcharge
    if (( remaining > 0 )); then
      local b2; b2=$(min $remaining 200000)
      local r2=$(( 5 + surcharge ))
      local t2; t2=$(tax_on_band $b2 $r2)
      (( total += t2 )) || true
      bands+=("£300,001–£500,000|${r2}%|£$(fmt $t2)")
      remaining=$(max $(( remaining - 200000 )) 0)
    fi
  else
    # Standard bands
    # Band 1: 0–125,000 at 0% + surcharge
    local b1; b1=$(min $remaining 125000)
    local r1=$surcharge
    local t1; t1=$(tax_on_band $b1 $r1)
    (( total += t1 )) || true
    bands+=("£0–£125,000|${r1}%|£$(fmt $t1)")
    remaining=$(max $(( remaining - 125000 )) 0)

    # Band 2: 125,001–250,000 at 2% + surcharge
    if (( remaining > 0 )); then
      local b2; b2=$(min $remaining 125000)
      local r2=$(( 2 + surcharge ))
      local t2; t2=$(tax_on_band $b2 $r2)
      (( total += t2 )) || true
      bands+=("£125,001–£250,000|${r2}%|£$(fmt $t2)")
      remaining=$(max $(( remaining - 125000 )) 0)
    fi

    # Band 3: 250,001–925,000 at 5% + surcharge
    if (( remaining > 0 )); then
      local b3; b3=$(min $remaining 675000)
      local r3=$(( 5 + surcharge ))
      local t3; t3=$(tax_on_band $b3 $r3)
      (( total += t3 )) || true
      bands+=("£250,001–£925,000|${r3}%|£$(fmt $t3)")
      remaining=$(max $(( remaining - 675000 )) 0)
    fi

    # Band 4: 925,001–1,500,000 at 10% + surcharge
    if (( remaining > 0 )); then
      local b4; b4=$(min $remaining 575000)
      local r4=$(( 10 + surcharge ))
      local t4; t4=$(tax_on_band $b4 $r4)
      (( total += t4 )) || true
      bands+=("£925,001–£1,500,000|${r4}%|£$(fmt $t4)")
      remaining=$(max $(( remaining - 575000 )) 0)
    fi

    # Band 5: above 1,500,000 at 12% + surcharge
    if (( remaining > 0 )); then
      local r5=$(( 12 + surcharge ))
      local t5; t5=$(tax_on_band $remaining $r5)
      (( total += t5 )) || true
      bands+=("Above £1,500,000|${r5}%|£$(fmt $t5)")
    fi
  fi

  # Effective rate: total * 10000 / price gives basis points, then format
  local eff_bp=0
  (( p > 0 )) && eff_bp=$(( total * 10000 / p ))
  local eff_whole=$(( eff_bp / 100 ))
  local eff_frac=$(( eff_bp % 100 ))
  local effective
  printf -v effective "%d.%02d%%" "$eff_whole" "$eff_frac"

  # Build label
  local label=""
  if (( ftb_eligible == 1 )); then
    label="First-time buyer"
  elif (( ftb == 1 )); then
    label="Standard (FTB not available — price exceeds £500,000)"
  else
    label="Standard purchase"
  fi
  (( add == 1 )) && label="${label} + additional property"
  (( nr == 1 )) && label="${label} + non-resident"

  if [[ "$JSON" == true ]]; then
    local ftb_json="false"; (( ftb_eligible == 1 )) && ftb_json="true"
    local add_json="false"; (( add == 1 )) && add_json="true"
    local nr_json="false"; (( nr == 1 )) && nr_json="true"
    echo "{\"scenario\":\"$label\",\"price\":$p,\"sdlt\":$total,\"effectiveRate\":\"$effective\",\"ftb\":$ftb_json,\"additional\":$add_json,\"nonResident\":$nr_json}"
    return
  fi

  echo "=== $label ==="
  echo "Purchase price: £$(fmt $p)"
  echo ""
  printf "  %-24s %8s %12s\n" "Band" "Rate" "Tax"
  printf "  %-24s %8s %12s\n" "------------------------" "--------" "------------"
  for entry in "${bands[@]}"; do
    IFS='|' read -r band rate tax <<< "$entry"
    printf "  %-24s %8s %12s\n" "$band" "$rate" "$tax"
  done
  echo ""
  echo "  Total SDLT:    £$(fmt $total)"
  echo "  Effective rate: $effective"
}

# --- Main ---

if [[ "$COMPARE" == true ]]; then
  echo "SDLT Comparison — £$(fmt $PRICE)"
  echo "════════════════════════════════════════════════"
  echo ""
  calculate_sdlt "$PRICE" 0 0 0

  if (( PRICE <= 500000 )); then
    echo ""
    calculate_sdlt "$PRICE" 1 0 0
  fi

  echo ""
  calculate_sdlt "$PRICE" 0 1 0
  echo ""
  calculate_sdlt "$PRICE" 0 0 1
  echo ""
  calculate_sdlt "$PRICE" 0 1 1
else
  local_ftb=0; [[ "$FTB" == true ]] && local_ftb=1
  local_add=0; [[ "$ADDITIONAL" == true ]] && local_add=1
  local_nr=0; [[ "$NON_RESIDENT" == true ]] && local_nr=1
  calculate_sdlt "$PRICE" "$local_ftb" "$local_add" "$local_nr"
fi
