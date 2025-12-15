import { Globe } from "lucide-react";

export function Header() {
  return (
    <header className="py-6 px-4 md:px-6 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-xl">
            <Globe className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold text-foreground">VisaVerse Copilot</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Student Visa Guide</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <span className="px-2 py-1 bg-muted rounded-full text-xs">Prototype v1.0</span>
        </div>
      </div>
    </header>
  );
}
