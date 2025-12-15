import { useState } from "react";
import { Header } from "@/components/Header";
import { VisaForm, FormData } from "@/components/VisaForm";
import { RoadmapResults } from "@/components/RoadmapResults";
import { LoadingState } from "@/components/LoadingState";
import { countryOptions, educationLevels, budgetRanges, studyFields } from "@/data/visaRules";
import { toast } from "sonner";
import { GraduationCap, Shield, Zap, Globe } from "lucide-react";

type AppState = "form" | "loading" | "results";

export default function Index() {
  const [appState, setAppState] = useState<AppState>("form");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [aiResponse, setAiResponse] = useState<string>("");

  const generateAIResponse = async (data: FormData): Promise<string> => {
    const educationLabel = educationLevels.find(e => e.value === data.educationLevel)?.label || data.educationLevel;
    const fieldLabel = studyFields.find(f => f.value === data.fieldOfStudy)?.label || data.fieldOfStudy;
    const budgetLabel = budgetRanges.find(b => b.value === data.budgetRange)?.label || data.budgetRange;
    const countryLabel = countryOptions.find(c => c.value === data.destinationCountry)?.label || data.destinationCountry;

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-visa-roadmap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        currentCountry: data.currentCountry,
        destinationCountry: data.destinationCountry,
        educationLevel: educationLabel,
        fieldOfStudy: fieldLabel,
        budgetRange: budgetLabel,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate roadmap');
    }

    const result = await response.json();
    return result.roadmap;
  };

  const handleFormSubmit = async (data: FormData) => {
    setFormData(data);
    setAppState("loading");

    try {
      const response = await generateAIResponse(data);
      setAiResponse(response);
      setAppState("results");
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast.error("Failed to generate roadmap. Please try again.");
      setAppState("form");
    }
  };

  const handleReset = () => {
    setFormData(null);
    setAiResponse("");
    setAppState("form");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {appState === "form" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-6 section-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                <Zap className="h-4 w-4" />
                AI-Powered Guidance
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
                Your Student Visa
                <br />
                <span className="gradient-text">Roadmap Starts Here</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Get a personalized, step-by-step guide to studying abroad. 
                Our AI turns complex visa rules into clear, actionable steps.
              </p>
            </section>

            {/* Supported Countries */}
            <section className="section-fade-in delay-100">
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {countryOptions.map((country) => (
                  <div
                    key={country.value}
                    className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full"
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span className="text-sm font-medium text-foreground">{country.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Form */}
            <section className="card-elevated-lg p-6 md:p-8 section-fade-in delay-200">
              <div className="mb-6">
                <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                  Tell us about your study plans
                </h2>
                <p className="text-muted-foreground">
                  Answer a few questions to receive your personalized visa roadmap.
                </p>
              </div>
              <VisaForm onSubmit={handleFormSubmit} isLoading={false} />
            </section>

            {/* Features */}
            <section className="grid md:grid-cols-3 gap-6 section-fade-in delay-300">
              <FeatureCard
                icon={Globe}
                title="5 Top Destinations"
                description="Canada, Australia, Germany, UK, and Japan - the most popular student visa countries."
              />
              <FeatureCard
                icon={Shield}
                title="Updated Information"
                description="Country-specific requirements based on official immigration guidelines."
              />
              <FeatureCard
                icon={GraduationCap}
                title="Personalized Advice"
                description="AI-tailored recommendations based on your profile and goals."
              />
            </section>
          </div>
        )}

        {appState === "loading" && <LoadingState />}

        {appState === "results" && formData && (
          <RoadmapResults
            destinationCountry={formData.destinationCountry}
            aiResponse={aiResponse}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            VisaVerse Copilot is a prototype for informational purposes only. 
            This is not legal advice. Always consult official government sources.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Built for hackathon demonstration • 2024
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: typeof Globe; 
  title: string; 
  description: string;
}) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl">
      <div className="p-2 bg-primary/10 rounded-lg w-fit mb-4">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
