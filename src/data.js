export const COMPLIANCE_DATA = {
  food: {
    label: "🍟 Food Safety",
    sections: [
      {
        id: "fs1", title: "Food Business Registration", meta: "FSA / Local Authority",
        priority: "critical",
        callout: { type: "red", text: "MUST DO FIRST: Register with Lambeth Council Environmental Health at least 28 days before opening. It's FREE and legally required. Operating without it is a criminal offence." },
        items: [
          { id: "fs1a", title: "Register food business with Lambeth Council Environmental Health", detail: "At least 28 days before trading. Required even if inheriting premises.", law: "Food Safety Act 1990 | Food Hygiene Regs 2006", freq: "ONE-OFF / UPON CHANGE" },
          { id: "fs1b", title: "Obtain / renew Food Hygiene Rating (FSA)", detail: "Lambeth EHO will inspect and issue a 0–5 rating. Display certificate prominently.", law: "Food Hygiene Rating Scheme", freq: "ONGOING — UNANNOUNCED INSPECTIONS" },
          { id: "fs1c", title: "Food Safety Management System (HACCP) in place", detail: "Written HACCP or FSA's 'Safer Food, Better Business' pack. Must be documented and followed.", law: "EC Regulation 852/2004 | food.gov.uk/sfbb", freq: "ONGOING — REVIEW ANNUALLY" },
          { id: "fs1d", title: "Food safety training for all food handlers", detail: "All food handlers need Level 2 Award in Food Safety. GM/supervisor should hold Level 3.", law: "Food Hygiene Regulations 2006 Reg 5", freq: "ON HIRE — REFRESH EVERY 3 YEARS" },
          { id: "fs1e", title: "Allergen management system documented", detail: "14 major allergens must be clearly communicated. Written records, staff training, menu labelling all required.", law: "EU FIC Regulation / Natasha's Law 2021", freq: "REVIEW WITH EVERY MENU CHANGE" },
        ]
      },
      {
        id: "fs2", title: "Temperature Control", meta: "Cold Chain & Cooking Temps",
        priority: "critical",
        callout: { type: "gold", text: "UK Legal Requirements: Chilled food ≤8°C (ideally ≤5°C). Hot food >63°C. Fish must reach core temp 70°C for 2 minutes." },
        items: [
          { id: "fs2a", title: "Daily fridge/freezer temperature checks (AM & PM)", detail: "Log all readings. Fridge ≤5°C. Freezer ≤-18°C. Use calibrated probe thermometer.", freq: "DAILY — TWICE PER DAY" },
          { id: "fs2b", title: "Cooking temperature checks — fish, batter, chips", detail: "Core temp of fish/protein must reach 70°C for 2 mins minimum. Log results.", freq: "EVERY SERVICE" },
          { id: "fs2c", title: "Hot holding checks — gravy, mushy peas, curry sauce", detail: "All hot-held food must stay above 63°C. Check and log hourly.", freq: "HOURLY DURING SERVICE" },
          { id: "fs2d", title: "Probe thermometer calibration records", detail: "Calibrate monthly using ice water (0°C) and boiling water (100°C). Log calibration.", freq: "MONTHLY" },
          { id: "fs2e", title: "Fryer oil temperature checks", detail: "Oil must reach correct frying temp (175–185°C). Check and log. Change oil per HACCP schedule.", freq: "DAILY / PER SERVICE" },
        ]
      },
      {
        id: "fs3", title: "Cleaning & Hygiene", meta: "Premises, Equipment & Personal",
        priority: "important",
        items: [
          { id: "fs3a", title: "Written cleaning schedule in place and displayed", detail: "Every surface, piece of equipment, and frequency listed. Staff sign off completed tasks.", freq: "REVIEW QUARTERLY" },
          { id: "fs3b", title: "Staff personal hygiene rules documented and briefed", detail: "Handwashing procedure, uniform policy, no jewellery, hair nets/hats, illness reporting.", freq: "ON HIRE + REFRESH ANNUALLY" },
          { id: "fs3c", title: "Deep clean schedule (fryers, extraction, cold rooms)", detail: "Weekly deep clean of fryers. Monthly for extraction canopy. Log completed.", freq: "WEEKLY / MONTHLY" },
          { id: "fs3d", title: "Pest control contract with licensed contractor", detail: "Written contract with Lambeth-approved pest control. Regular inspections and treatment logs.", law: "Food Safety (General Food Hygiene) Regulations", freq: "QUARTERLY MINIMUM" },
          { id: "fs3e", title: "Waste management — food waste disposal records", detail: "Comply with food waste regulations. Lidded bins, daily disposal, log waste volumes.", law: "Environmental Protection Act 1990", freq: "DAILY" },
        ]
      },
      {
        id: "fs4", title: "Stock & Supplier Control", meta: "Traceability & Delivery Checks",
        priority: "standard",
        items: [
          { id: "fs4a", title: "Supplier approval list — all suppliers documented", detail: "Records of all food suppliers, delivery notes, invoices. Must trace food back to source.", law: "General Food Regulations 2004", freq: "ONGOING — REVIEW ANNUALLY" },
          { id: "fs4b", title: "Delivery checks — temp, packaging, use-by dates", detail: "Inspect all deliveries. Record temp of chilled/frozen goods. Reject non-compliant deliveries.", freq: "EVERY DELIVERY" },
          { id: "fs4c", title: "FIFO stock rotation enforced", detail: "First In, First Out. Oldest stock used first. Date labels on all opened products.", freq: "DAILY" },
          { id: "fs4d", title: "Use-by vs best-before distinction enforced", detail: "Never serve food past use-by date. Brief all staff on the legal difference.", law: "Food Safety Act 1990", freq: "DAILY" },
        ]
      }
    ]
  },
  staff: {
    label: "👥 Staff & HR",
    sections: [
      {
        id: "hr1", title: "Right to Work", meta: "UK Home Office Requirement",
        priority: "critical",
        callout: { type: "red", text: "FINES UP TO £20,000 PER ILLEGAL WORKER. Must check right to work BEFORE employment starts. Keep copies of all documents." },
        items: [
          { id: "hr1a", title: "Right to work check for every employee before start date", detail: "Check original documents (passport/visa/share code). Copy and date-stamp. Use online checker for non-UK nationals.", law: "Immigration, Asylum and Nationality Act 2006", freq: "BEFORE EVERY NEW HIRE" },
          { id: "hr1b", title: "Follow-up checks for time-limited visa permissions", detail: "Diarise repeat checks for staff with expiring visas or time-limited leave.", freq: "AS REQUIRED PER VISA EXPIRY" },
        ]
      },
      {
        id: "hr2", title: "Pay & Contracts", meta: "NMW + Employment Law",
        priority: "critical",
        callout: { type: "gold", text: "2024/25 National Living Wage: £12.21/hr (21+) | £10.00/hr (18–20) | £7.55/hr (under 18). Failure to pay is a criminal offence." },
        items: [
          { id: "hr2a", title: "Written employment contracts issued to all staff — Day 1", detail: "All employees and workers must receive written statement of particulars on or before Day 1.", law: "Employment Rights Act 1996", freq: "EVERY NEW HIRE — DAY 1" },
          { id: "hr2b", title: "Pay at or above National Living Wage / NMW", detail: "Check rates every April when updated. Includes part-time and casual workers.", freq: "ONGOING — CHECK EACH APRIL" },
          { id: "hr2c", title: "Itemised payslips issued on or before payday", detail: "All workers must receive itemised payslips showing gross pay, deductions, net pay.", law: "Employment Rights Act 1996 s8", freq: "EVERY PAY PERIOD" },
          { id: "hr2d", title: "PAYE registration and RTI submissions to HMRC", detail: "Register as employer with HMRC. Submit Real Time Information (RTI) each payday.", law: "PAYE Regulations", freq: "EVERY PAY PERIOD" },
          { id: "hr2e", title: "Statutory holiday entitlement calculated correctly", detail: "All workers entitled to 5.6 weeks paid holiday per year (pro-rata for part-time).", law: "Working Time Regulations 1998", freq: "ONGOING" },
        ]
      },
      {
        id: "hr3", title: "Training & Qualifications", meta: "Mandatory Certs",
        priority: "important",
        items: [
          { id: "hr3a", title: "Level 2 Food Safety Award for all food handlers", detail: "Minimum requirement for staff handling open food. Certificates kept on file.", freq: "ON HIRE — REFRESH EVERY 3 YEARS" },
          { id: "hr3b", title: "Level 3 Food Safety for manager / supervisor (you)", detail: "Required for HACCP oversight and demonstrating competency to EHO.", freq: "ON APPOINTMENT" },
          { id: "hr3c", title: "Fire safety training for all staff", detail: "All staff know evacuation procedures, extinguisher types, assembly point. Log training.", freq: "ON HIRE + ANNUAL REFRESHER" },
          { id: "hr3d", title: "First Aid at Work — trained first aider on site", detail: "At least one trained first aider during all opening hours. Certificate valid 3 years.", law: "H&S (First Aid) Regulations 1981", freq: "CERT VALID 3 YEARS" },
          { id: "hr3e", title: "Manual handling training documented", detail: "Required for staff lifting stock, equipment, bins. Document completion.", law: "Manual Handling Operations Regulations 1992", freq: "ON HIRE" },
        ]
      },
      {
        id: "hr4", title: "HR Policies", meta: "Required Workplace Policies",
        priority: "standard",
        items: [
          { id: "hr4a", title: "Disciplinary and grievance procedure documented", detail: "Must follow Acas Code of Practice. Give staff a copy before any disciplinary action.", law: "Acas Code of Practice 2015", freq: "IN PLACE BEFORE FIRST HIRE" },
          { id: "hr4b", title: "Equality & anti-discrimination policy", detail: "Must not discriminate on 9 protected characteristics. Written policy recommended.", law: "Equality Act 2010", freq: "REVIEW ANNUALLY" },
          { id: "hr4c", title: "Sickness absence and return-to-work procedure", detail: "Track absences. Conduct return-to-work interviews. Understand Statutory Sick Pay rules.", freq: "ONGOING" },
          { id: "hr4d", title: "Auto-enrolment workplace pension", detail: "All eligible employees must be auto-enrolled. Register with The Pensions Regulator.", law: "Pensions Act 2008", freq: "WITHIN 6 WEEKS OF FIRST HIRE" },
          { id: "hr4e", title: "Working Time Regulations compliance — rest breaks", detail: "20 min break if working 6+ hours. 11 hrs rest between shifts. Max 48 hrs/week average.", law: "Working Time Regulations 1998", freq: "ONGOING ROTA MANAGEMENT" },
        ]
      }
    ]
  },
  health: {
    label: "🔥 Health & Safety",
    sections: [
      {
        id: "hs1", title: "Risk Assessment", meta: "Legal H&S Requirement",
        priority: "critical",
        callout: { type: "red", text: "LEGAL DUTY: All employers must carry out a suitable and sufficient risk assessment. With 5+ employees it must be written down." },
        items: [
          { id: "hs1a", title: "General workplace risk assessment completed", detail: "Covers all hazards: hot surfaces, slips/trips, manual handling, electrical, chemical exposure.", law: "MHSW Regulations 1999 Reg 3", freq: "ON OPENING — REVIEW ANNUALLY" },
          { id: "hs1b", title: "Fire Risk Assessment by competent person", detail: "Mandatory for all non-domestic premises. Review if layout or use changes.", law: "Regulatory Reform (Fire Safety) Order 2005", freq: "ANNUALLY + AFTER CHANGES" },
          { id: "hs1c", title: "COSHH assessment — cleaning chemicals and fryer oil", detail: "Assess all cleaning products. Provide correct PPE. Data sheets for all substances.", law: "COSHH Regulations 2002", freq: "ON INTRODUCING NEW CHEMICALS" },
        ]
      },
      {
        id: "hs2", title: "Fire Safety", meta: "Chip Shop — HIGH RISK",
        priority: "critical",
        callout: { type: "red", text: "CHIP SHOPS ARE HIGH FIRE RISK due to deep fat fryers and extraction systems. Non-compliance is a criminal offence." },
        items: [
          { id: "hs2a", title: "Class F wet chemical fire extinguisher for fryer fires", detail: "Must have wet chemical extinguisher for cooking oil fires + CO2 for electrical. Annually serviced.", freq: "ANNUAL SERVICE + MONTHLY VISUAL CHECK" },
          { id: "hs2b", title: "Automatic fire suppression system on fryer (check requirement)", detail: "Check with Lambeth Fire Brigade — likely required for commercial fryers. Annual service.", freq: "ANNUAL SERVICE" },
          { id: "hs2c", title: "Extraction duct cleaning certificate", detail: "Grease build-up in ducts is a major fire risk. Professionally cleaned and certified.", freq: "EVERY 3–6 MONTHS" },
          { id: "hs2d", title: "Fire alarm system tested and serviced", detail: "Weekly test of call point. Full annual service by competent engineer. Log all tests.", freq: "WEEKLY TEST / ANNUAL SERVICE" },
          { id: "hs2e", title: "Emergency lighting tested", detail: "Monthly brief test. Annual full-duration test. Log all results.", freq: "MONTHLY + ANNUAL" },
          { id: "hs2f", title: "Fire drill completed and recorded", detail: "At least once a year. All staff participate. Record date, time, staff present, issues.", freq: "ANNUALLY MINIMUM" },
          { id: "hs2g", title: "Fire evacuation plan displayed and communicated", detail: "Posted in kitchen and customer area. All staff briefed on routes and assembly point.", freq: "ON HIRE + REVIEW ANNUALLY" },
        ]
      },
      {
        id: "hs3", title: "Electrical & Gas Safety", meta: "Fixed Installations",
        priority: "important",
        items: [
          { id: "hs3a", title: "EICR — Electrical Installation Condition Report", detail: "Full electrical inspection by qualified electrician. Commercial premises: every 5 years.", law: "Electricity at Work Regulations 1989", freq: "EVERY 5 YEARS" },
          { id: "hs3b", title: "PAT testing — portable appliances", detail: "Test all portable electrical equipment. Kitchen environments: annually recommended.", freq: "ANNUALLY" },
          { id: "hs3c", title: "Gas Safety Certificate — CP12 (commercial)", detail: "Annual gas safety inspection by Gas Safe registered engineer for all gas appliances.", law: "Gas Safety (Installation and Use) Regulations 1998", freq: "ANNUALLY" },
          { id: "hs3d", title: "Fryer thermostat and oil level safety checks", detail: "Check thermostat function daily. Ensure oil is at correct level before heating.", freq: "DAILY BEFORE SERVICE" },
        ]
      },
      {
        id: "hs4", title: "Accidents & Incidents", meta: "RIDDOR & First Aid",
        priority: "standard",
        items: [
          { id: "hs4a", title: "Accident book maintained for all incidents", detail: "Log all injuries and near-misses. Must be accessible and retained for 3 years.", law: "Social Security (Claims & Payments) Regs 1979", freq: "AFTER EVERY INCIDENT" },
          { id: "hs4b", title: "RIDDOR reporting — serious injuries reported to HSE", detail: "Report fatalities, specified injuries, 7+ day incapacitation, dangerous occurrences within 10 days.", law: "RIDDOR 2013", freq: "AS REQUIRED — WITHIN 10 DAYS" },
          { id: "hs4c", title: "First aid box stocked and checked monthly", detail: "Adequately stocked for team size. Check contents monthly and record.", law: "H&S (First Aid) Regs 1981", freq: "MONTHLY CHECK" },
          { id: "hs4d", title: "H&S Law poster displayed prominently", detail: "'Health and Safety Law — What You Need to Know' poster displayed where staff can see it.", law: "H&S Info for Employees Regs 1989", freq: "PERMANENT DISPLAY" },
        ]
      }
    ]
  },
  legal: {
    label: "⚖️ Legal & Licensing",
    sections: [
      {
        id: "lg1", title: "Licences & Permissions", meta: "Lambeth Council",
        priority: "critical",
        items: [
          { id: "lg1a", title: "Food Business Registration — Lambeth Environmental Health", detail: "Free registration required. Cannot trade without it. Apply 28 days before opening.", freq: "BEFORE OPENING" },
          { id: "lg1b", title: "Planning permission — A3/A5 food use confirmed", detail: "Verify planning class (A3 restaurant or A5 hot food takeaway). Late-night opening may need extra consent.", freq: "CHECK BEFORE OPENING / ON CHANGE" },
          { id: "lg1c", title: "Late Night Refreshment Licence (if open past 11pm)", detail: "If serving hot food after 11pm, need Late Night Refreshment Licence from Lambeth.", law: "Licensing Act 2003", freq: "ONGOING — ANNUAL REVIEW" },
          { id: "lg1d", title: "Music licence (PRS/PPL) for playing music on premises", detail: "Need TheMusicLicence (themusiclicence.co.uk) to legally play background music.", freq: "ANNUAL" },
          { id: "lg1e", title: "Pavement licence if using outdoor space / A-boards", detail: "Tables, seating or A-boards on public pavement require Lambeth pavement licence.", law: "Business and Planning Act 2020", freq: "ANNUAL RENEWAL" },
        ]
      },
      {
        id: "lg2", title: "Insurance", meta: "Legal & Strongly Recommended",
        priority: "important",
        callout: { type: "red", text: "Employers' Liability Insurance is a LEGAL REQUIREMENT if you employ anyone. Certificate must be displayed on premises." },
        items: [
          { id: "lg2a", title: "Employers' Liability Insurance — £5m minimum", detail: "LEGALLY REQUIRED if you employ anyone, even part-time. Certificate displayed on premises.", law: "Employers' Liability (Compulsory Insurance) Act 1969", freq: "ANNUAL RENEWAL" },
          { id: "lg2b", title: "Public Liability Insurance — minimum £2m recommended", detail: "Covers claims from customers injured on premises or by your food/service.", freq: "ANNUAL RENEWAL" },
