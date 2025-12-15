import { Loader2, FileSearch, Brain, Sparkles } from "lucide-react";

export function LoadingState() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Brain className="h-10 w-10 text-primary animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-8 animate-bounce delay-100">
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-display font-semibold text-foreground">
            Analyzing your profile...
          </h3>
          <p className="text-muted-foreground">
            Our AI is reviewing visa requirements and creating your personalized roadmap.
          </p>
        </div>

        <div className="space-y-4">
          <LoadingStep icon={FileSearch} text="Retrieving country-specific rules" delay={0} />
          <LoadingStep icon={Brain} text="Generating personalized guidance" delay={300} />
          <LoadingStep icon={Sparkles} text="Preparing your roadmap" delay={600} />
        </div>

        <div className="pt-4">
          <Loader2 className="h-6 w-6 text-primary animate-spin mx-auto" />
        </div>
      </div>
    </div>
  );
}

function LoadingStep({ 
  icon: Icon, 
  text, 
  delay 
}: { 
  icon: typeof FileSearch; 
  text: string; 
  delay: number;
}) {
  return (
    <div 
      className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-lg section-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon className="h-5 w-5 text-secondary" />
      <span className="text-sm text-foreground">{text}</span>
    </div>
  );
}
