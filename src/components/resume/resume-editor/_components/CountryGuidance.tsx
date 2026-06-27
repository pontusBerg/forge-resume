import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { SupportedResumeCountry } from "@/lib/resume-countries";
import { countryDisplay, resumeCountryGuidance } from "@/lib/resume-countries";

type CountryGuidanceProps = {
  country: SupportedResumeCountry;
};

export function CountryGuidance({ country }: CountryGuidanceProps) {
  const guidance = resumeCountryGuidance[country];
  const meta = countryDisplay[country];

  return (
    <Accordion
      defaultValue={["tips"]}
      className="overflow-hidden rounded-xl border border-border/80  "
    >
      <AccordionItem value="tips" className="border-0">
        <AccordionTrigger className="gap-3.5 border border-transparent px-4 py-3.5 font-normal hover:bg-muted/50 hover:no-underline group-aria-expanded/accordion-trigger:border-border/60 group-aria-expanded/accordion-trigger:bg-muted/40">
          <div className="flex min-w-0 flex-1 items-start gap-3.5">
            <div
              aria-hidden
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/70 text-xl leading-none"
            >
              {meta.flag}
            </div>
            <div className="min-w-0 flex-1 pt-0.5 text-left">
              <p className="font-heading text-sm font-semibold">{guidance.title}</p>
              <p className="mt-0.5 text-xs font-normal leading-relaxed text-muted-foreground">
                {meta.subtitle}
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="rounded-lg">
            <ol className="grid gap-3">
              {guidance.tips.map((tip, index) => (
                <li key={tip} className="flex gap-3 text-[13px] leading-relaxed">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/60 text-[11px] font-medium tabular-nums text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="text-foreground/90">{tip}</span>
                </li>
              ))}
            </ol>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
