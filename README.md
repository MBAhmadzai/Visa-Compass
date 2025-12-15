# VisaVerse Copilot 🌍

> **AI-Powered Student Visa Roadmap Generator**
> 
> Transform complex immigration rules into clear, actionable guidance for international students.

---

## 🎯 What is VisaVerse Copilot?

VisaVerse Copilot is an AI-powered tool that generates personalized, step-by-step student visa roadmaps. It takes the confusion out of international student visa applications by providing clear timelines, document checklists, cost breakdowns, and practical tips tailored to each student's unique situation.

**This is a prototype for demonstration purposes. It is not legal advice.**

---

## ✨ Core Feature

### Visa Roadmap Generator

Students input their profile, and the AI generates a comprehensive roadmap including:

- ✅ **Required Documents Checklist** - Everything needed, organized by category
- 📅 **Step-by-Step Timeline** - Realistic timeframes for each action
- 💰 **Cost Breakdown** - All fees and expenses to expect
- ⚠️ **Rejection Risk Alerts** - Common pitfalls and how to avoid them
- 🎯 **Immediate Next Action** - One specific step to take today
- 💡 **Personalized Tips** - Advice based on budget, field, and education level

---

## 🌐 Supported Destinations

| Country | Visa Type |
|---------|-----------|
| 🇨🇦 Canada | Study Permit |
| 🇦🇺 Australia | Student Visa (Subclass 500) |
| 🇩🇪 Germany | Student Visa / Residence Permit |
| 🇬🇧 United Kingdom | Student Visa |
| 🇯🇵 Japan | Student Visa (Ryugaku) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      USER INTERFACE                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐ │
│  │  Form Input │ -> │   Loading   │ -> │  Roadmap View   │ │
│  └─────────────┘    └─────────────┘    └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     EDGE FUNCTION                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. Receive user profile                             │   │
│  │  2. Retrieve country-specific visa rules (RAG)       │   │
│  │  3. Construct AI prompt with rules + profile         │   │
│  │  4. Call AI Gateway (Gemini 2.5 Flash)               │   │
│  │  5. Return structured roadmap                        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    KNOWLEDGE BASE                           │
│  Static visa rules for 5 countries:                         │
│  • Documents required       • Processing times              │
│  • Application steps        • Common rejection reasons      │
│  • Costs breakdown          • Official links                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🤖 AI Approach: RAG (Retrieval-Augmented Generation)

VisaVerse uses **Retrieval-Augmented Generation** to ensure accurate, grounded responses:

1. **Knowledge Base**: Static visa rules for each country stored in the edge function
2. **Retrieval**: When a user selects a destination, the relevant country rules are retrieved
3. **Augmented Prompt**: The AI receives both the user's profile AND the official visa rules
4. **Generation**: The AI synthesizes a personalized roadmap using the grounded data

This approach prevents AI hallucination by anchoring responses in verified visa information.

### AI Behavior Rules

- ✅ Speaks in simple, calm, human language
- ✅ Never claims legal authority
- ✅ Never guarantees visa approval
- ✅ Prioritizes clarity over verbosity
- ✅ States assumptions when rules are unclear

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Backend** | Lovable Cloud Edge Functions |
| **AI Model** | Google Gemini 2.5 Flash via Lovable AI Gateway |
| **State** | React useState (single-page app) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd visaverse-copilot

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Demo Flow (Under 3 Minutes)

1. **Open the app** - See the clean landing page with supported countries
2. **Fill the form** - Select destination, education level, field of study, budget
3. **Click "Generate My Roadmap"** - Watch the loading animation
4. **View your roadmap** - See personalized documents, timeline, costs, and tips
5. **Reset and try again** - Test with different profiles

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx           # App header with branding
│   ├── VisaForm.tsx         # User input form
│   ├── RoadmapResults.tsx   # AI-generated roadmap display
│   ├── LoadingState.tsx     # Loading animation
│   └── ui/                  # shadcn/ui components
├── data/
│   └── visaRules.ts         # Static visa rules & form options
├── pages/
│   └── Index.tsx            # Main application page
├── index.css                # Design system & Tailwind config
└── main.tsx                 # App entry point

supabase/
└── functions/
    └── generate-visa-roadmap/
        └── index.ts         # Edge function with RAG logic
```

---

## ⚠️ Disclaimer

**VisaVerse Copilot is a prototype for educational and demonstration purposes only.**

- This tool does NOT provide legal advice
- Visa requirements change frequently - always verify with official government sources
- We do NOT guarantee visa approval or accuracy of information
- Users should consult official embassy websites and immigration lawyers for actual applications

**Official Sources:**
- 🇨🇦 [IRCC Canada](https://www.canada.ca/en/immigration-refugees-citizenship.html)
- 🇦🇺 [Australian Immigration](https://immi.homeaffairs.gov.au/)
- 🇩🇪 [Make it in Germany](https://www.make-it-in-germany.com/)
- 🇬🇧 [UK Visas](https://www.gov.uk/student-visa)
- 🇯🇵 [Japan Immigration](https://www.isa.go.jp/en/)

---

## 👨‍💻 Built By

Solo hackathon submission

---

## 📄 License

MIT License - See LICENSE file for details
