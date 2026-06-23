import type { TailoringAnalysis } from "@/lib/resume-tailoring"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { FormField } from "@/components/resume/FormField"

type TailoringPanelProps = {
  analysis: TailoringAnalysis
  currentSummary: string
  onApplySummary: () => void
  onSummaryChange: (summary: string) => void
}

export function TailoringPanel({
  analysis,
  currentSummary,
  onApplySummary,
  onSummaryChange,
}: TailoringPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Local Tailoring Insights</CardTitle>
        <CardDescription>
          Keyword matching runs in your browser. It is not AI and does not send data anywhere.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium">Resume match</span>
            <span className="text-sm text-muted-foreground">{analysis.score}%</span>
          </div>
          <Progress value={analysis.score} />
        </div>

        <KeywordGroup
          emptyLabel="Paste a job description to discover keywords."
          keywords={analysis.keywords}
          title="Job keywords"
        />
        <KeywordGroup
          emptyLabel="No matches yet."
          keywords={analysis.matchedKeywords}
          title="Matched keywords"
        />
        <KeywordGroup
          emptyLabel="No missing terms detected."
          keywords={analysis.missingKeywords}
          title="Possible gaps"
          variant="outline"
        />

        <Separator />

        <div className="grid gap-3">
          <h3 className="text-sm font-medium">Strongest bullets</h3>
          {analysis.strongestBullets.length ? (
            <div className="grid gap-3">
              {analysis.strongestBullets.map((match) => (
                <article className="rounded-lg border p-3" key={`${match.experienceId}-${match.bullet}`}>
                  <p className="text-sm leading-6">{match.bullet}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {match.role}, {match.company} - matched {match.keywords.join(", ")}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No bullet matches yet. Add experience bullets and a target job description.
            </p>
          )}
        </div>

        <Alert>
          <AlertTitle>Suggested summary</AlertTitle>
          <AlertDescription>{analysis.suggestedSummary}</AlertDescription>
        </Alert>
        <div className="grid gap-3">
          <Button type="button" onClick={onApplySummary}>
            Use suggested summary
          </Button>
          <FormField
            id="tailoring-custom-summary"
            label="Your summary"
            hint="Write your own summary or edit the suggested one after applying it."
          >
            <Textarea
              id="tailoring-custom-summary"
              className="min-h-28"
              value={currentSummary}
              onChange={(event) => onSummaryChange(event.target.value)}
            />
          </FormField>
        </div>
      </CardContent>
    </Card>
  )
}

type KeywordGroupProps = {
  title: string
  keywords: string[]
  emptyLabel: string
  variant?: "secondary" | "outline"
}

function KeywordGroup({
  title,
  keywords,
  emptyLabel,
  variant = "secondary",
}: KeywordGroupProps) {
  return (
    <div className="grid gap-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {keywords.length ? (
          keywords.map((keyword) => (
            <Badge key={keyword} variant={variant}>
              {keyword}
            </Badge>
          ))
        ) : (
          <span className="text-sm text-muted-foreground">{emptyLabel}</span>
        )}
      </div>
    </div>
  )
}
