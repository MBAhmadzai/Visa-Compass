import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryOptions, educationLevels, budgetRanges, studyFields } from "@/data/visaRules";
import { Plane, GraduationCap, Wallet, BookOpen, MapPin, ArrowRight, Loader2 } from "lucide-react";

export interface FormData {
  currentCountry: string;
  destinationCountry: string;
  educationLevel: string;
  fieldOfStudy: string;
  budgetRange: string;
}

interface VisaFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const popularSourceCountries = [
  { value: "india", label: "India" },
  { value: "china", label: "China" },
  { value: "nigeria", label: "Nigeria" },
  { value: "pakistan", label: "Pakistan" },
  { value: "brazil", label: "Brazil" },
  { value: "vietnam", label: "Vietnam" },
  { value: "philippines", label: "Philippines" },
  { value: "bangladesh", label: "Bangladesh" },
  { value: "indonesia", label: "Indonesia" },
  { value: "turkey", label: "Turkey" },
  { value: "mexico", label: "Mexico" },
  { value: "south-korea", label: "South Korea" },
  { value: "other", label: "Other" },
];

export function VisaForm({ onSubmit, isLoading }: VisaFormProps) {
  const [formData, setFormData] = useState<FormData>({
    currentCountry: "",
    destinationCountry: "",
    educationLevel: "",
    fieldOfStudy: "",
    budgetRange: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.currentCountry &&
      formData.destinationCountry &&
      formData.educationLevel &&
      formData.fieldOfStudy &&
      formData.budgetRange
    ) {
      onSubmit(formData);
    }
  };

  const isComplete =
    formData.currentCountry &&
    formData.destinationCountry &&
    formData.educationLevel &&
    formData.fieldOfStudy &&
    formData.budgetRange;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Country */}
        <div className="space-y-2">
          <Label htmlFor="currentCountry" className="flex items-center gap-2 text-foreground font-medium">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Where are you from?
          </Label>
          <Select
            value={formData.currentCountry}
            onValueChange={(value) =>
              setFormData({ ...formData, currentCountry: value })
            }
          >
            <SelectTrigger id="currentCountry" className="h-12 bg-card border-border">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {popularSourceCountries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Destination Country */}
        <div className="space-y-2">
          <Label htmlFor="destinationCountry" className="flex items-center gap-2 text-foreground font-medium">
            <Plane className="h-4 w-4 text-muted-foreground" />
            Where do you want to study?
          </Label>
          <Select
            value={formData.destinationCountry}
            onValueChange={(value) =>
              setFormData({ ...formData, destinationCountry: value })
            }
          >
            <SelectTrigger id="destinationCountry" className="h-12 bg-card border-border">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Education Level */}
        <div className="space-y-2">
          <Label htmlFor="educationLevel" className="flex items-center gap-2 text-foreground font-medium">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            Education Level
          </Label>
          <Select
            value={formData.educationLevel}
            onValueChange={(value) =>
              setFormData({ ...formData, educationLevel: value })
            }
          >
            <SelectTrigger id="educationLevel" className="h-12 bg-card border-border">
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              {educationLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Field of Study */}
        <div className="space-y-2">
          <Label htmlFor="fieldOfStudy" className="flex items-center gap-2 text-foreground font-medium">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            Field of Study
          </Label>
          <Select
            value={formData.fieldOfStudy}
            onValueChange={(value) =>
              setFormData({ ...formData, fieldOfStudy: value })
            }
          >
            <SelectTrigger id="fieldOfStudy" className="h-12 bg-card border-border">
              <SelectValue placeholder="Select your field" />
            </SelectTrigger>
            <SelectContent>
              {studyFields.map((field) => (
                <SelectItem key={field.value} value={field.value}>
                  {field.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Budget Range */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="budgetRange" className="flex items-center gap-2 text-foreground font-medium">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            Annual Budget
          </Label>
          <Select
            value={formData.budgetRange}
            onValueChange={(value) =>
              setFormData({ ...formData, budgetRange: value })
            }
          >
            <SelectTrigger id="budgetRange" className="h-12 bg-card border-border">
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((budget) => (
                <SelectItem key={budget.value} value={budget.value}>
                  {budget.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        variant="hero"
        size="xl"
        className="w-full"
        disabled={!isComplete || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating Your Roadmap...
          </>
        ) : (
          <>
            Generate My Visa Roadmap
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        This is an AI-powered prototype. Always verify with official sources.
      </p>
    </form>
  );
}
