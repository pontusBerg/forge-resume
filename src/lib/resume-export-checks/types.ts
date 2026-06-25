import type { SupportedResumeCountry } from "@/lib/resume-countries";
import type { CandidateProfile } from "@/lib/resume-types";

export type ExportCheckSection =
  | "photo"
  | "contact"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "links";

export type ExportCheckContext = {
  candidate: CandidateProfile;
  country: SupportedResumeCountry;
};

export type ExportCheckRule = {
  id: string;
  section: ExportCheckSection;
  message: string;
  check: (ctx: ExportCheckContext) => boolean;
};

export type ExportCheckResult = {
  id: string;
  section: ExportCheckSection;
  message: string;
  passed: boolean;
};
