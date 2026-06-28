import { CoverLetterDocument } from "@/components/cover-letter/CoverLetterDocument";
import { CoverLetterEditor } from "@/components/cover-letter/CoverLetterEditor";
import { AppShell } from "@/components/layout/AppShell";
import { useAppData } from "@/context/AppDataContext";

export function CoverLetterPage() {
  const { data, setCoverLetter } = useAppData();

  const printCoverLetter = () => {
    const originalTitle = document.title;
    const candidateName = data.candidate.name || "Candidate";

    document.body.dataset.printTarget = "cover-letter";
    document.title = `${candidateName} Cover Letter`;
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
    <AppShell onPrint={printCoverLetter}>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <section className="no-print min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="flex min-h-full items-center justify-center px-6 py-10 sm:px-8 sm:py-14">
            <CoverLetterEditor coverLetter={data.coverLetter} onChange={setCoverLetter} />
          </div>
        </section>

        <section className="hidden print:block">
          <CoverLetterDocument coverLetter={data.coverLetter} />
        </section>
      </div>
    </AppShell>
  );
}
