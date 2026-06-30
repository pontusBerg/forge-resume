import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";
import { sampleAppData } from "@/lib/sample-data";
import { loadStoredAppData } from "@/lib/storage";

vi.mock("@/lib/storage", () => ({
  loadStoredAppData: vi.fn(),
  saveAppData: vi.fn(),
}));

function getResumePreview() {
  const resumeDocument = document.querySelector(".resume-document");

  if (!resumeDocument) {
    throw new Error("Expected resume preview document to be rendered");
  }

  return resumeDocument as HTMLElement;
}

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(loadStoredAppData).mockReturnValue(sampleAppData);
  });

  it('hides the summary section on the resume when "Show summary on resume" is unchecked', async () => {
    const user = userEvent.setup();

    render(<App />);

    const resumePreview = getResumePreview();

    expect(within(resumePreview).getByRole("heading", { name: "Summary" })).toBeInTheDocument();
    expect(within(resumePreview).getByText(sampleAppData.candidate.summary)).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: /show summary on resume/i }));

    expect(
      within(resumePreview).queryByRole("heading", { name: "Summary" }),
    ).not.toBeInTheDocument();
    expect(
      within(resumePreview).queryByText(sampleAppData.candidate.summary),
    ).not.toBeInTheDocument();
  });
});
