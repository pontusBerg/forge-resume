import { austriaExportCheckRules } from "@/lib/resume-countries/export-checks/rules/austria";
import { swedenExportCheckRules } from "@/lib/resume-countries/export-checks/rules/sweden";
import type { ExportCheckRule } from "@/lib/resume-countries/export-checks/types";
import type { SupportedResumeCountry } from "@/lib/resume-countries/types";

export const exportCheckRulesByCountry: Record<SupportedResumeCountry, ExportCheckRule[]> = {
  austria: austriaExportCheckRules,
  sweden: swedenExportCheckRules,
  none: [],
};
