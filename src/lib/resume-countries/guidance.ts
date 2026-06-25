import type { CountryDisplay, CountryGuidance, SupportedResumeCountry } from "@/lib/resume-countries/types";

export const countryDisplay: Record<SupportedResumeCountry, CountryDisplay> = {
  sweden: {
    flag: "🇸🇪",
    subtitle: "Local conventions for the Swedish job market",
  },
  austria: {
    flag: "🇦🇹",
    subtitle: "Local conventions for the Austrian job market",
  },
};

export const resumeCountryGuidance: Record<SupportedResumeCountry, CountryGuidance> = {
  sweden: {
    title: "Swedish resume tips",
    tips: [
      "Keep it to 1–2 pages: one page for early career, two for experienced professionals. PDF is preferred.",
      "Photos are optional — omitting one is a safe choice, as many international companies discourage photos to reduce bias.",
      "Use a modest, factual tone. Swedes value modesty and accuracy over boastful or promotional language.",
      "Skip resume objectives; use a short 2–3 line professional summary focused on concrete facts.",
      "Use reverse chronological format with bullet points, action verbs, and quantifiable results.",
      "A well-crafted cover letter (personligt brev) is considered essential.",
      "Match the language of your CV to the language of the job advertisement.",
    ],
  },
  austria: {
    title: "Austrian resume tips",
    tips: [
      "Use tabular form (Lebenslauf), max 2 pages. Save as PDF.",
      "A professional photo is standard in most industries — place it at the top, around 4×5 cm, with a neutral background.",
      "Include full name, address, phone, email, date of birth, and nationality. Marital status is optional.",
      "Sign and date the CV at the bottom — a scanned signature is acceptable for digital applications.",
      "Reverse chronological format is strongly preferred. Gaps in employment are viewed with suspicion, so explain any if possible.",
      "The cover letter is considered more important than the CV — write it in German and personalize it per application.",
      "Academic and professional titles carry significant weight — include them in the CV and use them in correspondence.",
    ],
  },
};
