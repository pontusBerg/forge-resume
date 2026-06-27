import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import type { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import type { EditorThemeClasses } from "lexical";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const defaultEditorTheme: EditorThemeClasses = {
  paragraph: "mb-3 text-sm leading-6 last:mb-0",
  text: {
    bold: "font-semibold",
    italic: "italic",
    underline: "underline",
  },
};

const documentEditorTheme: EditorThemeClasses = {
  paragraph: "mb-4 text-[17px] leading-[1.7] last:mb-0",
  text: {
    bold: "font-semibold",
    italic: "italic",
    underline: "underline",
  },
};

type CoverLetterLexicalEditorProps = {
  bodyState: string;
  onBodyStateChange: (bodyState: string) => void;
  className?: string;
  placeholder?: string;
  variant?: "default" | "document";
};

function getInitialEditorState(bodyState: string): InitialEditorStateType | undefined {
  if (!bodyState.trim()) {
    return undefined;
  }

  try {
    JSON.parse(bodyState);
    return bodyState;
  } catch {
    return undefined;
  }
}

export function CoverLetterLexicalEditor({
  bodyState,
  onBodyStateChange,
  className,
  placeholder = "Start writing your cover letter...",
  variant = "default",
}: CoverLetterLexicalEditorProps) {
  const initialBodyState = useRef(bodyState);
  const isDocument = variant === "document";

  return (
    <LexicalComposer
      initialConfig={{
        namespace: "CoverLetterEditor",
        theme: isDocument ? documentEditorTheme : defaultEditorTheme,
        nodes: [HeadingNode, QuoteNode],
        onError(error: Error) {
          throw error;
        },
        editorState: getInitialEditorState(initialBodyState.current),
      }}
    >
      <div
        className={cn(
          isDocument
            ? "relative min-h-[calc(100vh-10rem)] w-full"
            : "relative min-h-40 w-full rounded-md border border-input bg-transparent px-2.5 py-2 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30",
          className,
        )}
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              aria-label="Cover letter"
              className={cn(
                "outline-none",
                isDocument
                  ? "min-h-[calc(100vh-10rem)] text-[17px] leading-[1.7] text-foreground"
                  : "min-h-36",
              )}
            />
          }
          placeholder={
            <div
              className={cn(
                "pointer-events-none absolute text-muted-foreground/40",
                isDocument ? "text-[17px] leading-[1.7]" : "top-2.5 left-2.5 text-sm",
              )}
            >
              {placeholder}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            onBodyStateChange(JSON.stringify(editorState.toJSON()));
          }}
        />
      </div>
    </LexicalComposer>
  );
}
