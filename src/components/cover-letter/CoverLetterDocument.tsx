import { $generateHtmlFromNodes } from "@lexical/html";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { createEditor } from "lexical";
import { useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import type { CoverLetter } from "@/lib/resume-types";

type CoverLetterDocumentProps = {
  coverLetter: CoverLetter;
};

export function CoverLetterDocument({ coverLetter }: CoverLetterDocumentProps) {
  const bodyHtml = useMemo(
    () => coverLetterBodyToHtml(coverLetter.bodyState),
    [coverLetter.bodyState],
  );

  if (!bodyHtml) {
    return null;
  }

  return (
    <Card className="printable cover-letter-print cover-letter-document mx-auto w-full max-w-3xl overflow-visible">
      <CardContent className="p-5 sm:p-6">
        <div
          className="cover-letter-body grid gap-3 text-sm leading-6 [&_p]:text-sm [&_p]:leading-6"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </CardContent>
    </Card>
  );
}

function coverLetterBodyToHtml(bodyState: string): string {
  if (!bodyState.trim()) {
    return "";
  }

  try {
    const editor = createEditor({
      namespace: "CoverLetterPreview",
      nodes: [HeadingNode, QuoteNode],
      onError(error) {
        throw error;
      },
    });

    const parsedState = editor.parseEditorState(bodyState);
    let html = "";

    editor.setEditorState(parsedState);
    editor.read(() => {
      html = $generateHtmlFromNodes(editor, null);
    });

    return html;
  } catch {
    return "";
  }
}
