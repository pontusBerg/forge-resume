import { CoverLetterDocument } from "@/components/cover-letter/CoverLetterDocument";
import { CoverLetterEditor } from "@/components/cover-letter/CoverLetterEditor";
import { useAppData } from "@/context/AppDataContext";

export function CoverLetterPage() {
  const { data, setCoverLetter } = useAppData();

  return (
    <>
      <section className="no-print min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="flex min-h-full items-center justify-center px-6 py-10 sm:px-8 sm:py-14">
          <CoverLetterEditor coverLetter={data.coverLetter} onChange={setCoverLetter} />
        </div>
      </section>

      <section className="hidden print:block">
        <CoverLetterDocument coverLetter={data.coverLetter} />
      </section>
    </>
  );
}
