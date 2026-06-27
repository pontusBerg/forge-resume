import type { CoverLetter } from "@/lib/resume-types";

export function formatCoverLetterDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function createEmptyCoverLetter(date = new Date()): CoverLetter {
  return {
    recipientName: "",
    recipientCompany: "",
    recipientLocation: "",
    date: formatCoverLetterDate(date),
    salutation: "Dear Hiring Manager,",
    signOff: "Sincerely,",
    bodyState: "",
  };
}
