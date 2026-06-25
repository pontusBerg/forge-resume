import type { ExportCheckRule } from "@/lib/resume-export-checks/types";

export const swedenExportCheckRules: ExportCheckRule[] = [
  {
    id: "sweden.photo.omitted",
    section: "photo",
    message:
      "Photos are optional in Sweden — omitting one is a safe choice, especially for international companies.",
    check: ({ candidate }) => !candidate.photo.include,
  },
  {
    id: "sweden.summary.present",
    section: "summary",
    message: "Use a short 2–3 line professional summary focused on concrete facts.",
    check: ({ candidate }) =>
      !candidate.includeSummary || Boolean(candidate.summary.trim()),
  },
  {
    id: "sweden.experience.present",
    section: "experience",
    message: "Add at least one work experience entry in reverse chronological order.",
    check: ({ candidate }) =>
      candidate.experience.some((entry) => entry.role.trim() && entry.company.trim()),
  },
];
