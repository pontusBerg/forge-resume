import type { ExportCheckRule } from "@/lib/resume-export-checks/types";

export const austriaExportCheckRules: ExportCheckRule[] = [
  {
    id: "austria.photo.included",
    section: "photo",
    message:
      "A professional photo is standard in Austria — include one at the top with a neutral background.",
    check: ({ candidate }) => candidate.photo.include && candidate.photo.dataUrl.length > 0,
  },
  {
    id: "austria.contact.complete",
    section: "contact",
    message:
      "Include your full name, address, phone, and email — these are expected on Austrian CVs.",
    check: ({ candidate }) =>
      Boolean(candidate.name.trim()) &&
      Boolean(candidate.email.trim()) &&
      Boolean(candidate.phone.trim()) &&
      Boolean(candidate.location.trim()),
  },
  {
    id: "austria.experience.present",
    section: "experience",
    message: "Add at least one work experience entry in reverse chronological order.",
    check: ({ candidate }) =>
      candidate.experience.some((entry) => entry.role.trim() && entry.company.trim()),
  },
];
