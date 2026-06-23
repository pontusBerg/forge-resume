import type { CandidateProfile, JobTarget } from "@/lib/resume-types"

export function formatResumePlainText(candidate: CandidateProfile, jobTarget: JobTarget) {
  const links = candidate.links
    .filter((link) => link.label || link.url)
    .map((link) => `${link.label}: ${link.url}`)
    .join(" | ")
  const experience = candidate.experience
    .map((item) => {
      const bullets = item.bullets.map((bullet) => `- ${bullet}`).join("\n")
      return `${item.role}, ${item.company} (${item.startDate}-${item.current ? "Present" : item.endDate})\n${bullets}`
    })
    .join("\n\n")
  const education = candidate.education
    .map((item) => `${item.degree}, ${item.school} (${item.startDate}-${item.endDate})`)
    .join("\n")
  const skills = candidate.skillGroups
    .map((group) => `${group.name}: ${group.skills.join(", ")}`)
    .join("\n")
  const summary = candidate.includeSummary ? ["SUMMARY", candidate.summary, ""] : []
  const educationSection = candidate.includeEducation ? ["EDUCATION", education, ""] : []

  return [
    candidate.name,
    candidate.headline,
    [candidate.email, candidate.phone, candidate.location].filter(Boolean).join(" | "),
    links,
    "",
    "TARGET",
    [jobTarget.role, jobTarget.company, jobTarget.location].filter(Boolean).join(" | "),
    "",
    ...summary,
    "EXPERIENCE",
    experience,
    "",
    ...educationSection,
    "SKILLS",
    skills,
  ]
    .filter((line) => line !== undefined)
    .join("\n")
}
