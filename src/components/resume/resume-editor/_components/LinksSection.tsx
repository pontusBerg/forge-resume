import type { ResumeLink } from "@/lib/resume-types";

import { FormField } from "@/components/resume/FormField";
import { SectionTitle } from "@/components/resume/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LinksSectionProps = {
  links: ResumeLink[];
  onLinkChange: (linkId: string, nextLink: ResumeLink) => void;
  onAddLink: () => void;
  onRemoveLink: (linkId: string) => void;
};

export function LinksSection({ links, onLinkChange, onAddLink, onRemoveLink }: LinksSectionProps) {
  return (
    <section className="grid gap-5">
      <SectionTitle title="Links" />
      <div className="grid gap-4">
        {links.map((link) => (
          <div className="grid gap-3 sm:grid-cols-[1fr_1.5fr_auto]" key={link.id}>
            <FormField id={`${link.id}-label`} label="Label">
              <Input
                id={`${link.id}-label`}
                value={link.label}
                onChange={(event) =>
                  onLinkChange(link.id, {
                    ...link,
                    label: event.target.value,
                  })
                }
              />
            </FormField>
            <FormField id={`${link.id}-url`} label="URL">
              <Input
                id={`${link.id}-url`}
                value={link.url}
                onChange={(event) =>
                  onLinkChange(link.id, {
                    ...link,
                    url: event.target.value,
                  })
                }
              />
            </FormField>
            <Button
              className="self-end"
              type="button"
              variant="secondary"
              onClick={() => onRemoveLink(link.id)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={onAddLink}>
          Add link
        </Button>
      </div>
    </section>
  );
}
