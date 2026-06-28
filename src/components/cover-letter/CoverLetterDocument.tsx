import { useMemo } from 'react';
import { createStaticEditor } from 'platejs/static';

import { parseCoverLetterBodyState } from '@/components/cover-letter/plate/cover-letter-body';
import { BaseBasicBlocksKit } from '@/components/plate-ui/plugins/basic-blocks-base-kit';
import { BaseBasicMarksKit } from '@/components/plate-ui/plugins/basic-marks-base-kit';
import { Card, CardContent } from '@/components/ui/card';
import { EditorStatic } from '@/components/plate-ui/editor-static';
import type { CoverLetter } from '@/lib/resume-types';

const coverLetterStaticPlugins = [...BaseBasicBlocksKit, ...BaseBasicMarksKit];

type CoverLetterDocumentProps = {
  coverLetter: CoverLetter;
};

export function CoverLetterDocument({ coverLetter }: CoverLetterDocumentProps) {
  const value = useMemo(
    () => parseCoverLetterBodyState(coverLetter.bodyState),
    [coverLetter.bodyState],
  );

  const editor = useMemo(() => {
    if (!value) {
      return null;
    }

    return createStaticEditor({
      plugins: coverLetterStaticPlugins,
      value,
    });
  }, [value]);

  if (!value || !editor) {
    return null;
  }

  return (
    <Card className="printable cover-letter-print cover-letter-document mx-auto w-full max-w-3xl overflow-visible">
      <CardContent className="p-5 sm:p-6">
        <EditorStatic
          editor={editor}
          value={value}
          variant="none"
          className="cover-letter-body grid gap-3 px-0 py-0 text-sm leading-6 [&_em]:italic [&_p]:text-sm [&_p]:leading-6 [&_strong]:font-semibold"
        />
      </CardContent>
    </Card>
  );
}
