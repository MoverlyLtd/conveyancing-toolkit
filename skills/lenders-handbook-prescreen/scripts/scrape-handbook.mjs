#!/usr/bin/env node
/**
 * Scrape UK Finance Lenders Handbook Part 2 requirements for all lenders.
 * Outputs one markdown file per lender into references/lenders/.
 *
 * Reuses parsing patterns from buyer-ready-functions/services/handbookCache/scraper.js
 * but runs standalone (no Firebase, no dependencies beyond axios + cheerio).
 *
 * Usage:
 *   node scrape-handbook.mjs                    # All tiers (130+ lenders)
 *   node scrape-handbook.mjs --tier 1           # Tier 1 only (15 lenders)
 *   node scrape-handbook.mjs --tier 2           # Tiers 1+2 (50 lenders)
 *   node scrape-handbook.mjs --lender nationwide-building-society   # Single lender
 *   node scrape-handbook.mjs --dry-run          # Show what would be scraped
 */

import axios from "axios";
import * as cheerio from "cheerio";
import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "..", "references", "lenders");
const BASE_URL = "https://lendershandbook.ukfinance.org.uk/lenders-handbook/englandandwales/";

// ── Rate Limiter ──────────────────────────────────────────────────────────────

class RateLimiter {
  constructor(maxPerMinute = 8) {
    this.max = maxPerMinute;
    this.requests = [];
  }
  async wait() {
    const now = Date.now();
    this.requests = this.requests.filter((t) => t > now - 60000);
    if (this.requests.length >= this.max) {
      const waitMs = this.requests[0] + 60000 - now + 200;
      if (waitMs > 0) await new Promise((r) => setTimeout(r, waitMs));
    }
    this.requests.push(Date.now());
  }
}

const limiter = new RateLimiter(8);

async function fetchPage(url, retries = 3) {
  await limiter.wait();
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await axios.get(url, {
        timeout: 15000,
        headers: { "User-Agent": "Moverly-HandbookScraper/1.0" },
      });
      return res.data;
    } catch (err) {
      if (attempt === retries) throw err;
      const delay = 2000 * Math.pow(2, attempt - 1);
      console.warn(`  ⚠ Retry ${attempt}/${retries} for ${url} (waiting ${delay}ms)`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

// ── Lender Registry ───────────────────────────────────────────────────────────
// Copied from handbookCache/schemas.js to keep this script standalone.

const TIER1 = [
  { name: "Nationwide Building Society", slug: "nationwide-building-society" },
  { name: "Santander UK plc", slug: "santander-uk-plc" },
  { name: "Barclays Bank UK PLC", slug: "barclays-bank-uk-plc" },
  { name: "HSBC UK Bank plc", slug: "hsbc-uk-bank-plc" },
  { name: "NatWest", slug: "national-westminster-bank-plc" },
  { name: "Halifax", slug: "halifax" },
  { name: "Bank of Scotland", slug: "bank-of-scotland-beginning-a" },
  { name: "TSB Bank plc", slug: "tsb-bank-plc" },
  { name: "Virgin Money", slug: "virgin-money" },
  { name: "Yorkshire Building Society", slug: "yorkshire-building-society" },
  { name: "Skipton Building Society", slug: "skipton-building-society" },
  { name: "Coventry Building Society", slug: "coventry-building-society" },
  { name: "Leeds Building Society", slug: "leeds-building-society" },
  { name: "Principality Building Society", slug: "principality-building-society" },
  { name: "Metro Bank plc", slug: "metro-bank-plc" },
];

const TIER2 = [
  { name: "Lloyds Bank plc", slug: "lloyds-bank-plc-pre-fixed-50/30/77" },
  { name: "Scottish Widows Bank", slug: "scottish-widows-bank" },
  { name: "Birmingham Midshires", slug: "birmingham-midshires" },
  { name: "First Direct", slug: "first-direct" },
  { name: "The Royal Bank of Scotland plc", slug: "the-royal-bank-of-scotland-plc" },
  { name: "Ulster Bank", slug: "ulster-bank" },
  { name: "Co-operative Bank plc", slug: "co-operative-bank-plc" },
  { name: "Clydesdale Bank plc", slug: "clydesdale-bank-plc" },
  { name: "Sainsbury's Bank", slug: "sainsbury's-bank" },
  { name: "M&S Bank", slug: "m-s-bank" },
  { name: "Atom Bank plc", slug: "atom-bank-plc" },
  { name: "Aldermore Bank PLC", slug: "aldermore-bank-plc" },
  { name: "Handelsbanken", slug: "handelsbanken" },
  { name: "Gen H", slug: "gen-h" },
  { name: "Habito", slug: "habito" },
  { name: "Molo Finance", slug: "molo-finance" },
  { name: "Perenna", slug: "perenna" },
  { name: "Saffron Building Society", slug: "saffron-building-society" },
  { name: "Darlington Building Society", slug: "darlington-building-society" },
  { name: "Furness Building Society", slug: "furness-building-society" },
  { name: "Manchester Building Society", slug: "manchester-building-society" },
  { name: "Monmouthshire Building Society", slug: "monmouthshire-building-society" },
  { name: "Dudley Building Society", slug: "dudley-building-society" },
  { name: "Hinckley and Rugby Building Society", slug: "hinckley-and-rugby-building-society" },
  { name: "Ecology Building Society", slug: "ecology-building-society" },
  { name: "Market Harborough Building Society", slug: "market-harborough-building-society" },
  { name: "Scottish Building Society", slug: "scottish-building-society" },
  { name: "Buckinghamshire Building Society", slug: "buckinghamshire-building-society" },
  { name: "Swansea Building Society", slug: "swansea-building-society" },
  { name: "National Counties Building Society", slug: "national-counties-building-society" },
  { name: "The Mortgage Works", slug: "the-mortgage-works" },
  { name: "Accord Mortgages Ltd", slug: "accord-mortgages-ltd" },
  { name: "Accord Buy to Let", slug: "accord-buy-to-let" },
  { name: "Platform", slug: "platform-a-trading-name-of-the-co-operative-bank-plc" },
  { name: "Intelligent Finance", slug: "intelligent-finance" },
];

const TIER3 = [
  { name: "Kensington Mortgage Company Ltd", slug: "kensington-mortgage-company-ltd" },
  { name: "Precise Mortgages", slug: "precise-mortgages-charter-court-financial-services-ltd" },
  { name: "Bluestone Mortgages", slug: "bluestone-mortgages" },
  { name: "Pepper Money", slug: "pepper-money" },
  { name: "Foundation Home Loans", slug: "foundation-home-loans" },
  { name: "Together Personal Finance Limited", slug: "together-personal-finance-limited" },
  { name: "Vida Homeloans", slug: "vida-homeloans" },
  { name: "Magellan Homeloans", slug: "magellan-homeloans" },
  { name: "The Mortgage Lender Limited", slug: "the-mortgage-lender-limited" },
  { name: "Paragon Buy to Let Mortgages", slug: "paragon-buy-to-let-mortgages" },
  { name: "Fleet Mortgages", slug: "fleet-mortgages" },
  { name: "Landbay Partners Limited", slug: "landbay-partners-limited" },
  { name: "Kent Reliance", slug: "kent-reliance-a-trading-name-of-onesavings-bank-plc" },
  { name: "Aviva Equity Release UK Ltd", slug: "aviva-equity-release-uk-ltd" },
  { name: "Legal & General Home Finance Ltd", slug: "legal-general-home-finance-ltd" },
  { name: "Coutts", slug: "coutts" },
  { name: "Investec Bank plc", slug: "investec-bank-plc" },
  { name: "Bank of Ireland (UK) plc", slug: "bank-of-ireland-uk-plc" },
];

function getLenders(maxTier) {
  if (maxTier === 1) return TIER1;
  if (maxTier === 2) return [...TIER1, ...TIER2];
  return [...TIER1, ...TIER2, ...TIER3];
}

// ── Parser ────────────────────────────────────────────────────────────────────

/**
 * Parse Part 2 lender-specific Q&A blocks from a handbook page.
 *
 * HTML structure:
 *   <div class="qanda depth-2 layout">
 *     <p class="question"><span>1.7  </span>Contact point to see if...</p>
 *     <p class="answer">We will not lend<br>Last updated: 02/02/2026</p>
 *   </div>
 *
 * We ONLY extract the Q&A blocks (lender-specific Part 2 answers),
 * not the Part 1 universal text which is interleaved on the same page.
 */
function parsePart2QandA($) {
  const sections = {};

  $("div.qanda").each((_i, elem) => {
    const $elem = $(elem);
    const questionEl = $elem.find("p.question");
    const answerEl = $elem.find("p.answer");

    if (!questionEl.length) return;

    // Extract section number from the question span
    const questionText = questionEl.text().trim();
    const sectionMatch = questionText.match(/^([\d.]+[a-z]?)\s+(.*)/s);

    let sectionId, question;
    if (sectionMatch) {
      sectionId = sectionMatch[1].trim();
      question = sectionMatch[2].trim();
    } else {
      // Fallback: use the span content
      const spanText = questionEl.find("span").first().text().trim();
      sectionId = spanText.replace(/\s+/g, "");
      question = questionEl.text().replace(spanText, "").trim();
    }

    if (!sectionId) return;

    // Extract answer, stripping "Last updated" timestamps
    let answer = "";
    if (answerEl.length) {
      // Get HTML to preserve line breaks, then convert to text
      answer = answerEl.html() || "";
      // Convert <br> to newlines
      answer = answer.replace(/<br\s*\/?>/gi, "\n");
      // Strip HTML tags
      answer = answer.replace(/<[^>]+>/g, "");
      // Strip "Last updated: ..." lines
      answer = answer.replace(/Last updated:.*$/gm, "").trim();
      // Decode HTML entities
      answer = answer.replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#160;/g, " ");
      // Collapse whitespace but preserve intentional newlines
      answer = answer.split("\n").map(l => l.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
    }

    sections[sectionId] = {
      id: sectionId,
      heading: question || null,
      text: answer,
    };
  });

  return sections;
}

// ── Markdown Generation ───────────────────────────────────────────────────────

function generateLenderMarkdown(lenderName, lenderSlug, sections, scrapedAt) {
  const sectionCount = Object.keys(sections).length;
  let md = `# ${lenderName} — Part 2 Requirements\n\n`;
  md += `> Scraped from UK Finance Lenders' Handbook on ${scrapedAt}\n`;
  md += `> Source: ${BASE_URL}${lenderSlug}/\n`;
  md += `> ${sectionCount} sections found\n\n`;

  if (sectionCount === 0) {
    md += `No lender-specific Part 2 requirements found. Part 1 general requirements apply.\n`;
    return md;
  }

  // Group by top-level section number
  const grouped = {};
  for (const [id, section] of Object.entries(sections)) {
    const topLevel = id.split(".")[0];
    if (!grouped[topLevel]) grouped[topLevel] = [];
    grouped[topLevel].push(section);
  }

  // Sort groups numerically
  const sortedGroups = Object.entries(grouped).sort(
    ([a], [b]) => parseFloat(a) - parseFloat(b)
  );

  for (const [_group, items] of sortedGroups) {
    // Sort items within group
    items.sort((a, b) => {
      const aParts = a.id.split(".").map(Number);
      const bParts = b.id.split(".").map(Number);
      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const diff = (aParts[i] || 0) - (bParts[i] || 0);
        if (diff !== 0) return diff;
      }
      return 0;
    });

    for (const item of items) {
      if (item.heading) {
        md += `## ${item.id} ${item.heading}\n\n`;
      } else {
        md += `## ${item.id}\n\n`;
      }
      if (item.text) {
        md += `${item.text}\n\n`;
      }
    }
  }

  return md;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function scrapeLender(lender) {
  const url = `${BASE_URL}${lender.slug}/`;
  console.log(`  Fetching ${lender.name}...`);

  try {
    const html = await fetchPage(url);
    const $ = cheerio.load(html);

    // Extract only the Part 2 Q&A blocks (lender-specific answers)
    const sections = parsePart2QandA($);

    const scrapedAt = new Date().toISOString().split("T")[0];
    const md = generateLenderMarkdown(lender.name, lender.slug, sections, scrapedAt);

    return { success: true, markdown: md, sectionCount: Object.keys(sections).length };
  } catch (err) {
    console.error(`  ✗ Failed: ${err.message}`);
    return { success: false, markdown: null, sectionCount: 0, error: err.message };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const tierFlag = args.indexOf("--tier");
  const lenderFlag = args.indexOf("--lender");
  const dryRun = args.includes("--dry-run");
  const maxTier = tierFlag >= 0 ? parseInt(args[tierFlag + 1], 10) : 3;

  let lenders;
  if (lenderFlag >= 0) {
    const slug = args[lenderFlag + 1];
    const all = getLenders(3);
    lenders = all.filter((l) => l.slug === slug);
    if (lenders.length === 0) {
      console.error(`Lender not found: ${slug}`);
      console.error("Available slugs:", all.map((l) => l.slug).join(", "));
      process.exit(1);
    }
  } else {
    lenders = getLenders(maxTier);
  }

  console.log(`\n📚 UK Finance Lenders Handbook Scraper`);
  console.log(`   Lenders: ${lenders.length} (tier ≤${maxTier})`);
  console.log(`   Output:  ${OUTPUT_DIR}\n`);

  if (dryRun) {
    for (const l of lenders) {
      console.log(`  ${l.name} → ${l.slug}.md`);
    }
    console.log(`\n${lenders.length} lenders would be scraped.`);
    return;
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });

  let succeeded = 0;
  let failed = 0;
  const startTime = Date.now();

  for (let i = 0; i < lenders.length; i++) {
    const lender = lenders[i];
    console.log(`[${i + 1}/${lenders.length}] ${lender.name}`);

    const result = await scrapeLender(lender);

    if (result.success) {
      const outPath = join(OUTPUT_DIR, `${lender.slug}.md`);
      writeFileSync(outPath, result.markdown, "utf-8");
      console.log(`  ✓ ${result.sectionCount} sections → ${lender.slug}.md`);
      succeeded++;
    } else {
      failed++;
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✅ Done in ${elapsed}s: ${succeeded} succeeded, ${failed} failed out of ${lenders.length}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
