import { describe, expect, it } from "vitest";

import type {
  ExportCheckContext,
  ExportCheckSection,
} from "@/lib/resume-countries/export-checks/types";
import type { CandidateProfile } from "@/lib/resume-types";

import { swedenExportCheckRules } from "./index";

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

function runCheck(section: ExportCheckSection, candidate: CandidateProfile): boolean {
  const rule = swedenExportCheckRules.find((entry) => entry.section === section);
  if (!rule) {
    throw new Error(`Missing rule for section: ${section}`);
  }

  const context: ExportCheckContext = { candidate, country: "sweden" };
  return rule.check(context);
}

describe("Sweden export checks", () => {
  it("accepts a resume with no photo included", () => {
    expect(runCheck("photo", emptyCandidate)).toBe(true);
  });

  it("discourages including a photo on the resume", () => {
    expect(
      runCheck("photo", {
        ...emptyCandidate,
        photo: { dataUrl: "data:image/png;base64,abc", include: true },
      }),
    ).toBe(false);
  });

  it("accepts a resume when the summary section is disabled", () => {
    expect(
      runCheck("summary", {
        ...emptyCandidate,
        summary: "",
        includeSummary: false,
      }),
    ).toBe(true);
  });

  it("accepts a resume with a written professional summary", () => {
    expect(
      runCheck("summary", {
        ...emptyCandidate,
        summary: "Experienced product manager with a focus on B2B SaaS.",
        includeSummary: true,
      }),
    ).toBe(true);
  });

  it("requires a professional summary when the summary section is enabled", () => {
    expect(runCheck("summary", emptyCandidate)).toBe(false);
  });

  it("requires a professional summary when the summary is only whitespace", () => {
    expect(
      runCheck("summary", {
        ...emptyCandidate,
        summary: "   ",
        includeSummary: true,
      }),
    ).toBe(false);
  });

  it("requires at least one work experience entry", () => {
    expect(runCheck("experience", emptyCandidate)).toBe(false);
  });

  it("requires work experience entries to include both role and company", () => {
    expect(
      runCheck("experience", {
        ...emptyCandidate,
        experience: [
          {
            id: "1",
            role: "",
            company: "Acme AB",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            bullets: [],
          },
          {
            id: "2",
            role: "Engineer",
            company: "  ",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            bullets: [],
          },
        ],
      }),
    ).toBe(false);
  });

  it("accepts a resume with at least one complete work experience entry", () => {
    expect(
      runCheck("experience", {
        ...emptyCandidate,
        experience: [
          {
            id: "1",
            role: "Software Engineer",
            company: "Acme AB",
            location: "Stockholm",
            startDate: "2020-01",
            endDate: "",
            current: true,
            bullets: [],
          },
        ],
      }),
    ).toBe(true);
  });
});
