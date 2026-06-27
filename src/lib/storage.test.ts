import { beforeEach, describe, expect, it } from "vitest";

import { sampleCandidate } from "@/lib/sample-data";
import { clearAppData, loadStoredAppData, saveAppData } from "@/lib/storage";

describe("storage", () => {
  beforeEach(() => {
    clearAppData();
  });

  it("loads stored data that only has candidate and fills in cover letter defaults", () => {
    window.localStorage.setItem(
      "resume-creator-v2:app-data",
      JSON.stringify({ candidate: sampleCandidate }),
    );

    const loaded = loadStoredAppData();

    expect(loaded).not.toBeNull();
    expect(loaded?.candidate.name).toBe(sampleCandidate.name);
    expect(loaded?.coverLetter.salutation).toBe("Dear Hiring Manager,");
    expect(loaded?.coverLetter.signOff).toBe("Sincerely,");
    expect(loaded?.coverLetter.bodyState).toBe("");
  });

  it("round-trips cover letter data through localStorage", () => {
    const appData = {
      candidate: sampleCandidate,
      coverLetter: {
        recipientName: "Alex Morgan",
        recipientCompany: "Acme Corp",
        recipientLocation: "New York, NY",
        date: "June 26, 2026",
        salutation: "Dear Alex Morgan,",
        signOff: "Best regards,",
        bodyState: '{"root":{"children":[]}}',
      },
    };

    saveAppData(appData);
    const loaded = loadStoredAppData();

    expect(loaded).toEqual(appData);
  });
});
