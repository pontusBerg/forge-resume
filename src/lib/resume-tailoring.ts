import type { CandidateProfile, Experience, JobTarget } from "@/lib/resume-types"

export type BulletMatch = {
  experienceId: string
  role: string
  company: string
  bullet: string
  score: number
  keywords: string[]
}

export type TailoringAnalysis = {
  score: number
  keywords: string[]
  matchedKeywords: string[]
  missingKeywords: string[]
  matchedSkills: string[]
  strongestBullets: BulletMatch[]
  suggestedSummary: string
}

const STOP_WORDS = new Set([
  "about",
  "after",
  "also",
  "and",
  "are",
  "build",
  "can",
  "for",
  "from",
  "has",
  "have",
  "into",
  "our",
  "that",
  "the",
  "their",
  "this",
  "to",
  "with",
  "will",
  "you",
  "your",
])

function uniqueValues(values: string[]) {
  return [...new Set(values)]
}

function normalizeWords(text: string) {
  return (
    text
      .toLowerCase()
      .match(/[a-z0-9][a-z0-9+#.-]{2,}/g)
      ?.filter((word) => !STOP_WORDS.has(word)) ?? []
  )
}

export function extractJobKeywords(description: string, limit = 18) {
  const counts = new Map<string, number>()

  for (const word of normalizeWords(description)) {
    counts.set(word, (counts.get(word) ?? 0) + 1)
  }

  return [...counts.entries()]
    .sort((first, second) => second[1] - first[1] || first[0].localeCompare(second[0]))
    .slice(0, limit)
    .map(([word]) => word)
}

function getSkillNames(candidate: CandidateProfile) {
  return candidate.skillGroups.flatMap((group) => group.skills)
}

function getExperienceText(experience: Experience) {
  return [
    experience.role,
    experience.company,
    experience.location,
    ...experience.bullets,
    ...experience.keywords,
  ].join(" ")
}

function countMatches(text: string, keywords: string[]) {
  const words = new Set(normalizeWords(text))
  return keywords.filter((keyword) => words.has(keyword))
}

function scoreBullets(candidate: CandidateProfile, keywords: string[]) {
  return candidate.experience
    .flatMap((experience) =>
      experience.bullets.map((bullet) => {
        const matchedKeywords = countMatches(
          `${bullet} ${experience.keywords.join(" ")}`,
          keywords,
        )

        return {
          experienceId: experience.id,
          role: experience.role,
          company: experience.company,
          bullet,
          score: matchedKeywords.length,
          keywords: matchedKeywords,
        }
      }),
    )
    .filter((match) => match.score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, 4)
}

export function analyzeResume(
  candidate: CandidateProfile,
  jobTarget: JobTarget,
): TailoringAnalysis {
  const keywords = extractJobKeywords(
    `${jobTarget.role} ${jobTarget.company} ${jobTarget.description}`,
  )
  const candidateWords = new Set(
    normalizeWords(
      [
        candidate.headline,
        candidate.summary,
        getSkillNames(candidate).join(" "),
        candidate.experience.map(getExperienceText).join(" "),
      ].join(" "),
    ),
  )
  const matchedKeywords = keywords.filter((keyword) => candidateWords.has(keyword))
  const missingKeywords = keywords.filter((keyword) => !candidateWords.has(keyword)).slice(0, 8)
  const matchedSkills = getSkillNames(candidate).filter((skill) =>
    keywords.includes(skill.toLowerCase()),
  )
  const strongestBullets = scoreBullets(candidate, keywords)
  const score = keywords.length
    ? Math.round((matchedKeywords.length / keywords.length) * 100)
    : 0
  const suggestedSummary = createSuggestedSummary(
    candidate,
    jobTarget,
    uniqueValues([...matchedKeywords, ...matchedSkills.map((skill) => skill.toLowerCase())]),
    strongestBullets[0]?.bullet,
  )

  return {
    score,
    keywords,
    matchedKeywords,
    missingKeywords,
    matchedSkills,
    strongestBullets,
    suggestedSummary,
  }
}

function createSuggestedSummary(
  candidate: CandidateProfile,
  jobTarget: JobTarget,
  matchedTerms: string[],
  strongestBullet: string | undefined,
) {
  const role = jobTarget.role || "this role"
  const company = jobTarget.company || "the target company"
  const strengths = matchedTerms.slice(0, 4).join(", ")
  const strengthPhrase = strengths
    ? ` with strengths in ${strengths}`
    : " with a track record of shipping reliable product experiences"
  const evidence = strongestBullet
    ? ` Recent impact includes: ${strongestBullet}`
    : ""

  return `${candidate.headline || "Experienced candidate"}${strengthPhrase}, tailored for the ${role} opportunity at ${company}.${evidence}`
}
