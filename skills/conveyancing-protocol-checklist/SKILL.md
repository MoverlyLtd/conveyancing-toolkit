---
name: conveyancing-protocol-checklist
description: >
  Generate and track Law Society Conveyancing Protocol compliance checklists
  for residential property transactions. Use when a conveyancer asks about
  protocol compliance, pre-exchange steps, post-completion obligations, CQS
  requirements, or transaction stage checklists. Works standalone (manual
  tick-off) or auto-completes when connected to Moverly MCP.
---

# Conveyancing Protocol Checklist

Generate stage-by-stage compliance checklists based on the Law Society
Conveyancing Protocol (2019 edition). CQS-accredited firms must follow
this protocol; non-CQS firms should follow it as best practice.

## Important

- Express all checklist items in plain language — do NOT reproduce protocol
  text verbatim
- Always cite the protocol stage and paragraph (e.g. "Stage B, para 3")
- The protocol has primacy over this checklist — advise users to consult
  the current protocol for definitive requirements
- Client's best interests always override protocol obligations

## Protocol Stages

The protocol has four stages plus general obligations. Generate checklists
appropriate to the user's role (buyer's conveyancer or seller's conveyancer)
and the transaction stage they're at.

### General Obligations (apply throughout)

| # | Item | Seller | Buyer | Protocol Ref |
|---|------|--------|-------|-------------|
| G1 | Verify identity of other side's conveyancer | ✓ | ✓ | General, para (a) |
| G2 | Use latest edition of Standard Conditions of Sale | ✓ | ✓ | General, para (b) |
| G3 | Use Code for Completion by Post (automatic under protocol) | ✓ | ✓ | General, para (c) |
| G4 | Use current property forms (TA6, TA7, TA10 etc.) | ✓ | ✓ | General, para (d) |
| G5 | Use formulae for exchanging contracts by telephone | ✓ | ✓ | General, para (e) |
| G6 | Only make essential amendments to Standard Conditions | ✓ | ✓ | General, para (f) |
| G7 | Only vary Code for Completion by Post on client instruction | ✓ | ✓ | General, para (g) |
| G8 | Only raise additional enquiries relevant to and necessary for the transaction | — | ✓ | General, para (l) |

### Stage A: Instructions

| # | Item | Seller | Buyer | Protocol Ref |
|---|------|--------|-------|-------------|
| A1 | Send client care letter with costs information | ✓ | ✓ | Stage A, para 1 |
| A2 | Complete identity verification (AML/KYC) | ✓ | ✓ | Stage A, para 2 |
| A3 | Obtain source of funds evidence | — | ✓ | Stage A, para 3 |
| A4 | Gather title documents and review | ✓ | — | Stage A, para 4 |
| A5 | Obtain property information forms from seller (TA6, TA7, TA10) | ✓ | — | Stage A, para 5 |
| A6 | Order searches (local authority, drainage, environmental) | — | ✓ | Stage A, para 6 |
| A7 | Obtain office copy entries from Land Registry | ✓ | — | Stage A, para 7 |
| A8 | Check for conflicts of interest | ✓ | ✓ | Stage A, para 8 |

### Stage B: Pre-Exchange

| # | Item | Seller | Buyer | Protocol Ref |
|---|------|--------|-------|-------------|
| B1 | Issue contract pack (contract, title, property info forms, replies to requisitions) | ✓ | — | Stage B, para 1 |
| B2 | Include draft transfer with contract pack | ✓ | — | Stage B, para 2 |
| B3 | Review contract pack and raise necessary enquiries | — | ✓ | Stage B, para 3 |
| B4 | Report on title to client | — | ✓ | Stage B, para 4 |
| B5 | Report to lender and request mortgage funds | — | ✓ | Stage B, para 5 |
| B6 | Reply to enquiries fully and promptly | ✓ | — | Stage B, para 6 |
| B7 | Approve contract and agree completion date | ✓ | ✓ | Stage B, para 7 |
| B8 | Obtain signed contract from client | ✓ | ✓ | Stage B, para 8 |
| B9 | Request deposit funds from buyer | — | ✓ | Stage B, para 9 |
| B10 | Confirm fixtures and fittings list (TA10) agreed | ✓ | ✓ | Stage B, para 10 |
| B11 | Check search results are satisfactory | — | ✓ | Stage B, para 11 |
| B12 | Check mortgage offer conditions met | — | ✓ | Stage B, para 12 |

### Stage C: Exchange

| # | Item | Seller | Buyer | Protocol Ref |
|---|------|--------|-------|-------------|
| C1 | Exchange contracts using agreed formula | ✓ | ✓ | Stage C, para 1 |
| C2 | Confirm exchange to client immediately | ✓ | ✓ | Stage C, para 2 |
| C3 | Send deposit to seller's conveyancer (or confirm held as stakeholder) | — | ✓ | Stage C, para 3 |
| C4 | Notify estate agent of exchange | ✓ | — | Stage C, para 4 |
| C5 | Submit certificate of title to lender | — | ✓ | Stage C, para 5 |
| C6 | Prepare completion statement | ✓ | — | Stage C, para 6 |
| C7 | Prepare transfer deed for execution | ✓ | ✓ | Stage C, para 7 |
| C8 | Arrange buildings insurance from exchange | — | ✓ | Stage C, para 8 |

### Stage D: Post-Completion

| # | Item | Seller | Buyer | Protocol Ref |
|---|------|--------|-------|-------------|
| D1 | Send completion funds by agreed time | — | ✓ | Stage D, para 1 |
| D2 | Confirm completion to client | ✓ | ✓ | Stage D, para 2 |
| D3 | Release keys via estate agent | ✓ | — | Stage D, para 3 |
| D4 | Send executed transfer and title deeds to buyer's conveyancer | ✓ | — | Stage D, para 4 |
| D5 | Discharge seller's mortgage | ✓ | — | Stage D, para 5 |
| D6 | Pay Stamp Duty Land Tax (submit SDLT return) | — | ✓ | Stage D, para 6 |
| D7 | Apply to Land Registry for registration | — | ✓ | Stage D, para 7 |
| D8 | Send confirmation of registration to client and lender | — | ✓ | Stage D, para 8 |
| D9 | Archive file with all documents | ✓ | ✓ | Stage D, para 9 |

## Usage

When asked for a checklist:

1. Ask whether the user is acting for buyer or seller (or both)
2. Ask which stage the transaction is at
3. Generate the relevant checklist filtered by role
4. If connected to Moverly MCP, check transaction state to auto-complete:
   - `get_status` → transaction stage, participants
   - `get_state` → property forms submitted, searches ordered
   - `get_insights` → outstanding issues blocking exchange
   - `get_form_progress` → TA6/TA7/TA10 completion percentages
   - `list_enquiries` → enquiry status

## Moverly Auto-Completion Mapping

When Moverly MCP is available, these items can be automatically verified:

| Item | MCP Check |
|------|-----------|
| A2 (IDV) | `get_status` → participantVerification |
| A5 (TA6/TA7/TA10) | `get_form_progress` → ta6/ta7/ta10 completion |
| A6/B11 (Searches) | `get_status` → searchesCollector |
| B3/B6 (Enquiries) | `list_enquiries` → status counts |
| B12 (Mortgage conditions) | `get_insights` → lenders-handbook flags |
| D6 (SDLT) | Can be calculated using sdlt-calculator skill |

## Sources

- Law Society Conveyancing Protocol (2019 edition):
  https://www.lawsociety.org.uk/topics/property/conveyancing-protocol
- CQS Core Practice Management Standards:
  https://www.lawsociety.org.uk/topics/property/conveyancing-quality-scheme

This skill provides compliance guidance only. Always refer to the current
published protocol for authoritative requirements.
