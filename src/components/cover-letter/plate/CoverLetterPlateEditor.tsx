'use client';

import type { Value } from 'platejs';
import { useState } from 'react';
import { Plate, usePlateEditor } from 'platejs/react';

import { BasicNodesKit } from '@/components/plate-ui/plugins/basic-nodes-kit';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { MarkToolbarButton } from '@/components/plate-ui/mark-toolbar-button';
import { cn } from '@/lib/utils';

type CoverLetterPlateEditorProps = {
  bodyState: string;
  onBodyStateChange: (bodyState: string) => void;
  className?: string;
  placeholder?: string;
  variant?: 'default' | 'document';
};

function parsePlateValue(bodyState: string): Value | undefined {
  if (!bodyState.trim()) {
    return undefined;
  }

  try {
    const parsed: unknown = JSON.parse(bodyState);

    if (Array.isArray(parsed)) {
      return parsed as Value;
    }

    return undefined;
  } catch {
    return undefined;
  }
}

export function CoverLetterPlateEditor({
  bodyState,
  onBodyStateChange,
  className,
  placeholder = 'Start writing your cover letter...',
  variant = 'default',
}: CoverLetterPlateEditorProps) {
  const [initialValue] = useState(() => parsePlateValue(bodyState));
  const isDocument = variant === 'document';

  const editor = usePlateEditor({
    plugins: BasicNodesKit,
    value: initialValue,
  });

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
        onBodyStateChange(JSON.stringify(value));
      }}
    >
      <div
        className={cn(
          isDocument
            ? 'relative w-full min-h-[calc(297mm-1in)]'
            : 'relative min-h-40 w-full rounded-md border border-input bg-transparent px-2.5 py-2 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30',
          className,
        )}
      >
        <FixedToolbar className={isDocument ? 'mb-4 rounded-none border-x-0 border-t-0' : 'mb-2'}>
          <MarkToolbarButton nodeType="bold" tooltip="Bold">
            <span className="text-xs font-bold">B</span>
          </MarkToolbarButton>
          <MarkToolbarButton nodeType="italic" tooltip="Italic">
            <span className="text-xs italic">I</span>
          </MarkToolbarButton>
        </FixedToolbar>
        <EditorContainer
          variant={isDocument ? 'default' : 'default'}
          className={isDocument ? 'min-h-[calc(297mm-1in)]' : undefined}
        >
          <Editor
            variant={isDocument ? 'none' : 'select'}
            placeholder={placeholder}
            aria-label="Cover letter"
            className={cn(
              isDocument
                ? 'min-h-[calc(297mm-1in)] px-0 py-0 text-[17px] leading-[1.7] text-foreground [&_p]:mb-4 [&_p]:text-[17px] [&_p]:leading-[1.7] [&_p:last-child]:mb-0'
                : 'min-h-36 px-0 py-0',
            )}
          />
        </EditorContainer>
      </div>
    </Plate>
  );
}
