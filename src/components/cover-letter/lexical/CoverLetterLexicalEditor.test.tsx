import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CoverLetterLexicalEditor } from "@/components/cover-letter/lexical/CoverLetterLexicalEditor";

describe("CoverLetterLexicalEditor", () => {
  it("renders a rich text surface with placeholder text", () => {
    render(<CoverLetterLexicalEditor bodyState="" onBodyStateChange={vi.fn()} />);

    expect(screen.getByLabelText("Cover letter")).toBeInTheDocument();
    expect(screen.getByText("Start writing your cover letter...")).toBeInTheDocument();
  });
});
