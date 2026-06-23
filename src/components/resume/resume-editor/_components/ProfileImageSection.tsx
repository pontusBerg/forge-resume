import { useRef, type ChangeEvent } from "react"

import type { CandidateProfile } from "@/lib/resume-types"

import { FormField } from "@/components/resume/FormField"
import { SectionTitle } from "@/components/resume/SectionTitle"
import { Button } from "@/components/ui/button"
import { Trash, UploadIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

type ProfileImageSectionProps = {
  name: string
  photo: CandidateProfile["photo"]
  onPhotoChange: (photo: CandidateProfile["photo"]) => void
}

export function ProfileImageSection({ name, photo, onPhotoChange }: ProfileImageSectionProps) {
  const photoUploadInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return
      }

      onPhotoChange({
        dataUrl: reader.result,
        include: true,
      })
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    onPhotoChange({
      dataUrl: "",
      include: false,
    })
  }

  return (
    <section className="grid gap-5">
      <SectionTitle title="Profile Image" />
      <FormField
        id="candidate-photo"
        label=""
        hint="Optional. Upload stays in this browser and only appears when enabled."
      >
        <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
          {photo.dataUrl ? (
            <img
              alt={name ? `${name} profile` : "Uploaded profile"}
              className="size-20 rounded-xl object-cover ring-1 ring-border"
              src={photo.dataUrl}
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-xl bg-muted text-xs text-muted-foreground ring-1 ring-border">
              No photo
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={photoUploadInputRef}
              id="candidate-photo-upload"
              className="sr-only"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            <Button
              variant="secondary"
              type="button"
              onClick={() => photoUploadInputRef.current?.click()}
            >
              Upload photo
              <HugeiconsIcon icon={UploadIcon} />
            </Button>
            {photo.dataUrl ? (
              <Button type="button" variant="ghost" onClick={removePhoto}>
                Remove photo
                <HugeiconsIcon icon={Trash} />
              </Button>
            ) : null}
          </div>
        </div>
      </FormField>
    </section>
  )
}
