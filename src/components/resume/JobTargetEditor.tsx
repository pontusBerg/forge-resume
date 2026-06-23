import type { JobTarget } from "@/lib/resume-types";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/resume/FormField";

type JobTargetEditorProps = {
  jobTarget: JobTarget;
  onChange: (jobTarget: JobTarget) => void;
};

export function JobTargetEditor({ jobTarget, onChange }: JobTargetEditorProps) {
  const updateField = (field: keyof JobTarget, value: string) => {
    onChange({
      ...jobTarget,
      [field]: value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Target Job</CardTitle>
        <CardDescription>
          Paste the job details here so the resume can be tailored locally.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="target-role" label="Role">
            <Input
              id="target-role"
              value={jobTarget.role}
              onChange={(event) => updateField("role", event.target.value)}
              placeholder="Senior Frontend Engineer"
            />
          </FormField>
          <FormField id="target-company" label="Company">
            <Input
              id="target-company"
              value={jobTarget.company}
              onChange={(event) => updateField("company", event.target.value)}
              placeholder="SignalForge"
            />
          </FormField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="target-location" label="Location">
            <Input
              id="target-location"
              value={jobTarget.location}
              onChange={(event) => updateField("location", event.target.value)}
              placeholder="Remote US"
            />
          </FormField>
          <FormField id="target-manager" label="Hiring manager">
            <Input
              id="target-manager"
              value={jobTarget.hiringManager}
              onChange={(event) => updateField("hiringManager", event.target.value)}
              placeholder="Hiring Team"
            />
          </FormField>
        </div>
        <FormField
          id="target-description"
          label="Job description"
          hint="This MVP uses local keyword matching only. No job data is sent to an external AI service."
        >
          <Textarea
            id="target-description"
            className="min-h-40"
            value={jobTarget.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Paste the role responsibilities, qualifications, and company notes."
          />
        </FormField>
      </CardContent>
    </Card>
  );
}
