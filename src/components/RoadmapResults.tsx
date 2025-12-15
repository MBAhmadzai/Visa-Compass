import { 
  FileText, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { visaRulesData } from "@/data/visaRules";
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { toast } from "sonner";
interface RoadmapResultsProps {
  destinationCountry: string;
  aiResponse: string;
  onReset: () => void;
}

export function RoadmapResults({ destinationCountry, aiResponse, onReset }: RoadmapResultsProps) {
  const countryData = visaRulesData[destinationCountry];
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    documents: true,
    timeline: true,
    costs: true,
    risks: true,
    nextSteps: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSaveAsPdf = async () => {
    if (!contentRef.current) return;
    
    setIsGeneratingPdf(true);
    try {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `visa-roadmap-${countryData?.country || 'unknown'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      await html2pdf().set(opt).from(contentRef.current).save();
      toast.success("PDF saved successfully!");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!countryData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Country data not found.</p>
        <Button variant="outline" onClick={onReset} className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8" ref={contentRef}>
      {/* Header */}
      <div className="text-center space-y-4 section-fade-in">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-success/10 text-success rounded-full">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Your roadmap is ready</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          {countryData.flag} {countryData.country} {countryData.visaType}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {countryData.overview}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="px-3 py-1 bg-muted rounded-full">
            Processing: {countryData.processingTime}
          </span>
          <span className="px-3 py-1 bg-muted rounded-full">
            Validity: {countryData.validityPeriod}
          </span>
          <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full">
            Work: {countryData.workRights}
          </span>
        </div>
      </div>

      {/* AI Personalized Response */}
      {aiResponse && (
        <div className="card-elevated-lg p-6 md:p-8 section-fade-in delay-100">
          <h3 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="text-2xl">✨</span>
            Your Personalized Roadmap
          </h3>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div 
              className="text-foreground/90 leading-relaxed space-y-4 [&>h2]:text-lg [&>h2]:font-display [&>h2]:font-semibold [&>h2]:text-foreground [&>h2]:mt-6 [&>h2]:mb-3 [&>ul]:space-y-2 [&>ul]:ml-4 [&>li]:text-foreground/80 [&>p]:text-foreground/80"
              dangerouslySetInnerHTML={{ 
                __html: aiResponse
                  .replace(/## (.*)/g, '<h2>$1</h2>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                  .replace(/- (.*)/g, '<li>• $1</li>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^/, '<p>')
                  .replace(/$/, '</p>')
              }}
            />
          </div>
        </div>
      )}

      {/* Documents Checklist */}
      <div className="card-elevated-lg overflow-hidden section-fade-in delay-200">
        <button
          onClick={() => toggleSection('documents')}
          className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground">Required Documents</h3>
          </div>
          {expandedSections.documents ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        {expandedSections.documents && (
          <div className="px-6 pb-6 space-y-6">
            {countryData.documents.map((category, idx) => (
              <div key={idx}>
                <h4 className="font-medium text-foreground mb-3">{category.category}</h4>
                <ul className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="card-elevated-lg overflow-hidden section-fade-in delay-300">
        <button
          onClick={() => toggleSection('timeline')}
          className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Clock className="h-5 w-5 text-secondary" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground">Step-by-Step Timeline</h3>
          </div>
          {expandedSections.timeline ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        {expandedSections.timeline && (
          <div className="px-6 pb-6">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-6">
                {countryData.steps.map((step) => (
                  <div key={step.step} className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {step.step}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium text-foreground">{step.title}</h4>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                          {step.timeframe}
                        </span>
                      </div>
                      <p className="text-foreground/70 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Costs */}
      <div className="card-elevated-lg overflow-hidden section-fade-in delay-400">
        <button
          onClick={() => toggleSection('costs')}
          className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground">Estimated Costs</h3>
          </div>
          {expandedSections.costs ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        {expandedSections.costs && (
          <div className="px-6 pb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">Item</th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 pl-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {countryData.costs.map((cost, idx) => (
                    <tr key={idx} className="border-b border-border/50 last:border-0">
                      <td className="py-3 text-foreground">{cost.item}</td>
                      <td className="py-3 text-right font-medium text-foreground">{cost.amount}</td>
                      <td className="py-3 pl-4 text-sm text-muted-foreground hidden md:table-cell">{cost.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Common Risks */}
      <div className="card-elevated-lg overflow-hidden section-fade-in delay-500">
        <button
          onClick={() => toggleSection('risks')}
          className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground">Common Rejection Risks</h3>
          </div>
          {expandedSections.risks ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        {expandedSections.risks && (
          <div className="px-6 pb-6">
            <ul className="space-y-3">
              {countryData.commonRejectionReasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 shrink-0" />
                  <span className="text-foreground/80">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tips & Next Steps */}
      <div className="card-elevated-lg p-6 md:p-8 bg-primary/5 section-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-display font-semibold text-foreground">Your Next Steps</h3>
        </div>
        <div className="space-y-4 mb-6">
          {countryData.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                {idx + 1}
              </span>
              <span className="text-foreground/80">{tip}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-6">
          <p className="text-sm font-medium text-foreground mb-3">Official Resources:</p>
          <div className="flex flex-wrap gap-3">
            {countryData.officialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
              >
                {link.title}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Disclaimer:</strong> This is an AI-generated guide for informational purposes only. 
          Visa requirements change frequently. Always verify information with official government sources 
          before making any decisions. This tool does not guarantee visa approval.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button 
          variant="default" 
          size="lg" 
          onClick={handleSaveAsPdf}
          disabled={isGeneratingPdf}
        >
          <Download className="h-4 w-4 mr-2" />
          {isGeneratingPdf ? "Generating PDF..." : "Save as PDF"}
        </Button>
        <Button variant="outline" size="lg" onClick={onReset}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Start New Search
        </Button>
      </div>
    </div>
  );
}
