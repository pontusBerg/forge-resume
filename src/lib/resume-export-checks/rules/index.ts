import { austriaExportCheckRules } from "@/lib/resume-export-checks/rules/austria";
import { swedenExportCheckRules } from "@/lib/resume-export-checks/rules/sweden";
import type { SupportedResumeCountry } from "@/lib/resume-countries";
import type { ExportCheckRule } from "@/lib/resume-export-checks/types";

export const exportCheckRulesByCountry: Record<SupportedResumeCountry, ExportCheckRule[]> = {
  austria: austriaExportCheckRules,
  sweden: swedenExportCheckRules,
};
