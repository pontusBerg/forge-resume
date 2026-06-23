import { useState } from "react"

import type { SkillGroup } from "@/lib/resume-types"

import { FormField } from "@/components/resume/FormField"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { splitCommaList } from "./utils"

type SkillsEditorProps = {
  group: SkillGroup
  onChange: (group: SkillGroup) => void
  onRemove: () => void
}

export function SkillsEditor({ group, onChange, onRemove }: SkillsEditorProps) {
  const [skillsDraft, setSkillsDraft] = useState(() => group.skills.join(", "))

  const updateSkills = (value: string) => {
    setSkillsDraft(value)
    onChange({
      ...group,
      skills: splitCommaList(value),
    })
  }

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading text-base font-medium">{group.name}</h3>
        <Button type="button" variant="secondary" onClick={onRemove}>
          Remove
        </Button>
      </div>
      <FormField id={`${group.id}-name`} label="Group name">
        <Input
          id={`${group.id}-name`}
          value={group.name}
          onChange={(event) =>
            onChange({
              ...group,
              name: event.target.value,
            })
          }
        />
      </FormField>
      <FormField id={`${group.id}-skills`} label="Skills" hint="Comma-separated list.">
        <Textarea
          id={`${group.id}-skills`}
          value={skillsDraft}
          onChange={(event) => updateSkills(event.target.value)}
        />
      </FormField>
    </section>
  )
}
