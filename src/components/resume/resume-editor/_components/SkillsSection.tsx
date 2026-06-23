import type { SkillGroup } from "@/lib/resume-types";

import { SectionTitle } from "@/components/resume/SectionTitle";
import { Button } from "@/components/ui/button";

import { SkillsEditor } from "./SkillsEditor";

type SkillsSectionProps = {
  skillGroups: SkillGroup[];
  onSkillGroupChange: (groupId: string, nextGroup: SkillGroup) => void;
  onAddSkillGroup: () => void;
  onRemoveSkillGroup: (groupId: string) => void;
};

export function SkillsSection({
  skillGroups,
  onSkillGroupChange,
  onAddSkillGroup,
  onRemoveSkillGroup,
}: SkillsSectionProps) {
  return (
    <section className="grid gap-5">
      <SectionTitle title="Skills" />
      <div className="grid gap-4">
        {skillGroups.map((group) => (
          <SkillsEditor
            group={group}
            key={group.id}
            onChange={(nextGroup) => onSkillGroupChange(group.id, nextGroup)}
            onRemove={() => onRemoveSkillGroup(group.id)}
          />
        ))}
        <Button type="button" variant="outline" onClick={onAddSkillGroup}>
          Add skill group
        </Button>
      </div>
    </section>
  );
}
