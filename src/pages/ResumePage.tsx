import { ResumeEditor } from "@/components/resume/resume-editor/ResumeEditor";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { AppShell } from "@/components/layout/AppShell";
import { useAppData } from "@/context/AppDataContext";

export function ResumePage() {
  const { data, setCandidate } = useAppData();

  const printResume = () => {
    const originalTitle = document.title;
    const candidateName = data.candidate.name || "Resume";

    document.body.dataset.printTarget = "resume";
    document.title = `${candidateName} Resume`;
    window.setTimeout(() => window.print(), 50);
    window.addEventListener(
      "afterprint",
      () => {
        document.title = originalTitle;
        delete document.body.dataset.printTarget;
      },
      { once: true },
    );
  };

  return (
    <AppShell onPrint={printResume}>
      <section className="mx-auto flex min-h-0 w-full flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1">
          <div className="no-print min-h-0 w-full max-w-2xl shrink-0 overflow-y-auto overscroll-contain">
            <ResumeEditor candidate={data.candidate} onChange={setCandidate} />
          </div>
          <aside className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-hidden">
            <div className="min-h-0 flex-1 overflow-hidden">
              <ResumePreview candidate={data.candidate} />
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}
