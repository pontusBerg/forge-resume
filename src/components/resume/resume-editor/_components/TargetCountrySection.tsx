import { CountryGuidance } from "./CountryGuidance";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { SupportedResumeCountry } from "@/lib/resume-countries";
import { countryDisplay, supportedResumeCountries } from "@/lib/resume-countries";
import { cn } from "@/lib/utils";

type TargetCountrySectionProps = {
  selectedCountry: SupportedResumeCountry;
  onCountryChange: (country: SupportedResumeCountry) => void;
};

function formatCountryLabel(country: SupportedResumeCountry) {
  if (country === "none") {
    return "General";
  }

  return country.charAt(0).toUpperCase() + country.slice(1);
}

function CountryFlag({ country }: { country: SupportedResumeCountry }) {
  const { flag } = countryDisplay[country];

  if (flag) {
    return flag;
  }

  return (
    <svg
      aria-hidden
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      className="text-muted-foreground"
    >
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="10" cy="10" rx="3" ry="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.75 10h14.5M4 6.25h12M4 13.75h12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function TargetCountrySection({ selectedCountry, onCountryChange }: TargetCountrySectionProps) {
  return (
    <section className="grid gap-4">
      <div className="grid gap-2.5">
        <p className="text-sm font-medium">Target country</p>
        <RadioGroup
          value={selectedCountry}
          onValueChange={(value) => onCountryChange(value as SupportedResumeCountry)}
          className="flex flex-wrap gap-2"
        >
          {supportedResumeCountries.map((country) => {

            return (
              <Label
                key={country}
                className={cn(
                  "relative cursor-pointer rounded-xl border border-border/80 flex items-center font-normal transition-colors",
                  "py-1 px-2",
                  "has-data-checked:border-primary/40 has-data-checked:bg-primary/5 has-data-checked:shadow-xs",
                  "dark:has-data-checked:border-primary/30 dark:has-data-checked:bg-primary/10",
                )}
              >

                <RadioGroupItem value={country} className="sr-only hidden" />
                <div
                  aria-hidden
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-md  text-xl leading-none",
                  )}
                >
                  <CountryFlag country={country} />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="font-heading text-sm  text-accent font-semibold leading-none">{formatCountryLabel(country)}</p>
                </div>
              </Label>
            );
          })}
        </RadioGroup>
      </div>
      {
        selectedCountry !== "none" && (
          <CountryGuidance key={selectedCountry} country={selectedCountry} />
        )
      }
    </section>
  );
}
