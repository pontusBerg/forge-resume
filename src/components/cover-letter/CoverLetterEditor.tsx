import { CoverLetterPlateEditor } from "@/components/cover-letter/plate/CoverLetterPlateEditor";
import type { CoverLetter } from "@/lib/resume-types";

type CoverLetterEditorProps = {
  coverLetter: CoverLetter;
  onChange: (coverLetter: CoverLetter) => void;
};

export function CoverLetterEditor({ coverLetter, onChange }: CoverLetterEditorProps) {
  return (
    <div className="w-full max-w-[210mm] min-h-[297mm] shrink-0 bg-white ring-1 ring-border/60">
      <div className="p-[0.5in]">
        <CoverLetterPlateEditor
          bodyState={coverLetter.bodyState}
          onBodyStateChange={(bodyState) =>
            onChange({
              ...coverLetter,
              bodyState,
            })
          }
          variant="document"
        />
      </div>
    </div>
  );
}
