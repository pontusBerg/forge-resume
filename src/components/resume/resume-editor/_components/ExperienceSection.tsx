import type { Experience } from "@/lib/resume-types"

import { SectionTitle } from "@/components/resume/SectionTitle"
import { Button } from "@/components/ui/button"

import { ExperienceEditor } from "./ExperienceEditor"

type ExperienceSectionProps = {
  experience: Experience[]
  onExperienceChange: (experienceId: string, nextExperience: Experience) => void
  onAddExperience: () => void
  onRemoveExperience: (experienceId: string) => void
}

export function ExperienceSection({
  experience,
  onExperienceChange,
  onAddExperience,
  onRemoveExperience,
}: ExperienceSectionProps) {
  return (
    <section className="grid gap-5">
      <SectionTitle title="Experience" />
      <div className="grid gap-6">
        {experience.map((item) => (
          <ExperienceEditor
            experience={item}
            key={item.id}
            onChange={(nextExperience) => onExperienceChange(item.id, nextExperience)}
            onRemove={() => onRemoveExperience(item.id)}
          />
        ))}
        <Button type="button" variant="outline" onClick={onAddExperience}>
          Add experience
        </Button>
      </div>
    </section>
  )
}
