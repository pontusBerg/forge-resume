import { FormField } from "@/components/resume/FormField"
import { SectionTitle } from "@/components/resume/SectionTitle"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type SummarySectionProps = {
  summary: string
  includeSummary: boolean
  onSummaryChange: (summary: string) => void
  onIncludeSummaryChange: (includeSummary: boolean) => void
}

export function SummarySection({
  summary,
  includeSummary,
  onSummaryChange,
  onIncludeSummaryChange,
}: SummarySectionProps) {
  return (
    <section className="grid gap-5">
      <SectionTitle title="Summary" />
      <div className="grid gap-4">
        <FormField id="candidate-summary" label="">
          <Textarea
            id="candidate-summary"
            className="min-h-28"
            value={summary}
            onChange={(event) => onSummaryChange(event.target.value)}
          />
        </FormField>
        <Label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={includeSummary}
            onCheckedChange={(checked) => onIncludeSummaryChange(checked)}
          />
          Show summary on resume
        </Label>
      </div>
    </section>
  )
}
