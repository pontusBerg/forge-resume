import type { Experience } from "@/lib/resume-types";

import { FormField } from "@/components/resume/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusSignIcon, Trash } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type ExperienceEditorProps = {
  experience: Experience;
  onChange: (experience: Experience) => void;
  onRemove: () => void;
};

export function ExperienceEditor({ experience, onChange, onRemove }: ExperienceEditorProps) {
  const updateField = (
    field: "role" | "company" | "location" | "startDate" | "endDate",
    value: string,
  ) => {
    onChange({
      ...experience,
      [field]: value,
    });
  };

  const updateBullet = (index: number, value: string) => {
    onChange({
      ...experience,
      bullets: experience.bullets.map((bullet, bulletIndex) =>
        bulletIndex === index ? value : bullet,
      ),
    });
  };

  return (
    <section className="grid gap-5 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-heading text-base font-medium">
            {experience.role || "New experience"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {experience.company || "Company"}
            {experience.location ? ` · ${experience.location}` : ""}
          </p>
        </div>
        <Button type="button" variant="secondary" onClick={onRemove}>
          Remove
          <HugeiconsIcon className="size-3" icon={Trash} />
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id={`${experience.id}-role`} label="Role">
          <Input
            id={`${experience.id}-role`}
            value={experience.role}
            onChange={(event) => updateField("role", event.target.value)}
          />
        </FormField>
        <FormField id={`${experience.id}-company`} label="Company">
          <Input
            id={`${experience.id}-company`}
            value={experience.company}
            onChange={(event) => updateField("company", event.target.value)}
          />
        </FormField>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <FormField id={`${experience.id}-location`} label="Location">
          <Input
            id={`${experience.id}-location`}
            value={experience.location}
            onChange={(event) => updateField("location", event.target.value)}
          />
        </FormField>
        <FormField id={`${experience.id}-start`} label="Start">
          <Input
            id={`${experience.id}-start`}
            value={experience.startDate}
            onChange={(event) => updateField("startDate", event.target.value)}
          />
        </FormField>
        <FormField id={`${experience.id}-end`} label="End">
          <Input
            id={`${experience.id}-end`}
            value={experience.current ? "Present" : experience.endDate}
            onChange={(event) =>
              onChange({
                ...experience,
                endDate: event.target.value,
                current: event.target.value.toLowerCase() === "present",
              })
            }
          />
        </FormField>
      </div>
      <div className="grid gap-3">
        <div className="mb-2 mt-2 flex items-center justify-between gap-3">
          <h4 className="text-sm font-medium">Impact bullets</h4>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() =>
              onChange({
                ...experience,
                bullets: [...experience.bullets, ""],
              })
            }
          >
            Add bullet <HugeiconsIcon className="size-3" icon={PlusSignIcon} />
          </Button>
        </div>
        {experience.bullets.map((bullet, index) => (
          <div
            className="grid gap-2 sm:grid-cols-[1fr_auto]"
            key={`${experience.id}-bullet-${index}`}
          >
            <Textarea
              aria-label={`Bullet ${index + 1}`}
              value={bullet}
              onChange={(event) => updateBullet(index, event.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                onChange({
                  ...experience,
                  bullets: experience.bullets.filter((_, bulletIndex) => bulletIndex !== index),
                })
              }
            >
              Remove
              <HugeiconsIcon className="size-3" icon={Trash} />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
