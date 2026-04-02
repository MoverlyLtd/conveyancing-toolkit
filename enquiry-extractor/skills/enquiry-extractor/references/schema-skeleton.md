# PDTF Schema Skeleton — Path Resolution Reference

Use this to map natural language subjects to PDTF paths. Paths are under `/propertyPack/` unless noted.

## Title & Ownership
- `/propertyPack/titlesToBeSold` — title registers, title numbers, proprietors, charges, restrictions, covenants
- `/propertyPack/ownership` — sellers count, mortgage, help-to-buy, first registration, limited company, ownerships to transfer
- `/propertyPack/legalOwners` — names of legal owners
- `/propertyPack/legalBoundaries` — boundary ownership, flying freehold, title plan discrepancies, adjacent land

## Tenure & Leasehold
- `/propertyPack/ownership/ownershipsToBeTransferred` — contains freehold/leasehold details per ownership
- Leasehold branch: lease term, ground rent, service charges, management company, lease restrictions, forfeiture
- Freehold branch: freehold details, estate rentcharges

## Alterations & Building Works
- `/propertyPack/alterationsAndChanges` — structural alterations, extensions, loft conversions, garage conversions, chimney removal, insulation, window replacements, change of use, unfinished works
- `/propertyPack/alterationsAndChanges/planningPermissionBreaches` — planning/building regs breaches
- `/propertyPack/typeOfConstruction` — standard construction, building safety, loft, spray foam, accessibility

## Planning & Building Regulations
- `/propertyPack/alterationsAndChanges` — planning permission, building regs approval (per alteration)
- `/propertyPack/environmentalIssues/planning` — planning context from environmental data
- `/propertyPack/notices/planningApplication` — pending planning applications

## Environmental & Location
- `/propertyPack/environmentalIssues` — flooding, radon, contaminated land, ground stability, coal mining, non-coal mining, coastal erosion, climate risk, infrastructure risk
- `/propertyPack/location` — lat/lng, BNG coordinates
- `/propertyPack/localAuthority` — council name, search turnaround times

## Searches
- `/propertyPack/localSearches` — local land charges, CON29R results
- `/propertyPack/searches` — all search enquiries (environmental, drainage, mining, etc.)

## Energy & Services
- `/propertyPack/energyEfficiency` — EPC, green deal loan
- `/propertyPack/electricity` — mains, solar panels, heat pumps
- `/propertyPack/heating` — heating system type
- `/propertyPack/waterAndDrainage` — water supply, drainage type, sewerage
- `/propertyPack/connectivity` — broadband, mobile, TV

## Specialist Issues
- `/propertyPack/specialistIssues` — dry rot, asbestos, Japanese knotweed, subsidence, health/safety
- `/propertyPack/typeOfConstruction/buildingSafety` — cladding, fire safety remediation

## Rights & Restrictions
- `/propertyPack/rightsAndInformalArrangements` — shared costs, access rights, neighbouring land rights
- `/propertyPack/servicesCrossing` — pipes/cables crossing other property
- `/propertyPack/parking` — parking arrangements, ULEZ, EV charging

## Notices
- `/propertyPack/notices` — neighbour development, planning applications, required maintenance, party wall, listed building applications, infrastructure projects

## Property Description & Features
- `/propertyPack/address` — full address
- `/propertyPack/uprn` — UPRN
- `/propertyPack/buildInformation` — property type, year built, internal area, new build, HMO
- `/propertyPack/residentialPropertyFeatures` — bedrooms, bathrooms, receptions
- `/propertyPack/listingAndConservation` — listed building, conservation area, TPOs
- `/propertyPack/fixturesAndFittings` — what's included/excluded in sale

## Insurance
- `/propertyPack/insurance` — insurance difficulties, current insurance status
- `/propertyPack/guaranteesWarrantiesAndIndemnityInsurances` — warranties, guarantees, indemnity policies

## Price & Transaction
- `/propertyPack/priceInformation` — price, price qualifier, disposal type, sale at undervalue
- `/valuationComparisonData` — valuation estimates, comparable properties
- `/contracts` — contract details
- `/offers` — purchase offers

## Occupiers & Seller
- `/propertyPack/occupiers` — who lives there, anyone over 17
- `/propertyPack/completionAndMoving` — chain status, move dates, mortgage repayment sufficiency
- `/propertyPack/consumerProtectionRegulationsDeclaration` — CPR compliance

## Disputes
- `/propertyPack/disputesAndComplaints` — past disputes, potential disputes

## Electrical
- `/propertyPack/electricalWorks` — electrical testing, post-2005 electrical work

## Smart Home
- `/propertyPack/smartHomeSystems` — smart home systems

## Council Tax
- `/propertyPack/councilTax` — band, charge, alterations affecting band

## Documents & Surveys
- `/propertyPack/documents` — uploaded documents
- `/propertyPack/surveys` — survey reports
- `/propertyPack/valuations` — valuation reports

## Enquiries
- `/enquiries` — transaction enquiries between conveyancers (key-value, each with messages array)

## Milestones
- `/milestones` — listing date, legal forms, SSTC, searches, enquiries, exchange, completion

## Chain
- `/chain/onwardPurchase` — linked transactions in chain

## Common Enquiry Subject → Path Mapping

| Enquiry Subject | Primary Path |
|----------------|-------------|
| Lease length / ground rent / service charges | `/propertyPack/ownership/ownershipsToBeTransferred` (leasehold branch) |
| Building regs for extension/loft/works | `/propertyPack/alterationsAndChanges` + specific alteration sub-path |
| Planning permission | `/propertyPack/alterationsAndChanges/planningPermissionBreaches` |
| Flooding / flood risk | `/propertyPack/environmentalIssues/flooding` |
| Japanese knotweed | `/propertyPack/specialistIssues/japaneseKnotweed` |
| Subsidence | `/propertyPack/specialistIssues/subsidenceOrStructuralFault` |
| Asbestos | `/propertyPack/specialistIssues/containsAsbestos` |
| Title defect / restriction | `/propertyPack/titlesToBeSold` |
| Boundary dispute | `/propertyPack/legalBoundaries` |
| Right of way / access | `/propertyPack/rightsAndInformalArrangements` |
| Party wall | `/propertyPack/notices/partyWallAct` |
| EPC / energy performance | `/propertyPack/energyEfficiency` |
| Drainage / sewerage | `/propertyPack/waterAndDrainage/drainage` |
| Covenants | `/propertyPack/titlesToBeSold` (covenants in register) |
| Conservation area works | `/propertyPack/listingAndConservation/isConservationArea` |
| Listed building consent | `/propertyPack/listingAndConservation/isListed` |
| Occupiers / rights of occupation | `/propertyPack/occupiers` |
| Guarantee / warranty | `/propertyPack/guaranteesWarrantiesAndIndemnityInsurances` |
| Insurance claim / difficulty | `/propertyPack/insurance` |
| Chimney breast removal | `/propertyPack/alterationsAndChanges/removalOfChimneyBreast` |
| Window replacement | `/propertyPack/alterationsAndChanges/windowReplacementsSince2002` |
| Solar panels / feed-in tariff | `/propertyPack/electricity/solarPanels` |
| Damp / dry rot treatment | `/propertyPack/specialistIssues/dryRotEtcTreatment` |
| Neighbour disputes | `/propertyPack/disputesAndComplaints` |
| Chain / onward purchase | `/chain/onwardPurchase` |
| Completion date | `/milestones/completion` |
