---
name: cqs-practice-standards
description: >
  Track Conveyancing Quality Scheme practice management standards for
  SRA-regulated firms. Use when asked about CQS accreditation, CQS audit
  preparation, practice management compliance, CQS renewal, or firm-level
  conveyancing quality standards. Covers governance, supervision, training,
  complaints, cyber security, and file management requirements.
---

# CQS Practice Standards

## Response Rules — Always Include

**DO:**
- Always **distinguish CQS firm-level requirements from individual SRA competence requirements** — CQS accredits the firm's systems and processes; SRA regulates individual solicitor competence separately. Make this distinction explicit.
- When discussing training: note that CQS requires firm-wide training records AND protocol compliance training, but individual CPD is an SRA requirement
- When discussing supervision: CQS requires documented supervision procedures at firm level; SRA Code sets individual supervision standards

**DON'T:**
- Don't conflate CQS (firm accreditation scheme run by Law Society) with SRA regulation (individual and firm-level regulatory requirements) — they overlap but are distinct
- Don't present CQS requirements without noting which ones go beyond SRA baseline obligations

Guide SRA-regulated firms through Conveyancing Quality Scheme practice
management requirements. CQS is the Law Society's quality standard for
residential conveyancing — accredited firms must follow the Conveyancing
Protocol and meet these practice standards.

## Important

- Express requirements in plain language — do NOT reproduce CQS standards
  text verbatim
- CQS is only available to SRA-regulated firms (not CLC-regulated)
- Requirements evolve — advise firms to check current standards at
  lawsociety.org.uk
- This covers firm-level standards, not transaction-level protocol
  compliance (see conveyancing-protocol-checklist for that)

## CQS Practice Areas

### 1. Governance & Organisation

| # | Requirement | Evidence |
|---|------------|----------|
| 1.1 | Designated CQS Senior Responsible Officer (SRO) | Named individual, contact details |
| 1.2 | SRO responsible for protocol compliance across the firm | Documented responsibility |
| 1.3 | Written procedures for adopting and monitoring protocol compliance | Procedure document |
| 1.4 | All conveyancing staff aware of CQS standards and protocols | Training records |
| 1.5 | Regular review of compliance with CQS standards | Review schedule, minutes |

### 2. Client Care

| # | Requirement | Evidence |
|---|------------|----------|
| 2.1 | Written client care procedures | Procedure document |
| 2.2 | Clear costs information provided at outset | Template letter/engagement terms |
| 2.3 | Client kept informed of progress throughout | Communication policy |
| 2.4 | Written complaints procedure displayed and communicated to clients | Complaints policy, display evidence |
| 2.5 | Complaints logged, investigated and resolved within set timescales | Complaints register |
| 2.6 | Learning from complaints fed back into practice | Review process evidence |

### 3. Conveyancing Process

| # | Requirement | Evidence |
|---|------------|----------|
| 3.1 | Documented conveyancing process aligned with Law Society Protocol | Process document cross-referencing protocol stages |
| 3.2 | File review procedures at key transaction stages | Review schedule, reviewer assignments |
| 3.3 | Supervision arrangements for all conveyancing staff | Supervision policy, named supervisors |
| 3.4 | All staff use current property forms and standard conditions | Version control procedure |
| 3.5 | Procedures for managing chains and linked transactions | Chain management policy |
| 3.6 | Procedures for handling exchange and completion | Checklists, authorisation process |

### 4. Risk Management

| # | Requirement | Evidence |
|---|------------|----------|
| 4.1 | Anti-money laundering policy and procedures | AML policy, risk assessment |
| 4.2 | Client identification and verification procedures | ID verification policy, CDD records |
| 4.3 | Source of funds/wealth procedures | SOF policy, enhanced DD triggers |
| 4.4 | Sanctions screening procedures | Screening policy, provider details |
| 4.5 | Fraud awareness and prevention measures | Fraud policy, staff awareness training |
| 4.6 | Professional indemnity insurance appropriate to conveyancing work | Current PII certificate |
| 4.7 | Conflict of interest checking procedures | Conflict check policy, system/register |

### 5. Information Security

| # | Requirement | Evidence |
|---|------------|----------|
| 5.1 | Cyber security policy and procedures | IT security policy |
| 5.2 | Staff trained on cyber security risks (phishing, BEC, fund diversion) | Training records, dates |
| 5.3 | Secure email or portal for sensitive communications | System details |
| 5.4 | Procedures for verifying bank details (especially on completion) | Verification procedure |
| 5.5 | Data protection policy compliant with GDPR/UK GDPR | Privacy policy, DPIA if required |
| 5.6 | Business continuity plan | BCP document, test records |
| 5.7 | Cyber Essentials certification (recommended) | Certificate if held |
| 5.8 | All employees aware of and adhere to Conveyancing Protocols | Training records |

### 6. Training & Development

| # | Requirement | Evidence |
|---|------------|----------|
| 6.1 | CQS mandatory training completed on time | Training certificates, completion dates |
| 6.2 | CPD plan for conveyancing staff | CPD records |
| 6.3 | Training on relevant regulatory changes | Training records with topics/dates |
| 6.4 | Induction programme for new conveyancing staff | Induction checklist |
| 6.5 | Training on firm's specific procedures and systems | Internal training records |

### 7. File & Case Management

| # | Requirement | Evidence |
|---|------------|----------|
| 7.1 | Standardised file/case management system | System name, configuration |
| 7.2 | Key dates diarised and monitored | Diary system, review process |
| 7.3 | Undertakings register maintained | Register with status tracking |
| 7.4 | Post-completion procedures documented | Checklist (SDLT, registration, mortgage discharge) |
| 7.5 | File storage and retention policy | Retention schedule |
| 7.6 | Regular file audits | Audit schedule, findings log |

## CQS Audit Preparation

When preparing for CQS audit or renewal:

1. Review each section above against current evidence
2. Identify gaps — missing documents, expired training, outdated procedures
3. Prioritise: governance (section 1) and risk management (section 4) are
   most heavily scrutinised
4. Check all training certificates are current
5. Review complaints register for patterns
6. Verify AML procedures match current regulations
7. Test cyber security awareness with staff
8. Ensure all file reviews are documented

## Moverly Integration

When connected to Moverly MCP, some practice standards can be evidenced
from transaction data:

| Standard | MCP Evidence |
|----------|-------------|
| 3.2 File reviews | `get_status` → transaction progression timeline |
| 3.4 Current forms | `get_form_progress` → form versions in use |
| 4.2 ID verification | `get_status` → participantVerification per transaction |
| 7.2 Key dates | `get_status` → milestone tracking |
| 7.4 Post-completion | `get_queue` → SDLT/registration collector status |

## Sources

- Law Society CQS Core Practice Management Standards:
  https://www.lawsociety.org.uk/topics/property/conveyancing-quality-scheme
- Law Society Conveyancing Protocol (2019):
  https://www.lawsociety.org.uk/topics/property/conveyancing-protocol

This skill provides practice management guidance based on publicly
available CQS requirements. Firms should refer to current Law Society
publications for authoritative standards.
