import type { AppData, CandidateProfile } from "@/lib/resume-types";
import { createEmptyCoverLetter } from "@/lib/cover-letter-defaults";

export const sampleCandidate: CandidateProfile = {
  name: "Jordan Lee",
  headline: "Product-minded Frontend Engineer",
  email: "jordan.lee@example.com",
  phone: "(555) 014-7293",
  location: "Austin, TX",
  photo: {
    dataUrl: "",
    include: false,
  },
  links: [
    {
      id: "portfolio",
      label: "Portfolio",
      url: "jordanlee.dev",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "linkedin.com/in/jordanlee",
    },
  ],
  summary:
    "Frontend engineer with 6+ years of experience building accessible, data-rich SaaS products. Known for turning ambiguous product requirements into fast, usable interfaces that improve conversion and team velocity.",
  includeSummary: true,
  includeEducation: true,
  experience: [
    {
      id: "exp-1",
      role: "Senior Frontend Engineer",
      company: "Northstar Analytics",
      location: "Remote",
      startDate: "2021",
      endDate: "Present",
      current: true,
      bullets: [
        "Led the React migration for a reporting workspace used by 42,000 monthly users, reducing median page load time by 38%.",
        "Built reusable chart, table, and filtering components that cut dashboard delivery time from weeks to days.",
        "Partnered with product and design to launch onboarding experiments that increased activation by 18%.",
      ],
    },
    {
      id: "exp-2",
      role: "Frontend Developer",
      company: "BrightHire",
      location: "Denver, CO",
      startDate: "2018",
      endDate: "2021",
      current: false,
      bullets: [
        "Shipped applicant tracking workflows with form validation, autosave, and role-based review states.",
        "Created a component library with documented patterns that improved UI consistency across 5 product teams.",
        "Improved automated test coverage around hiring funnels and reduced release regressions by 24%.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "University of Texas at Austin",
      degree: "B.S. Computer Science",
      location: "Austin, TX",
      startDate: "2014",
      endDate: "2018",
      details: "Human-computer interaction focus. Dean's List.",
    },
  ],
  skillGroups: [
    {
      id: "skills-1",
      name: "Frontend",
      skills: ["React", "TypeScript", "Vite", "Tailwind CSS", "Accessibility"],
    },
    {
      id: "skills-2",
      name: "Product",
      skills: ["Experimentation", "Design systems", "Analytics", "User onboarding"],
    },
    {
      id: "skills-3",
      name: "Quality",
      skills: ["Testing Library", "Playwright", "Performance profiling", "Code review"],
    },
  ],
};

export const sampleAppData: AppData = {
  candidate: sampleCandidate,
  coverLetter: createEmptyCoverLetter(),
};

export function createEmptyAppData(): AppData {
  return {
    candidate: {
      name: "",
      headline: "",
      email: "",
      phone: "",
      location: "",
      photo: {
        dataUrl: "",
        include: false,
      },
      links: [],
      summary: "",
      includeSummary: true,
      includeEducation: true,
      experience: [],
      education: [],
      skillGroups: [],
    },
    coverLetter: createEmptyCoverLetter(),
  };
}
