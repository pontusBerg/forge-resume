import type { Education } from "@/lib/resume-types";

import { SectionTitle } from "@/components/resume/SectionTitle";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { EducationEditor } from "./EducationEditor";

type EducationSectionProps = {
  education: Education[];
  includeEducation: boolean;
  onEducationChange: (educationId: string, nextEducation: Education) => void;
  onIncludeEducationChange: (includeEducation: boolean) => void;
  onAddEducation: () => void;
  onRemoveEducation: (educationId: string) => void;
};

export function EducationSection({
  education,
  includeEducation,
  onEducationChange,
  onIncludeEducationChange,
  onAddEducation,
  onRemoveEducation,
}: EducationSectionProps) {
  return (
    <section className="grid gap-5">
      <SectionTitle title="Education" />
      <div className="grid gap-4">
        <Label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={includeEducation}
            onCheckedChange={(checked) => onIncludeEducationChange(checked)}
          />
          Show education on resume
        </Label>
        {education.map((item) => (
          <EducationEditor
            education={item}
            key={item.id}
            onChange={(nextEducation) => onEducationChange(item.id, nextEducation)}
            onRemove={() => onRemoveEducation(item.id)}
          />
        ))}
        <Button type="button" variant="outline" onClick={onAddEducation}>
          Add education
        </Button>
      </div>
    </section>
  );
}
