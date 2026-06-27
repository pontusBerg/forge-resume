import { CoverLetterLexicalEditor } from "@/components/cover-letter/lexical/CoverLetterLexicalEditor";
import type { CoverLetter } from "@/lib/resume-types";

type CoverLetterEditorProps = {
  coverLetter: CoverLetter;
  onChange: (coverLetter: CoverLetter) => void;
};

export function CoverLetterEditor({ coverLetter, onChange }: CoverLetterEditorProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 px-6 py-10 sm:px-8 sm:py-14">
      <CoverLetterLexicalEditor
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
  );
}
