import type { Education } from "@/lib/resume-types";

import { FormField } from "@/components/resume/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EducationEditorProps = {
  education: Education;
  onChange: (education: Education) => void;
  onRemove: () => void;
};

export function EducationEditor({ education, onChange, onRemove }: EducationEditorProps) {
  const updateField = (
    field: "school" | "degree" | "location" | "startDate" | "endDate" | "details",
    value: string,
  ) => {
    onChange({
      ...education,
      [field]: value,
    });
  };

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading text-base font-medium">
          {education.school || "New education"}
        </h3>
        <Button type="button" variant="secondary" onClick={onRemove}>
          Remove
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id={`${education.id}-school`} label="School">
          <Input
            id={`${education.id}-school`}
            value={education.school}
            onChange={(event) => updateField("school", event.target.value)}
          />
        </FormField>
        <FormField id={`${education.id}-degree`} label="Degree">
          <Input
            id={`${education.id}-degree`}
            value={education.degree}
            onChange={(event) => updateField("degree", event.target.value)}
          />
        </FormField>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <FormField id={`${education.id}-edu-location`} label="Location">
          <Input
            id={`${education.id}-edu-location`}
            value={education.location}
            onChange={(event) => updateField("location", event.target.value)}
          />
        </FormField>
        <FormField id={`${education.id}-edu-start`} label="Start">
          <Input
            id={`${education.id}-edu-start`}
            value={education.startDate}
            onChange={(event) => updateField("startDate", event.target.value)}
          />
        </FormField>
        <FormField id={`${education.id}-edu-end`} label="End">
          <Input
            id={`${education.id}-edu-end`}
            value={education.endDate}
            onChange={(event) => updateField("endDate", event.target.value)}
          />
        </FormField>
      </div>
      <FormField id={`${education.id}-details`} label="Details">
        <Textarea
          id={`${education.id}-details`}
          value={education.details}
          onChange={(event) => updateField("details", event.target.value)}
        />
      </FormField>
    </section>
  );
}
