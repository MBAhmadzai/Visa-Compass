export interface VisaRules {
  country: string;
  countryCode: string;
  flag: string;
  visaType: string;
  overview: string;
  processingTime: string;
  validityPeriod: string;
  workRights: string;
  documents: {
    category: string;
    items: string[];
  }[];
  steps: {
    step: number;
    title: string;
    description: string;
    timeframe: string;
  }[];
  costs: {
    item: string;
    amount: string;
    note?: string;
  }[];
  commonRejectionReasons: string[];
  tips: string[];
  officialLinks: {
    title: string;
    url: string;
  }[];
}

export const visaRulesData: Record<string, VisaRules> = {
  canada: {
    country: "Canada",
    countryCode: "CA",
    flag: "🇨🇦",
    visaType: "Study Permit",
    overview: "Canada's Study Permit allows international students to study at designated learning institutions (DLIs). Students may also be eligible to work part-time during studies and apply for post-graduation work permits.",
    processingTime: "4-16 weeks (varies by country)",
    validityPeriod: "Duration of study program + 90 days",
    workRights: "Up to 20 hours/week during sessions, full-time during breaks",
    documents: [
      {
        category: "Identity & Travel",
        items: [
          "Valid passport (valid for duration of stay)",
          "Two recent passport-sized photographs",
          "Previous travel history documents (if applicable)"
        ]
      },
      {
        category: "Acceptance & Education",
        items: [
          "Letter of Acceptance from a DLI",
          "Previous academic transcripts and certificates",
          "Proof of language proficiency (IELTS/TOEFL)",
          "Study plan/Statement of Purpose"
        ]
      },
      {
        category: "Financial Proof",
        items: [
          "Proof of funds: CAD 20,635/year + first year tuition",
          "Bank statements (last 4-6 months)",
          "Scholarship letter (if applicable)",
          "Financial sponsor letter and documents (if sponsored)"
        ]
      },
      {
        category: "Additional Requirements",
        items: [
          "Medical examination results",
          "Police clearance certificate",
          "Biometrics (fingerprints and photo)",
          "Quebec Acceptance Certificate (CAQ) - if studying in Quebec"
        ]
      }
    ],
    steps: [
      {
        step: 1,
        title: "Research & Apply to DLI",
        description: "Choose a Designated Learning Institution and program. Apply and receive Letter of Acceptance.",
        timeframe: "2-4 months before intake"
      },
      {
        step: 2,
        title: "Gather Documents",
        description: "Collect all required documents including financial proof, academic records, and language test scores.",
        timeframe: "4-6 weeks"
      },
      {
        step: 3,
        title: "Create Online Account",
        description: "Create an account on IRCC portal and fill the study permit application (IMM 1294).",
        timeframe: "1-2 days"
      },
      {
        step: 4,
        title: "Pay Fees & Submit",
        description: "Pay application fee (CAD 150) and biometrics fee (CAD 85). Submit application online.",
        timeframe: "1 day"
      },
      {
        step: 5,
        title: "Biometrics Appointment",
        description: "Attend biometrics collection at a designated center within 30 days of instruction.",
        timeframe: "Within 30 days"
      },
      {
        step: 6,
        title: "Medical Examination",
        description: "Complete medical exam with a panel physician if required.",
        timeframe: "1-2 weeks"
      },
      {
        step: 7,
        title: "Wait for Decision",
        description: "Application processing. You may be asked for additional documents or interview.",
        timeframe: "4-16 weeks"
      },
      {
        step: 8,
        title: "Receive POE Letter",
        description: "If approved, receive Port of Entry (POE) Letter of Introduction. Arrange travel.",
        timeframe: "1 week"
      }
    ],
    costs: [
      { item: "Study Permit Application", amount: "CAD 150", note: "Non-refundable" },
      { item: "Biometrics", amount: "CAD 85", note: "One-time fee" },
      { item: "Medical Exam", amount: "CAD 200-450", note: "Varies by location" },
      { item: "Language Test (IELTS)", amount: "CAD 300-350", note: "Valid for 2 years" },
      { item: "Proof of Funds (Living)", amount: "CAD 20,635/year", note: "Outside Quebec" },
      { item: "Average Tuition (Undergraduate)", amount: "CAD 20,000-40,000/year", note: "Varies by program" }
    ],
    commonRejectionReasons: [
      "Insufficient proof of financial support",
      "Weak ties to home country",
      "Incomplete or inconsistent documentation",
      "Unconvincing study plan or purpose of study",
      "Concerns about genuine student intent",
      "Failure to meet language requirements",
      "Medical inadmissibility"
    ],
    tips: [
      "Apply at least 3-4 months before your program starts",
      "Show strong ties to your home country (family, property, job offers)",
      "Ensure bank statements show consistent, genuine funds",
      "Get your documents notarized and translated if required",
      "Write a clear, specific study plan explaining why Canada"
    ],
    officialLinks: [
      { title: "IRCC Study Permit", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html" },
      { title: "DLI List", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html" }
    ]
  },
  australia: {
    country: "Australia",
    countryCode: "AU",
    flag: "🇦🇺",
    visaType: "Student Visa (Subclass 500)",
    overview: "Australia's Student Visa allows international students to study full-time at registered educational institutions. It includes work rights and potential pathway to post-study work visas.",
    processingTime: "4-6 weeks (75% of applications)",
    validityPeriod: "Duration of course + additional time",
    workRights: "Unlimited hours during study (as of July 2023)",
    documents: [
      {
        category: "Identity & Travel",
        items: [
          "Valid passport",
          "National ID card (if applicable)",
          "Birth certificate",
          "Evidence of name change (if applicable)"
        ]
      },
      {
        category: "Enrollment & Education",
        items: [
          "Confirmation of Enrolment (CoE)",
          "Academic transcripts and certificates",
          "English proficiency (IELTS 5.5+ overall, or equivalent)",
          "Genuine Temporary Entrant (GTE) statement"
        ]
      },
      {
        category: "Financial Requirements",
        items: [
          "Evidence of funds: AUD 24,505/year living costs",
          "First year tuition fees",
          "Travel costs to Australia",
          "School costs for dependents (if applicable)"
        ]
      },
      {
        category: "Health & Character",
        items: [
          "Overseas Student Health Cover (OSHC)",
          "Health examination results",
          "Police clearance certificates",
          "Character statutory declaration"
        ]
      }
    ],
    steps: [
      {
        step: 1,
        title: "Choose Course & Institution",
        description: "Select a CRICOS-registered course and apply to the institution.",
        timeframe: "2-3 months before"
      },
      {
        step: 2,
        title: "Receive CoE",
        description: "Accept offer and pay deposit to receive Confirmation of Enrolment.",
        timeframe: "2-4 weeks"
      },
      {
        step: 3,
        title: "Prepare GTE Statement",
        description: "Write a compelling statement showing genuine intent to study temporarily.",
        timeframe: "1 week"
      },
      {
        step: 4,
        title: "Arrange OSHC",
        description: "Purchase Overseas Student Health Cover for your visa duration.",
        timeframe: "1-2 days"
      },
      {
        step: 5,
        title: "Create ImmiAccount",
        description: "Create account and complete online application (Form 157A).",
        timeframe: "1-2 days"
      },
      {
        step: 6,
        title: "Pay & Submit",
        description: "Pay visa application charge (AUD 710) and submit all documents.",
        timeframe: "1 day"
      },
      {
        step: 7,
        title: "Health & Biometrics",
        description: "Complete health examination and provide biometrics if requested.",
        timeframe: "1-2 weeks"
      },
      {
        step: 8,
        title: "Visa Decision",
        description: "Wait for visa grant notification via email.",
        timeframe: "4-6 weeks"
      }
    ],
    costs: [
      { item: "Student Visa Application", amount: "AUD 710", note: "Primary applicant" },
      { item: "OSHC (per year)", amount: "AUD 500-700", note: "Mandatory health cover" },
      { item: "Health Examination", amount: "AUD 300-500", note: "Panel physician" },
      { item: "IELTS Test", amount: "AUD 395", note: "Or equivalent test" },
      { item: "Living Costs (Proof)", amount: "AUD 24,505/year", note: "Immigration requirement" },
      { item: "Average Tuition", amount: "AUD 20,000-50,000/year", note: "Varies significantly" }
    ],
    commonRejectionReasons: [
      "Failed Genuine Temporary Entrant (GTE) assessment",
      "Insufficient financial capacity",
      "Gap in study or employment not explained",
      "English proficiency below requirement",
      "Health or character concerns",
      "Inconsistencies in application",
      "Choosing course unrelated to background"
    ],
    tips: [
      "Make your GTE statement personal and specific to Australia",
      "Explain any gaps in education or employment clearly",
      "Show strong ties to home country",
      "Ensure OSHC covers your entire visa period",
      "Lodge well before course start date"
    ],
    officialLinks: [
      { title: "Student Visa Info", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" },
      { title: "CRICOS Search", url: "https://cricos.education.gov.au/" }
    ]
  },
  germany: {
    country: "Germany",
    countryCode: "DE",
    flag: "🇩🇪",
    visaType: "Student Visa / Residence Permit",
    overview: "Germany offers tuition-free education at public universities for international students. A student visa is required for stays over 90 days, which converts to a residence permit upon arrival.",
    processingTime: "6-12 weeks (varies by embassy)",
    validityPeriod: "Initially 3 months, then residence permit for study duration",
    workRights: "120 full days or 240 half days per year",
    documents: [
      {
        category: "Identity & Travel",
        items: [
          "Valid passport (valid 3+ months beyond intended stay)",
          "Biometric passport photos (3 copies)",
          "Completed visa application form",
          "Cover letter explaining study purpose"
        ]
      },
      {
        category: "Academic Documents",
        items: [
          "University admission letter (Zulassungsbescheid)",
          "Previous academic certificates (apostilled)",
          "Academic transcripts",
          "German/English proficiency (TestDaF, DSH, or IELTS)"
        ]
      },
      {
        category: "Financial Proof",
        items: [
          "Blocked account (Sperrkonto) with €11,904/year",
          "OR scholarship confirmation",
          "OR formal obligation letter (Verpflichtungserklärung)",
          "OR parent's income proof with bank guarantee"
        ]
      },
      {
        category: "Additional Documents",
        items: [
          "Health insurance proof",
          "Proof of accommodation (initial)",
          "CV/Resume (tabular format)",
          "Motivation letter"
        ]
      }
    ],
    steps: [
      {
        step: 1,
        title: "Apply to University",
        description: "Apply through uni-assist or directly to universities. Receive admission letter.",
        timeframe: "3-6 months before"
      },
      {
        step: 2,
        title: "Open Blocked Account",
        description: "Open a Sperrkonto with €11,904 (monthly release of €992).",
        timeframe: "1-2 weeks"
      },
      {
        step: 3,
        title: "Book Embassy Appointment",
        description: "Schedule visa interview at German embassy. Book early as slots fill quickly.",
        timeframe: "Book 2-3 months ahead"
      },
      {
        step: 4,
        title: "Gather & Legalize Documents",
        description: "Apostille academic documents and get translations certified.",
        timeframe: "2-3 weeks"
      },
      {
        step: 5,
        title: "Attend Visa Interview",
        description: "Attend interview with all original documents. Be prepared to explain study plans.",
        timeframe: "1 day"
      },
      {
        step: 6,
        title: "Wait for Processing",
        description: "Embassy processes application. May request additional documents.",
        timeframe: "6-12 weeks"
      },
      {
        step: 7,
        title: "Receive Visa",
        description: "Collect passport with visa. Valid for 3 months entry.",
        timeframe: "1-2 days"
      },
      {
        step: 8,
        title: "Register in Germany",
        description: "Register at Ausländerbehörde within first weeks to get residence permit.",
        timeframe: "First 2 weeks in Germany"
      }
    ],
    costs: [
      { item: "Student Visa Application", amount: "€75", note: "Embassy fee" },
      { item: "Blocked Account Deposit", amount: "€11,904/year", note: "Mandatory proof" },
      { item: "Health Insurance", amount: "€110-120/month", note: "Public or private" },
      { item: "Semester Contribution", amount: "€150-400/semester", note: "Includes transport pass" },
      { item: "uni-assist Fee", amount: "€75-90", note: "If applicable" },
      { item: "Tuition (Public Unis)", amount: "€0", note: "Except Baden-Württemberg" }
    ],
    commonRejectionReasons: [
      "Insufficient blocked account funds",
      "Lack of German language proficiency for German-taught programs",
      "Incomplete or non-apostilled documents",
      "Unclear study motivation or career plan",
      "Academic qualifications not recognized",
      "Poor interview performance",
      "Late application"
    ],
    tips: [
      "Book embassy appointment as soon as you receive admission",
      "Open blocked account with recognized providers (Fintiba, Expatrio)",
      "Learn basic German even for English programs - helps with visa interview",
      "Prepare a detailed study and career plan",
      "Keep all documents organized in chronological order"
    ],
    officialLinks: [
      { title: "Make it in Germany", url: "https://www.make-it-in-germany.com/en/visa-residence/types/studying" },
      { title: "DAAD", url: "https://www.daad.de/en/study-and-research-in-germany/" }
    ]
  },
  "united-kingdom": {
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    visaType: "Student Visa (formerly Tier 4)",
    overview: "The UK Student Visa allows international students to study at licensed institutions. It offers work rights during studies and pathway to Graduate Visa for post-study work.",
    processingTime: "3 weeks (standard), 5 days (priority)",
    validityPeriod: "Course duration + wrap-up period",
    workRights: "20 hours/week during term, full-time during holidays",
    documents: [
      {
        category: "Identity & Immigration",
        items: [
          "Valid passport with blank pages",
          "Previous UK visas (if any)",
          "Tuberculosis test results (from certain countries)",
          "Biometric information"
        ]
      },
      {
        category: "Academic Requirements",
        items: [
          "Confirmation of Acceptance for Studies (CAS)",
          "Academic qualifications referenced in CAS",
          "English language proficiency (IELTS UKVI, etc.)",
          "ATAS certificate (for certain subjects)"
        ]
      },
      {
        category: "Financial Evidence",
        items: [
          "Tuition fees: amount stated in CAS (or remainder)",
          "Living costs: £1,334/month (London) or £1,023/month (outside)",
          "Must show 28 days of consecutive funds",
          "Bank statement dated within 31 days of application"
        ]
      },
      {
        category: "Additional Documents",
        items: [
          "Parental consent (if under 18)",
          "Relationship proof (if using parent's funds)",
          "Official financial sponsor letter (if applicable)"
        ]
      }
    ],
    steps: [
      {
        step: 1,
        title: "Get University Offer",
        description: "Apply and receive unconditional offer. Accept and pay deposit.",
        timeframe: "3-6 months before"
      },
      {
        step: 2,
        title: "Receive CAS",
        description: "University issues CAS number and statement. Check all details carefully.",
        timeframe: "2-4 weeks after accepting"
      },
      {
        step: 3,
        title: "Prepare Finances",
        description: "Ensure funds are held for 28+ consecutive days. Get bank statement.",
        timeframe: "Maintain for 28 days"
      },
      {
        step: 4,
        title: "Complete Online Application",
        description: "Apply online, pay Immigration Health Surcharge (IHS) and visa fee.",
        timeframe: "1-2 days"
      },
      {
        step: 5,
        title: "Book Biometrics",
        description: "Schedule appointment at visa application centre for biometrics.",
        timeframe: "Book immediately"
      },
      {
        step: 6,
        title: "Attend Appointment",
        description: "Submit documents, provide biometrics, and submit passport.",
        timeframe: "1 day"
      },
      {
        step: 7,
        title: "Wait for Decision",
        description: "Standard processing is 3 weeks. Track online.",
        timeframe: "3 weeks (or 5 days priority)"
      },
      {
        step: 8,
        title: "Collect BRP",
        description: "Receive decision. Collect Biometric Residence Permit within 10 days of arrival.",
        timeframe: "Upon arrival in UK"
      }
    ],
    costs: [
      { item: "Student Visa Fee", amount: "£490", note: "Standard fee" },
      { item: "Immigration Health Surcharge", amount: "£776/year", note: "NHS access" },
      { item: "Priority Processing", amount: "£500", note: "Optional - 5 working days" },
      { item: "TB Test (if required)", amount: "£50-150", note: "Country dependent" },
      { item: "Living Costs (London)", amount: "£1,334/month", note: "9 months required" },
      { item: "Living Costs (Outside London)", amount: "£1,023/month", note: "9 months required" }
    ],
    commonRejectionReasons: [
      "Funds not held for 28 consecutive days",
      "Bank statement older than 31 days at application",
      "Incorrect CAS details or expired CAS",
      "English language score below requirement",
      "Failed credibility interview",
      "Missing TB test certificate",
      "Previous visa violations"
    ],
    tips: [
      "Apply no earlier than 6 months before course start",
      "Triple-check CAS details match your documents",
      "Don't move money around during the 28-day period",
      "Pay IHS in full at application to avoid delays",
      "Consider priority service if timeline is tight"
    ],
    officialLinks: [
      { title: "UK Student Visa Guide", url: "https://www.gov.uk/student-visa" },
      { title: "Financial Requirements", url: "https://www.gov.uk/student-visa/money" }
    ]
  },
  japan: {
    country: "Japan",
    countryCode: "JP",
    flag: "🇯🇵",
    visaType: "Student Visa (留学)",
    overview: "Japan's Student Visa requires a Certificate of Eligibility (CoE) sponsored by your educational institution. It offers part-time work permission and access to Japan's renowned education system.",
    processingTime: "1-3 months (CoE) + 1-2 weeks (visa)",
    validityPeriod: "Duration of course (typically 2 years, renewable)",
    workRights: "28 hours/week with permission (Shikakugai permit)",
    documents: [
      {
        category: "Identity Documents",
        items: [
          "Valid passport",
          "Passport-sized photos (4x3 cm, white background)",
          "Visa application form",
          "Certificate of Eligibility (CoE)"
        ]
      },
      {
        category: "Academic Qualifications",
        items: [
          "Admission letter from Japanese institution",
          "Previous academic certificates (12 years of education)",
          "Academic transcripts",
          "Japanese language proficiency (JLPT N5+ recommended)"
        ]
      },
      {
        category: "Financial Documents",
        items: [
          "Bank statement showing sufficient funds",
          "Scholarship certificate (if applicable)",
          "Sponsor's employment certificate",
          "Sponsor's tax certificate"
        ]
      },
      {
        category: "CoE Application (via School)",
        items: [
          "Application for CoE",
          "Personal history (rirekisho)",
          "Reason for studying in Japan",
          "Daily schedule and study plan"
        ]
      }
    ],
    steps: [
      {
        step: 1,
        title: "Apply to School",
        description: "Apply to Japanese language school or university. Receive admission.",
        timeframe: "5-6 months before"
      },
      {
        step: 2,
        title: "School Applies for CoE",
        description: "School submits CoE application to Immigration Bureau on your behalf.",
        timeframe: "3-4 months before intake"
      },
      {
        step: 3,
        title: "Wait for CoE",
        description: "Immigration Bureau reviews application (1-3 months processing).",
        timeframe: "1-3 months"
      },
      {
        step: 4,
        title: "Receive CoE",
        description: "School receives CoE and sends original to you.",
        timeframe: "1 week shipping"
      },
      {
        step: 5,
        title: "Apply for Visa",
        description: "Submit visa application with CoE at Japanese embassy.",
        timeframe: "1-2 weeks before travel"
      },
      {
        step: 6,
        title: "Collect Visa",
        description: "Visa issued in passport within 5 working days typically.",
        timeframe: "5 working days"
      },
      {
        step: 7,
        title: "Enter Japan",
        description: "Enter Japan, receive Residence Card at airport.",
        timeframe: "Day of arrival"
      },
      {
        step: 8,
        title: "Complete Registration",
        description: "Register address at ward office, apply for work permit.",
        timeframe: "Within 14 days"
      }
    ],
    costs: [
      { item: "Visa Application", amount: "¥3,000-6,000", note: "Single/Multiple entry" },
      { item: "CoE Processing", amount: "Free", note: "Immigration Bureau" },
      { item: "Language School Tuition", amount: "¥700,000-900,000/year", note: "Approximately" },
      { item: "University Tuition (Public)", amount: "¥535,800/year", note: "Standard fee" },
      { item: "University Tuition (Private)", amount: "¥800,000-1,500,000/year", note: "Varies widely" },
      { item: "Living Costs", amount: "¥80,000-150,000/month", note: "Location dependent" }
    ],
    commonRejectionReasons: [
      "Insufficient Japanese language proficiency",
      "Poor academic history or attendance record",
      "Unclear study purpose or career plan",
      "Insufficient financial support",
      "Discrepancies in application documents",
      "School not properly accredited",
      "Previous visa violations in Japan"
    ],
    tips: [
      "Start Japanese language study before applying - JLPT helps",
      "Apply to schools 6+ months ahead for April/October intake",
      "CoE is valid only 3 months - time your visa application",
      "Prepare a detailed study plan in Japanese",
      "Budget for 3-6 months living costs upfront"
    ],
    officialLinks: [
      { title: "MOFA Visa Information", url: "https://www.mofa.go.jp/j_info/visit/visa/index.html" },
      { title: "Immigration Bureau", url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html" }
    ]
  }
};

export const countryOptions = [
  { value: "canada", label: "Canada", flag: "🇨🇦" },
  { value: "australia", label: "Australia", flag: "🇦🇺" },
  { value: "germany", label: "Germany", flag: "🇩🇪" },
  { value: "united-kingdom", label: "United Kingdom", flag: "🇬🇧" },
  { value: "japan", label: "Japan", flag: "🇯🇵" }
];

export const educationLevels = [
  { value: "language", label: "Language Program" },
  { value: "undergraduate", label: "Undergraduate (Bachelor's)" },
  { value: "postgraduate", label: "Postgraduate (Master's)" },
  { value: "doctoral", label: "Doctoral (PhD)" },
  { value: "vocational", label: "Vocational/Technical" }
];

export const budgetRanges = [
  { value: "limited", label: "Limited (< $15,000/year)" },
  { value: "moderate", label: "Moderate ($15,000 - $30,000/year)" },
  { value: "comfortable", label: "Comfortable ($30,000 - $50,000/year)" },
  { value: "flexible", label: "Flexible (> $50,000/year)" }
];

export const studyFields = [
  { value: "engineering", label: "Engineering & Technology" },
  { value: "business", label: "Business & Management" },
  { value: "sciences", label: "Natural Sciences" },
  { value: "medicine", label: "Medicine & Health Sciences" },
  { value: "arts", label: "Arts & Humanities" },
  { value: "law", label: "Law & Legal Studies" },
  { value: "computer-science", label: "Computer Science & IT" },
  { value: "social-sciences", label: "Social Sciences" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" }
];
