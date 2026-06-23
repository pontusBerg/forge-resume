import { useEffect, useState } from "react"

import { ResumeEditor } from "@/components/resume/resume-editor/ResumeEditor"
import { ResumePreview } from "@/components/resume/ResumePreview"
import { ResumeUploadButton } from "@/components/resume/ResumeUploadButton"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader
} from "@/components/ui/card"
import type { AppData } from "@/lib/resume-types"
import { loadStoredAppData, saveAppData } from "@/lib/storage"
import { DownloadIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import "./App.css"

const defaultAppData: AppData = {
  candidate: {
    name: "",
    email: "",
    phone: "",
    headline: "",
    location: "",
    photo: {
      dataUrl: "",
      include: false,
    },
    skillGroups: [],
    summary: "",
    includeSummary: true,
    includeEducation: true,
    links: [],
    experience: [],
    education: [],
  }
}

function App() {

  const [data, setData] = useState<AppData>(() => {
    return loadStoredAppData() ?? defaultAppData
  })

  useEffect(() => {
    saveAppData(data)
  }, [data])


  const printPreview = () => {
    const originalTitle = document.title
    const candidateName = data.candidate.name || "Resume"

    document.title = `${candidateName} Resume`
    window.setTimeout(() => window.print(), 50)
    window.addEventListener(
      "afterprint",
      () => {
        document.title = originalTitle
      },
      { once: true },
    )
  }

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-muted/30 text-foreground">
      <section className="no-print  mx-auto grid w-full shrink-0">
        <Card className="rounded-none py-3 border-b border-border">
          <CardHeader className="flex justify-between items-center">
            <div className="flex items-center gap-2">

              <img src="/logo.svg" alt="Resume Creator" className="size-28 h-auto" />
            </div>
            <div className="flex flex-wrap gap-2">
              <ResumeUploadButton
                onImport={(candidate) =>
                  setData((currentData) => ({
                    ...currentData,
                    candidate: {
                      ...candidate,
                      photo: currentData.candidate.photo,
                    },
                  }))
                }
              />
              <Button type="button" variant="default" onClick={printPreview}>
                Print resume
                <HugeiconsIcon icon={DownloadIcon} />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </section>

      <section className="mx-auto flex min-h-0 w-full flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1">
          <div className="no-print min-h-0 w-full max-w-2xl shrink-0 overflow-y-auto overscroll-contain">
            <ResumeEditor
              candidate={data.candidate}
              onChange={(candidate) =>
                setData((currentData) => ({
                  ...currentData,
                  candidate,
                }))
              }
            />
          </div>
          <aside className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-hidden">
            <div className="min-h-0 flex-1 overflow-hidden">
              <ResumePreview candidate={data.candidate} />
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default App
