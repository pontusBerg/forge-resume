import type { CandidateProfile } from "@/lib/resume-types";
import { FilterResetIcon, ZoomInAreaIcon, ZoomOutAreaIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactNode } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
  useTransformComponent,
} from "react-zoom-pan-pinch";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ResumePreviewProps = {
  candidate: CandidateProfile;
};

const ZOOM_STEP = 0.1;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;

export function ResumePreview({ candidate }: ResumePreviewProps) {
  return (
    <div className="resume-preview-zoom resume-preview-bg relative h-full min-h-0 w-full">
      <TransformWrapper
        centerOnInit
        initialScale={1}
        minScale={MIN_ZOOM}
        maxScale={MAX_ZOOM}
        smooth={false}
        wheel={{ step: ZOOM_STEP }}
        pinch={{ step: 8 }}
        panning={{ velocityDisabled: true }}
        doubleClick={{ disabled: true }}
        zoomAnimation={{ disabled: true }}
      >
        <PreviewZoomControls />
        <TransformComponent
          wrapperClass="!size-full"
          contentClass="!size-full flex items-start justify-center p-4"
        >
          <ResumeDocument candidate={candidate} />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

function PreviewZoomControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  const zoomPercent = useTransformComponent(({ state }) => Math.round(state.scale * 100));

  return (
    <div className="no-print pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-end p-2">
      <div className="pointer-events-auto flex items-center gap-1 rounded-md border border-border bg-background p-1 shadow-sm backdrop-blur-sm">
        <span className="px-1.5 text-xs font-medium tabular-nums text-muted-foreground">
          {zoomPercent}%
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Zoom out"
          onClick={() => zoomOut(ZOOM_STEP)}
        >
          <HugeiconsIcon icon={ZoomOutAreaIcon} strokeWidth={2} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Zoom in"
          onClick={() => zoomIn(ZOOM_STEP)}
        >
          <HugeiconsIcon icon={ZoomInAreaIcon} strokeWidth={2} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Reset zoom"
          onClick={() => resetTransform()}
        >
          <HugeiconsIcon icon={FilterResetIcon} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}

function ResumeDocument({ candidate }: { candidate: CandidateProfile }) {
  const hasPhoto = candidate.photo.include && candidate.photo.dataUrl;
  const contactItems = [
    { id: "email", label: "Email", value: candidate.email },
    { id: "phone", label: "Phone", value: candidate.phone },
    { id: "location", label: "Location", value: candidate.location },
    ...candidate.links
      .filter((link) => link.label || link.url)
      .map((link) => ({
        id: link.id,
        label: link.label,
        value: link.url,
      })),
  ].filter((item) => item.value);

  return (
    <Card className="printable resume-print resume-document mx-auto w-full max-w-3xl overflow-visible">
      <CardContent className="grid gap-4 p-5 sm:p-6">
        <header className="grid gap-2">
          {hasPhoto ? (
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
              <img
                alt={candidate.name ? `${candidate.name} headshot` : "Resume headshot"}
                className="size-20 rounded-xl object-cover ring-1 ring-border"
                src={candidate.photo.dataUrl}
              />
              <div className="min-w-0 flex-1 self-center">
                <h2 className="font-sans text-2xl font-bold tracking-tight">
                  {candidate.name || "Your Name"}
                </h2>
                <p className="text-sm font-medium text-muted-foreground">
                  {candidate.headline || "Professional headline"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="font-sans text-2xl font-bold tracking-tight">
                  {candidate.name || "Your Name"}
                </h2>
                <p className="text-sm font-medium text-muted-foreground">
                  {candidate.headline || "Professional headline"}
                </p>
              </div>
            </div>
          )}
          {contactItems.length ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-5 text-muted-foreground">
              {contactItems.map((item) => (
                <span className="whitespace-nowrap" key={item.id}>
                  <span className="font-medium text-foreground">{item.label}</span>: {item.value}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        {candidate.includeSummary ? (
          <ResumeSection title="Summary">
            <p className="text-sm leading-5">{candidate.summary || "Add a concise summary."}</p>
          </ResumeSection>
        ) : null}

        <ResumeSection title="Experience">
          <div className="grid gap-3">
            {candidate.experience.length ? (
              candidate.experience.map((experience) => (
                <article className="grid gap-1.5" key={experience.id}>
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <h4 className="font-sans text-sm font-bold">{experience.role}</h4>
                      <p className="text-xs font-medium text-muted-foreground">
                        {experience.company}
                        {experience.location ? ` - ${experience.location}` : ""}
                      </p>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {[experience.startDate, experience.current ? "Present" : experience.endDate]
                        .filter(Boolean)
                        .join(" - ")}
                    </p>
                  </div>
                  <ul className="grid gap-1 pl-4 text-sm leading-5">
                    {experience.bullets.filter(Boolean).map((bullet) => (
                      <li className="list-disc" key={bullet}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Add experience to build the resume.</p>
            )}
          </div>
        </ResumeSection>

        {candidate.includeEducation ? (
          <ResumeSection title="Education">
            <div className="grid gap-2">
              {candidate.education.length ? (
                candidate.education.map((education) => (
                  <article className="grid gap-1" key={education.id}>
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <h4 className="font-sans text-sm font-bold">{education.school}</h4>
                        <p className="text-xs font-medium text-muted-foreground">
                          {education.degree}
                        </p>
                      </div>
                      <p className="text-xs font-medium text-muted-foreground">
                        {[education.startDate, education.endDate].filter(Boolean).join(" - ")}
                      </p>
                    </div>
                    {education.details ? (
                      <p className="text-sm leading-5 text-muted-foreground">{education.details}</p>
                    ) : null}
                  </article>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Add education details.</p>
              )}
            </div>
          </ResumeSection>
        ) : null}

        <ResumeSection title="Skills">
          <div className="grid gap-2">
            {candidate.skillGroups.length ? (
              candidate.skillGroups.map((group) => (
                <div className="grid gap-1.5" key={group.id}>
                  <h4 className="text-sm font-bold">{group.name}</h4>
                  <p className="text-sm leading-5 text-muted-foreground">
                    {group.skills.filter(Boolean).join(", ")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Add skills grouped by category.</p>
            )}
          </div>
        </ResumeSection>
      </CardContent>
    </Card>
  );
}

type ResumeSectionProps = {
  title: string;
  children: ReactNode;
};

function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <section className="grid gap-2">
      <div className="flex items-center gap-2">
        <h3 className="font-sans text-xs font-extrabold uppercase tracking-[0.18em] text-foreground">
          {title}
        </h3>
        <Separator className="flex-1" />
      </div>
      {children}
    </section>
  );
}
