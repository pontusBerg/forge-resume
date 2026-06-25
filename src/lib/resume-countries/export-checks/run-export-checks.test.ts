import { describe, expect, it } from "vitest";

import { getFailedExportChecks, runExportChecks } from "@/lib/resume-countries/export-checks/run-export-checks";
import { sampleCandidate } from "@/lib/sample-data";
import type { CandidateProfile } from "@/lib/resume-types";

const emptyCandidate: CandidateProfile = {
  name: "",
  email: "",
  phone: "",
  headline: "",
  location: "",
  photo: {
    dataUrl: "",
    include: false,
  },
  skillGroups: [],
  summary: "",
  includeSummary: true,
  includeEducation: true,
  links: [],
  experience: [],
  education: [],
};

describe("runExportChecks", () => {
  it("runs only the rules for the selected country", () => {
    const austriaResults = runExportChecks({ candidate: emptyCandidate, country: "austria" });
    const swedenResults = runExportChecks({ candidate: emptyCandidate, country: "sweden" });

    expect(austriaResults.map((result) => result.id)).toEqual([
      "austria.photo.included",
      "austria.contact.complete",
      "austria.experience.present",
    ]);
    expect(swedenResults.map((result) => result.id)).toEqual([
      "sweden.photo.omitted",
      "sweden.summary.present",
      "sweden.experience.present",
    ]);
  });

  it("returns pass/fail for each rule", () => {
    const results = runExportChecks({ candidate: emptyCandidate, country: "austria" });

    expect(results).toEqual([
      expect.objectContaining({ id: "austria.photo.included", passed: false }),
      expect.objectContaining({ id: "austria.contact.complete", passed: false }),
      expect.objectContaining({ id: "austria.experience.present", passed: false }),
    ]);
  });
});

describe("getFailedExportChecks", () => {
  it("returns only failed checks", () => {
    const failures = getFailedExportChecks({
      candidate: {
        ...sampleCandidate,
        photo: { dataUrl: "data:image/png;base64,abc", include: true },
      },
      country: "austria",
    });

    expect(failures).toEqual([]);
  });

  it("returns failed austria checks for an empty profile", () => {
    const failures = getFailedExportChecks({ candidate: emptyCandidate, country: "austria" });

    expect(failures).toHaveLength(3);
    expect(failures.every((failure) => failure.passed === false)).toBe(true);
  });

  it("returns sweden summary failure when summary is enabled but empty", () => {
    const failures = getFailedExportChecks({
      candidate: {
        ...sampleCandidate,
        summary: "",
        includeSummary: true,
        experience: sampleCandidate.experience,
      },
      country: "sweden",
    });

    expect(failures.map((failure) => failure.id)).toEqual(["sweden.summary.present"]);
  });
});
