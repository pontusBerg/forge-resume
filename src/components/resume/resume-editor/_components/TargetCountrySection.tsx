import { CountryGuidance } from "./CountryGuidance";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { SupportedResumeCountry } from "@/lib/resume-countries";
import { supportedResumeCountries } from "@/lib/resume-countries";

type TargetCountrySectionProps = {
  selectedCountry: SupportedResumeCountry;
  onCountryChange: (country: SupportedResumeCountry) => void;
};

function formatCountryLabel(country: SupportedResumeCountry) {
  return country.charAt(0).toUpperCase() + country.slice(1);
}

export function TargetCountrySection({ selectedCountry, onCountryChange }: TargetCountrySectionProps) {
  return (
    <section className="grid gap-4">
      <div className="grid gap-2">
        <p className="text-sm font-medium">Target country</p>
        <RadioGroup
          value={selectedCountry}
          onValueChange={(value) => onCountryChange(value as SupportedResumeCountry)}
          className="flex gap-4"
        >
          {supportedResumeCountries.map((country) => (
            <Label key={country} className="flex items-center gap-2 text-sm font-normal">
              <RadioGroupItem value={country} />
              {formatCountryLabel(country)}
            </Label>
          ))}
        </RadioGroup>
      </div>
      <CountryGuidance key={selectedCountry} country={selectedCountry} />
    </section>
  );
}
