import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { SupportedResumeCountry } from "@/lib/resume-countries";
import { resumeCountryGuidance } from "@/lib/resume-country-guidance";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type CountryGuidanceProps = {
  country: SupportedResumeCountry;
};

export function CountryGuidance({ country }: CountryGuidanceProps) {
  const guidance = resumeCountryGuidance[country];

  if (!guidance) {
    return null;
  }

  return (
    <Alert className="border-primary/15 bg-primary/5">
      <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} />
      <AlertTitle>{guidance.title}</AlertTitle>
      <AlertDescription>
        <ul className="mt-2 list-disc space-y-1.5 pl-4 marker:text-primary/60">
          {guidance.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
