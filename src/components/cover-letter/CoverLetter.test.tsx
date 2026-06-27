import type { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CoverLetterDocument } from "@/components/cover-letter/CoverLetterDocument";
import { CoverLetterEditor } from "@/components/cover-letter/CoverLetterEditor";
import { createEmptyCoverLetter } from "@/lib/cover-letter-defaults";

function renderCoverLetterEditor(
  props: Partial<ComponentProps<typeof CoverLetterEditor>> = {},
) {
  return render(
    <CoverLetterEditor
      coverLetter={createEmptyCoverLetter()}
      onChange={vi.fn()}
      {...props}
    />,
  );
}

describe("CoverLetterEditor", () => {
  it("renders only the cover letter text editor", () => {
    renderCoverLetterEditor();

    expect(screen.getByLabelText("Cover letter")).toBeInTheDocument();
    expect(screen.queryByLabelText("Recipient name")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Letter date")).not.toBeInTheDocument();
  });
});

describe("CoverLetterDocument", () => {
  it("renders nothing when the letter body is empty", () => {
    const { container } = render(
      <CoverLetterDocument coverLetter={createEmptyCoverLetter()} />,
    );

    expect(container.querySelector(".cover-letter-document")).toBeNull();
  });
});
