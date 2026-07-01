import { describe, expect, it } from "vitest";

import type {
  ExportCheckContext,
  ExportCheckSection,
} from "@/lib/resume-countries/export-checks/types";
import type { CandidateProfile } from "@/lib/resume-types";

import { austriaExportCheckRules } from "./index";

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
  const rule = austriaExportCheckRules.find((entry) => entry.section === section);
  if (!rule) {
    throw new Error(`Missing rule for section: ${section}`);
  }

  const context: ExportCheckContext = { candidate, country: "austria" };
  return rule.check(context);
}

describe("Austria export checks", () => {
  it("requires a professional photo when none is included", () => {
    expect(runCheck("photo", emptyCandidate)).toBe(false);
  });

  it("requires a professional photo when the photo slot is empty", () => {
    expect(
      runCheck("photo", {
        ...emptyCandidate,
        photo: { dataUrl: "", include: true },
      }),
    ).toBe(false);
  });

  it("accepts a resume with an included professional photo", () => {
    expect(
      runCheck("photo", {
        ...emptyCandidate,
        photo: { dataUrl: "data:image/png;base64,abc", include: true },
      }),
    ).toBe(true);
  });

  it("requires full contact details when any field is missing", () => {
    expect(runCheck("contact", emptyCandidate)).toBe(false);
    expect(
      runCheck("contact", {
        ...emptyCandidate,
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "+43 1 234 5678",
      }),
    ).toBe(false);
  });

  it("requires full contact details when fields are only whitespace", () => {
    expect(
      runCheck("contact", {
        ...emptyCandidate,
        name: "  ",
        email: "jane@example.com",
        phone: "+43 1 234 5678",
        location: "Vienna",
      }),
    ).toBe(false);
  });

  it("accepts a resume with name, email, phone, and location", () => {
    expect(
      runCheck("contact", {
        ...emptyCandidate,
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "+43 1 234 5678",
        location: "Vienna, Austria",
      }),
    ).toBe(true);
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
            company: "Acme GmbH",
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
            company: "Acme GmbH",
            location: "Vienna",
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
