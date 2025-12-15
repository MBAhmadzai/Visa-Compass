import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Static visa rules knowledge base for RAG
const visaRulesKnowledge: Record<string, string> = {
  canada: `
CANADA STUDENT VISA (Study Permit) RULES:
- Visa Type: Study Permit
- Processing Time: 4-16 weeks (varies by country)
- Validity: Duration of study program + 90 days
- Work Rights: Up to 20 hours/week during sessions, full-time during breaks

REQUIRED DOCUMENTS:
1. Identity & Travel: Valid passport, passport photos, travel history
2. Acceptance & Education: Letter of Acceptance from DLI, transcripts, IELTS/TOEFL, study plan
3. Financial Proof: CAD 20,635/year + first year tuition, 4-6 months bank statements
4. Additional: Medical exam, police clearance, biometrics, CAQ (Quebec only)

APPLICATION STEPS:
1. Research & apply to DLI (2-4 months before)
2. Gather documents (4-6 weeks)
3. Create IRCC account and fill IMM 1294
4. Pay fees (CAD 150 application + CAD 85 biometrics)
5. Biometrics appointment (within 30 days)
6. Medical examination (1-2 weeks)
7. Wait for decision (4-16 weeks)
8. Receive POE Letter

COSTS:
- Study Permit Application: CAD 150
- Biometrics: CAD 85
- Medical Exam: CAD 200-450
- IELTS: CAD 300-350
- Living costs proof: CAD 20,635/year
- Tuition: CAD 20,000-40,000/year

COMMON REJECTION REASONS:
- Insufficient financial proof
- Weak ties to home country
- Incomplete documentation
- Unconvincing study plan
- Failed language requirements

TIPS:
- Apply 3-4 months before program starts
- Show strong ties to home country
- Ensure genuine, consistent bank statements
- Write clear, specific study plan
`,
  australia: `
AUSTRALIA STUDENT VISA (Subclass 500) RULES:
- Visa Type: Student Visa Subclass 500
- Processing Time: 4-6 weeks (75% of applications)
- Validity: Duration of course + additional time
- Work Rights: Unlimited hours during study (as of July 2023)

REQUIRED DOCUMENTS:
1. Identity: Valid passport, national ID, birth certificate
2. Enrollment: Confirmation of Enrolment (CoE), transcripts, IELTS 5.5+, GTE statement
3. Financial: AUD 24,505/year living costs + tuition + travel costs
4. Health & Character: OSHC, health exam, police clearance

APPLICATION STEPS:
1. Choose CRICOS-registered course (2-3 months before)
2. Receive CoE (2-4 weeks)
3. Prepare GTE statement (1 week)
4. Arrange OSHC (1-2 days)
5. Create ImmiAccount (1-2 days)
6. Pay AUD 710 and submit
7. Health & biometrics (1-2 weeks)
8. Visa decision (4-6 weeks)

COSTS:
- Visa Application: AUD 710
- OSHC: AUD 500-700/year
- Health Exam: AUD 300-500
- IELTS: AUD 395
- Living costs proof: AUD 24,505/year
- Tuition: AUD 20,000-50,000/year

COMMON REJECTION REASONS:
- Failed GTE assessment
- Insufficient financial capacity
- Unexplained study/employment gaps
- English below requirement
- Course unrelated to background

TIPS:
- Make GTE statement personal and Australia-specific
- Explain any gaps clearly
- Show strong home country ties
- Ensure OSHC covers entire visa period
`,
  germany: `
GERMANY STUDENT VISA RULES:
- Visa Type: Student Visa / Residence Permit
- Processing Time: 6-12 weeks (varies by embassy)
- Validity: Initially 3 months, then residence permit
- Work Rights: 120 full days or 240 half days per year

REQUIRED DOCUMENTS:
1. Identity: Valid passport (3+ months beyond stay), biometric photos, visa application
2. Academic: University admission letter (Zulassungsbescheid), apostilled certificates, TestDaF/DSH/IELTS
3. Financial: Blocked account (Sperrkonto) with €11,904/year OR scholarship OR formal obligation letter
4. Additional: Health insurance, accommodation proof, CV, motivation letter

APPLICATION STEPS:
1. Apply to university via uni-assist (3-6 months before)
2. Open blocked account with €11,904 (1-2 weeks)
3. Book embassy appointment (2-3 months ahead)
4. Apostille and translate documents (2-3 weeks)
5. Attend visa interview
6. Wait for processing (6-12 weeks)
7. Receive visa (3 months validity)
8. Register at Ausländerbehörde in Germany

COSTS:
- Visa Application: €75
- Blocked Account: €11,904/year
- Health Insurance: €110-120/month
- Semester Contribution: €150-400
- uni-assist: €75-90
- Tuition (public): €0 (except Baden-Württemberg)

COMMON REJECTION REASONS:
- Insufficient blocked account funds
- Lack of German proficiency
- Non-apostilled documents
- Unclear study motivation
- Unrecognized qualifications

TIPS:
- Book embassy appointment immediately after admission
- Use Fintiba or Expatrio for blocked account
- Learn basic German even for English programs
- Prepare detailed career plan
`,
  "united-kingdom": `
UNITED KINGDOM STUDENT VISA RULES:
- Visa Type: Student Visa (formerly Tier 4)
- Processing Time: 3 weeks (standard), 5 days (priority)
- Validity: Course duration + wrap-up period
- Work Rights: 20 hours/week during term, full-time during holidays

REQUIRED DOCUMENTS:
1. Identity: Valid passport, previous UK visas, TB test (certain countries), biometrics
2. Academic: CAS number, qualifications in CAS, IELTS UKVI, ATAS certificate (certain subjects)
3. Financial: Tuition in CAS + £1,334/month (London) or £1,023/month (outside) for 9 months, 28 consecutive days
4. Additional: Parental consent (if under 18), relationship proof for parent's funds

APPLICATION STEPS:
1. Get university offer (3-6 months before)
2. Receive CAS number (2-4 weeks after accepting)
3. Prepare finances for 28+ consecutive days
4. Complete online application, pay IHS and visa fee
5. Book biometrics appointment (1-2 days)
6. Attend appointment with documents
7. Wait for decision (3 weeks standard)
8. Receive visa and BRP collection letter

COSTS:
- Visa Application: £490
- Immigration Health Surcharge: £776/year
- Priority Processing: £500 extra
- IELTS UKVI: £195-210
- Living costs proof: £12,006 (London) or £9,207 (outside) for 9 months
- Tuition: £15,000-35,000/year

COMMON REJECTION REASONS:
- Insufficient or inconsistent funds
- Funds not held for 28 days
- CAS details don't match documents
- English requirement not met
- Missing or fraudulent documents

TIPS:
- Apply up to 6 months before course starts
- Maintain funds for 28+ days before applying
- Check CAS details match your documents exactly
- Apply for ATAS early if required
`,
  japan: `
JAPAN STUDENT VISA RULES:
- Visa Type: Student Visa (Ryugaku)
- Processing Time: 1-3 months for CoE, then 1 week for visa
- Validity: 6 months to 4 years 3 months
- Work Rights: Up to 28 hours/week with permission

REQUIRED DOCUMENTS:
1. Identity: Valid passport, visa application, photos
2. Academic: Certificate of Eligibility (CoE), admission documents, transcripts
3. Financial: Bank statement (¥1,500,000-2,000,000), sponsor documents if applicable
4. Additional: Study plan, residence and travel documents

APPLICATION STEPS:
1. Apply to school (language school or university)
2. School applies for CoE (1-3 months)
3. Receive CoE by mail
4. Apply for visa at embassy with CoE (1-5 days)
5. Prepare travel and accommodation
6. Arrive and register at ward office
7. Apply for work permission (if needed)

COSTS:
- Visa Application: Free to ¥3,000 (varies by country)
- CoE Processing: Usually handled by school
- Tuition (language school): ¥700,000-900,000/year
- Tuition (university): ¥500,000-1,500,000/year
- Living costs: ¥80,000-150,000/month

COMMON REJECTION REASONS:
- Insufficient financial proof
- Unclear study purpose
- Poor Japanese or English proficiency
- Low attendance at previous schools
- Inconsistent application information

TIPS:
- Start learning Japanese early
- Consider MEXT scholarship for funded study
- April and October are main intakes
- School handles most visa paperwork
- Keep all financial documents organized
`
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      currentCountry, 
      destinationCountry, 
      educationLevel, 
      fieldOfStudy, 
      budgetRange 
    } = await req.json();

    console.log('Generating visa roadmap for:', { 
      currentCountry, 
      destinationCountry, 
      educationLevel, 
      fieldOfStudy, 
      budgetRange 
    });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Retrieve country-specific visa rules (RAG approach)
    const countryRules = visaRulesKnowledge[destinationCountry] || 
      'No specific rules available for this destination.';

    const systemPrompt = `You are VisaVerse Copilot, an AI global mobility assistant helping students navigate visa applications.

CRITICAL RULES:
- Speak in simple, calm, human language
- NEVER claim legal authority
- NEVER guarantee visa approval
- Always prioritize clarity over verbosity
- If rules vary or are unclear, state assumptions explicitly
- This is guidance, not legal advice

Your role is to generate a personalized student visa roadmap using ONLY the provided country rules.`;

    const userPrompt = `Generate a comprehensive, personalized student visa roadmap for this student:

STUDENT PROFILE:
- Current Country: ${currentCountry}
- Destination: ${destinationCountry}
- Education Level: ${educationLevel}
- Field of Study: ${fieldOfStudy}
- Budget Range: ${budgetRange}

COUNTRY VISA RULES:
${countryRules}

Please provide a structured roadmap with these sections:

## 📋 Required Documents Checklist
List all documents needed, organized by category. Mark essential ones.

## 📅 Step-by-Step Timeline
Provide a realistic timeline with specific actions and timeframes.

## 💰 Estimated Cost Breakdown
Break down all costs the student should expect.

## ⚠️ Common Rejection Risks
List the main reasons applications get rejected and how to avoid them.

## 🎯 Your Next Immediate Action
One specific, actionable step the student should take TODAY.

## 💡 Personalized Tips
Based on their profile (budget: ${budgetRange}, field: ${fieldOfStudy}, level: ${educationLevel}), provide 3-4 specific tips.

Keep the tone practical, calm, and honest. If any information is uncertain, clearly say so.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a moment.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'Service temporarily unavailable. Please try again later.' 
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const roadmapContent = data.choices?.[0]?.message?.content;

    if (!roadmapContent) {
      throw new Error('No content in AI response');
    }

    console.log('Successfully generated visa roadmap');

    return new Response(JSON.stringify({ 
      roadmap: roadmapContent,
      destination: destinationCountry,
      generatedAt: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating visa roadmap:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to generate roadmap' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
