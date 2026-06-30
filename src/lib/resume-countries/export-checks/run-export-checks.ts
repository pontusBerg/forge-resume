import { exportCheckRulesByCountry } from "@/lib/resume-countries/export-checks/rules";
import type {
  ExportCheckContext,
  ExportCheckResult,
} from "@/lib/resume-countries/export-checks/types";

export function runExportChecks(ctx: ExportCheckContext): ExportCheckResult[] {
  const rules = exportCheckRulesByCountry[ctx.country];

  return rules.map((rule) => ({
    id: rule.id,
    section: rule.section,
    message: rule.message,
    passed: rule.check(ctx),
  }));
}

export function getFailedExportChecks(ctx: ExportCheckContext): ExportCheckResult[] {
  return runExportChecks(ctx).filter((result) => !result.passed);
}
