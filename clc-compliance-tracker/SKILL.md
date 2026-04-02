---
name: clc-compliance-tracker
description: >
  Track compliance with Council of Licensed Conveyancers regulatory
  requirements for CLC-regulated firms. Use when asked about CLC code
  of conduct, CLC compliance, licensed conveyancer obligations, CLC
  ethical principles, CLC audit, or CLC-regulated firm requirements.
  Covers the CLC Handbook's Code of Conduct and subsidiary codes.
  CLC firms do NOT use the Law Society Protocol or CQS — they follow
  CLC's outcomes-focused framework instead.
---

# CLC Compliance Tracker

Guide CLC-regulated firms and licensed conveyancers through Council of
Licensed Conveyancers regulatory requirements. The CLC is an
outcomes-focused regulator — firms must deliver specified outcomes but
can develop their own procedures to meet them.

## Important

- CLC-regulated firms do NOT need CQS accreditation — CLC regulation
  is itself sufficient to access the conveyancing market
- The CLC Code of Conduct was revised effective 1 January 2025
- Express requirements in plain language — do NOT reproduce CLC Handbook
  text verbatim
- Where subsidiary codes conflict with the Code of Conduct, the Code of
  Conduct prevails
- CLC regulation covers conveyancing AND probate services

## Code of Conduct: Ethical Principles

The CLC Code of Conduct prescribes six Ethical Principles. Each has
specific Outcomes that regulated individuals and firms must deliver.

### Principle 1: Act with Independence and Integrity

| # | Outcome | Transaction Evidence |
|---|---------|---------------------|
| 1.1 | Act honestly and with integrity in all dealings | Documented decision-making |
| 1.2 | Maintain independence — not allow outside interests to compromise service | Conflict check records |
| 1.3 | Not mislead clients, courts, regulators or third parties | Accurate representations in correspondence |
| 1.4 | Report concerns about conduct to the CLC | Reporting records if applicable |

### Principle 2: Maintain High Standards of Work

| # | Outcome | Transaction Evidence |
|---|---------|---------------------|
| 2.1 | Provide competent, timely and diligent service | File review records, response times |
| 2.2 | Only undertake work within competence | Matter allocation records |
| 2.3 | Supervise staff appropriately | Supervision policy, review records |
| 2.4 | Maintain adequate knowledge through CPD | CPD records |
| 2.5 | Comply with court orders and undertakings | Undertakings register |

### Principle 3: Act in the Best Interests of Clients

| # | Outcome | Transaction Evidence |
|---|---------|---------------------|
| 3.1 | Put client interests at centre of service delivery | Client care letter, regular updates |
| 3.2 | Provide clear information about services and costs | Engagement terms, costs breakdown |
| 3.3 | Keep client informed of progress | Communication log |
| 3.4 | Protect client money and assets | Accounts code compliance |
| 3.5 | Maintain confidentiality | Data handling procedures |
| 3.6 | Handle complaints fairly and promptly | Complaints register, resolution timeline |

### Principle 4: Deal with Regulators and Ombudsmen in an Open and Cooperative Way

| # | Outcome | Transaction Evidence |
|---|---------|---------------------|
| 4.1 | Respond promptly to CLC enquiries | Response records |
| 4.2 | Report relevant matters to CLC without delay | Notification records |
| 4.3 | Cooperate with Legal Ombudsman | Ombudsman correspondence |

### Principle 5: Promote Equality, Diversity and Inclusion

| # | Outcome | Transaction Evidence |
|---|---------|---------------------|
| 5.1 | Treat all clients and colleagues fairly | Equality policy |
| 5.2 | Make services accessible | Accessibility arrangements |
| 5.3 | Address unconscious bias | Training records |

### Principle 6: Promote and Protect the Interests of Consumers and the Wider Public Interest

| # | Outcome | Transaction Evidence |
|---|---------|---------------------|
| 6.1 | Promote access to justice | Pro bono policy if applicable |
| 6.2 | Protect consumers from harm | Risk management procedures |
| 6.3 | Act in a way that promotes public trust | Professional conduct records |

## Subsidiary Codes — Transaction Compliance

These codes map to specific transaction-level obligations:

### Anti-Money Laundering & Combating Terrorist Financing

| # | Requirement | Timing |
|---|------------|--------|
| AML1 | Client due diligence (identity verification) | At instruction |
| AML2 | Enhanced due diligence for high-risk clients/transactions | At instruction or when risk identified |
| AML3 | Source of funds verification | Before accepting funds |
| AML4 | Source of wealth verification (where required) | Before completion |
| AML5 | Sanctions screening | At instruction and ongoing |
| AML6 | Suspicious activity reporting to NCA | When suspicion arises |
| AML7 | Firm-wide risk assessment | Annual review |
| AML8 | Staff training on AML obligations | Annual |
| AML9 | Appointed MLRO (Money Laundering Reporting Officer) | Ongoing appointment |

### Accounts Code

| # | Requirement | Timing |
|---|------------|--------|
| ACC1 | Client money held in designated client account | Ongoing |
| ACC2 | Client account reconciled regularly | Monthly minimum |
| ACC3 | Interest on client money handled per terms of engagement | On receipt of funds |
| ACC4 | Accountant's report submitted to CLC | Annually |

### Estimates & Terms of Engagement

| # | Requirement | Timing |
|---|------------|--------|
| ETE1 | Written terms of engagement issued on durable medium | At instruction |
| ETE2 | Clear estimate of costs and disbursements | At instruction |
| ETE3 | Client informed of any changes to costs | When changes arise |
| ETE4 | Final bill issued promptly after completion | Post-completion |

### Acting for Lenders & Mortgage Fraud Prevention

| # | Requirement | Timing |
|---|------------|--------|
| AFL1 | Check UK Finance Lender's Handbook requirements | When mortgage instructions received |
| AFL2 | Report all material matters to lender | Pre-completion |
| AFL3 | Verify property value consistent with mortgage offer | Pre-completion |
| AFL4 | Report suspicions of mortgage fraud | When identified |
| AFL5 | Certificate of title accurate and complete | Pre-completion |

### Transaction Files Code

| # | Requirement | Timing |
|---|------------|--------|
| TF1 | Maintain complete transaction file | Throughout |
| TF2 | Key dates diarised and monitored | Throughout |
| TF3 | File review at critical stages | Per firm procedure |
| TF4 | Post-completion steps documented (SDLT, registration) | Post-completion |
| TF5 | File retained per retention policy | Post-completion |

### Undertakings Code

| # | Requirement | Timing |
|---|------------|--------|
| UT1 | Register all undertakings given | When given |
| UT2 | Discharge undertakings promptly | As soon as able |
| UT3 | Do not give undertakings outside your control | Before giving |
| UT4 | Monitor outstanding undertakings | Regular review |

## Moverly MCP Integration

When connected to Moverly, transaction-level compliance can be evidenced:

| CLC Requirement | MCP Check |
|----------------|-----------|
| Principle 2 (high standards) | `get_insights` → risk flags identified and actioned |
| AML1 (identity verification) | `get_status` → participantVerification |
| AFL1 (Lender's Handbook) | `get_insights` → lenders-handbook-requirements flags |
| AFL2 (material matters) | `get_insights` → data-driven flags for lender reporting |
| TF2 (key dates) | `get_status` → milestone tracking |
| TF3 (file review) | `get_form_progress` → completion status of all forms |
| TF4 (post-completion) | `get_queue` → SDLT/registration status |

## CLC vs SRA/CQS — Key Differences

| Aspect | CLC | SRA/CQS |
|--------|-----|---------|
| Protocol | Outcomes-focused (deliver results) | Prescriptive (follow steps) |
| Quality mark | CLC regulation IS the quality mark | CQS is additional accreditation |
| Mandatory | All CLC firms comply | CQS is optional for SRA firms |
| Lender panels | CLC regulation sufficient | Many lenders require CQS |
| Forms | May use Law Society forms but not required to | Must use specified forms |

## Sources

- CLC Handbook (revised 1 January 2025):
  https://www.clc-uk.org/handbook/the-handbook/
- CLC Code of Conduct:
  https://www.clc-uk.org/wp-content/uploads/clcSiteMedia/Code-of-Conduct.pdf
- CLC Guidance:
  https://www.clc-uk.org/handbook/guidance/

This skill provides compliance guidance based on publicly available CLC
regulatory requirements. Always refer to the current CLC Handbook for
authoritative standards.
