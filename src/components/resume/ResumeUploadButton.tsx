import { useRef, useState, type ChangeEvent } from "react"

import { Button } from "@/components/ui/button"
import { importResumeFile } from "@/lib/resume-import"
import type { CandidateProfile } from "@/lib/resume-types"
import { UploadIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { toast } from "sonner"

type ResumeUploadButtonProps = {
  onImport: (candidate: CandidateProfile) => void
}

export function ResumeUploadButton({ onImport }: ResumeUploadButtonProps) {
  const resumeUploadInputRef = useRef<HTMLInputElement>(null)
  const [isImportingResume, setIsImportingResume] = useState(false)

  const applyResumeUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {

      toast.error("No file selected.")
      return
    }

    setIsImportingResume(true)

    try {
      const candidate = await importResumeFile(file)
      onImport(candidate)
    } catch {
      toast.error("Failed to import resume")
    } finally {
      setIsImportingResume(false)
      event.target.value = ""
    }
  }

  return (
    <>
      <input
        ref={resumeUploadInputRef}
        className="sr-only"
        type="file"
        accept="application/pdf,text/plain,text/markdown,.pdf,.txt,.md"
        onChange={applyResumeUpload}
      />
      <Button
        type="button"
        variant="secondary"
        disabled={isImportingResume}
        onClick={() => resumeUploadInputRef.current?.click()}
      >
        {isImportingResume ? "Importing..." : "Upload resume"}
        <HugeiconsIcon icon={UploadIcon} />
      </Button>
    </>
  )
}
