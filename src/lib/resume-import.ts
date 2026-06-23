import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";

import type {
  CandidateProfile,
  Education,
  Experience,
  ResumeLink,
  SkillGroup,
} from "@/lib/resume-types";

type ResumeSection = "summary" | "experience" | "education" | "skills";

const SECTION_HEADINGS: Record<string, ResumeSection> = {
  ABOUT: "summary",
  OBJECTIVE: "summary",
  PROFILE: "summary",
  PROFESSIONALPROFILE: "summary",
  PROFESSIONALSUMMARY: "summary",
  SUMMARY: "summary",
  CAREERHISTORY: "experience",
  EMPLOYMENT: "experience",
  EMPLOYMENTHISTORY: "experience",
  EXPERIENCE: "experience",
  PROFESSIONALHISTORY: "experience",
  WORKEXPERIENCE: "experience",
  EDUCATION: "education",
  EDUCATIONCERTIFICATIONS: "education",
  EDUCATIONANDCERTIFICATIONS: "education",
  ACADEMICBACKGROUND: "education",
  SKILLS: "skills",
  TECHNICALSKILLS: "skills",
  TECHNOLOGIES: "skills",
  CORECOMPETENCIES: "skills",
};

const STOP_WORDS = new Set([
  "and",
  "are",
  "built",
  "for",
  "from",
  "into",
  "our",
  "that",
  "the",
  "their",
  "this",
  "using",
  "with",
]);

type ParsedSections = {
  header: string[];
  sections: Record<ResumeSection, string[]>;
};

type ContactDetails = Pick<CandidateProfile, "email" | "phone" | "location" | "links">;

type PdfTextItem = {
  str: string;
  hasEOL: boolean;
};

export async function importResumeFile(file: File): Promise<CandidateProfile> {
  const resumeText = await extractResumeText(file);

  if (!resumeText.trim()) {
    throw new Error("Could not find selectable text in this resume.");
  }

  return parseResumeText(resumeText);
}

export function parseResumeText(text: string): CandidateProfile {
  const lines = normalizeExtractedText(text).split("\n").filter(Boolean);
  const { header, sections } = splitResumeSections(lines);
  const contact = extractContactDetails(header);
  const headerFields = header.filter((line) => !isContactLine(line));

  return {
    name: headerFields[0] ?? "",
    headline: headerFields[1] ?? "",
    email: contact.email,
    phone: contact.phone,
    location: contact.location,
    photo: {
      dataUrl: "",
      include: false,
    },
    links: contact.links,
    summary: sections.summary.join(" "),
    includeSummary: true,
    includeEducation: true,
    experience: parseExperience(sections.experience),
    education: parseEducation(sections.education),
    skillGroups: parseSkillGroups(sections.skills),
  };
}

async function extractResumeText(file: File) {
  const lowerFileName = file.name.toLowerCase();

  if (file.type === "application/pdf" || lowerFileName.endsWith(".pdf")) {
    return extractPdfText(file);
  }

  if (
    file.type.startsWith("text/") ||
    lowerFileName.endsWith(".txt") ||
    lowerFileName.endsWith(".md")
  ) {
    return normalizeExtractedText(await file.text());
  }

  throw new Error("Upload a PDF or plain text resume.");
}

async function extractPdfText(file: File) {
  const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
  const data = new Uint8Array(await file.arrayBuffer());

  GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

  const loadingTask = getDocument({ data });
  const pdf = await loadingTask.promise;
  const pages: string[] = [];

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      let pageText = "";

      for (const item of textContent.items) {
        if (!isPdfTextItem(item)) {
          continue;
        }

        pageText += item.hasEOL ? `${item.str}\n` : `${item.str} `;
      }

      pages.push(pageText);
    }
  } finally {
    await loadingTask.destroy();
  }

  return normalizeExtractedText(pages.join("\n"));
}

function isPdfTextItem(item: unknown): item is PdfTextItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "str" in item &&
    typeof item.str === "string" &&
    "hasEOL" in item &&
    typeof item.hasEOL === "boolean"
  );
}

function normalizeExtractedText(text: string) {
  return text
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line && !/^--\s*\d+\s+of\s+\d+\s*--$/i.test(line))
    .join("\n");
}

function splitResumeSections(lines: string[]): ParsedSections {
  const header: string[] = [];
  const sections: Record<ResumeSection, string[]> = {
    summary: [],
    experience: [],
    education: [],
    skills: [],
  };
  let currentSection: ResumeSection | null = null;

  for (const line of lines) {
    const section = getSectionHeading(line);

    if (section) {
      currentSection = section;
      continue;
    }

    if (currentSection) {
      sections[currentSection].push(line);
    } else {
      header.push(line);
    }
  }

  return { header, sections };
}

function getSectionHeading(line: string) {
  const compactHeading = line.toUpperCase().replace(/[^A-Z]/g, "");
  return SECTION_HEADINGS[compactHeading];
}

function extractContactDetails(lines: string[]): ContactDetails {
  const text = lines.join(" ");
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
  const phone = text.match(/(?:Phone:\s*)?(\+?\d[\d\s().-]{7,}\d)/i)?.[1]?.trim() ?? "";
  const location = extractLabeledValue(text, "Location");

  return {
    email,
    phone,
    location,
    links: extractLinks(lines),
  };
}

function extractLabeledValue(text: string, label: string) {
  const match = text.match(new RegExp(`${label}:\\s*(.+?)(?=\\s+[A-Z][\\w ]+:|$)`, "i"));
  return match?.[1]?.trim() ?? "";
}

function extractLinks(lines: string[]): ResumeLink[] {
  const links: ResumeLink[] = [];
  const seenUrls = new Set<string>();
  const labeledUrlPattern =
    /\b(LinkedIn|GitHub|Portfolio|Website|Site)\b:?\s*((?:https?:\/\/)?(?:www\.)?[\w.-]+\.[a-z]{2,}[^\s]*)/gi;

  for (const line of lines) {
    for (const match of line.matchAll(labeledUrlPattern)) {
      const label = normalizeLinkLabel(match[1]);
      const url = match[2]?.replace(/[),.;]+$/, "") ?? "";

      if (!url || seenUrls.has(url)) {
        continue;
      }

      seenUrls.add(url);
      links.push({
        id: makeId("link", links.length),
        label,
        url,
      });
    }
  }

  return links;
}

function normalizeLinkLabel(label: string | undefined) {
  if (!label) {
    return "Website";
  }

  return label.toLowerCase() === "site" ? "Website" : label;
}

function isContactLine(line: string) {
  return /\b(email|phone|location|linkedin|github|portfolio|website|site)\b:/i.test(line);
}

function parseExperience(lines: string[]): Experience[] {
  const cleanedLines = lines.filter(Boolean);
  const dateIndexes = cleanedLines
    .map((line, index) => (isDateRangeLine(line) ? index : -1))
    .filter((index) => index >= 0);

  if (!dateIndexes.length) {
    const bullets = parseBulletLines(cleanedLines);

    return bullets.length
      ? [
          {
            id: makeId("exp", 0),
            role: "Experience",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            bullets,
          },
        ]
      : [];
  }

  return dateIndexes
    .map((dateIndex, index) => {
      const nextDateIndex = dateIndexes[index + 1];
      const role = cleanedLines[dateIndex - 2] ?? "";
      const { company, location } = parseCompanyLine(cleanedLines[dateIndex - 1] ?? "");
      const dateRange = parseDateRange(cleanedLines[dateIndex]);
      const bulletEndIndex =
        nextDateIndex === undefined
          ? cleanedLines.length
          : Math.max(dateIndex + 1, nextDateIndex - 2);
      const bullets = parseBulletLines(cleanedLines.slice(dateIndex + 1, bulletEndIndex));

      return {
        id: makeId("exp", index),
        role,
        company,
        location,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        current: dateRange.current,
        bullets,
        keywords: extractKeywords([role, company, location, ...bullets].join(" ")),
      };
    })
    .filter((experience) => experience.role || experience.company || experience.bullets.length);
}

function parseCompanyLine(line: string) {
  const [company = "", location = ""] = line.split(/\s[-–—]\s/, 2);

  return {
    company: company.trim(),
    location: location.trim(),
  };
}

function isDateRangeLine(line: string) {
  return /\b(?:Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|Sept|September|Oct|October|Nov|November|Dec|December)?\.?\s*(?:19|20)\d{2}\s*(?:-|–|—|\bto\b)\s*(?:Present|Current|(?:Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|Sept|September|Oct|October|Nov|November|Dec|December)?\.?\s*(?:19|20)\d{2})\b/i.test(
    line,
  );
}

function parseDateRange(line: string) {
  const [startDate = "", endDate = ""] = line.split(/\s*(?:-|–|—|\bto\b)\s*/i);
  const current = /present|current/i.test(endDate);

  return {
    startDate: startDate.trim(),
    endDate: current ? "" : endDate.trim(),
    current,
  };
}

function parseBulletLines(lines: string[]) {
  const bullets: string[] = [];
  let draft = "";

  for (const rawLine of lines) {
    const hasMarker = /^[-*•]\s+/.test(rawLine);
    const line = rawLine.replace(/^[-*•]\s+/, "").trim();

    if (!line) {
      continue;
    }

    if (hasMarker && draft) {
      bullets.push(draft);
      draft = line;
    } else {
      draft = draft ? `${draft} ${line}` : line;
    }

    if (/[.!?]$/.test(draft)) {
      bullets.push(draft);
      draft = "";
    }
  }

  if (draft) {
    bullets.push(draft);
  }

  return bullets.map((bullet) => bullet.replace(/\s+/g, " ").trim()).filter(Boolean);
}

function parseEducation(lines: string[]): Education[] {
  const cleanedLines = lines.filter(Boolean);
  const education: Education[] = [];
  let index = 0;

  while (index < cleanedLines.length) {
    const line = cleanedLines[index] ?? "";
    const dateRange = line.match(
      /\b((?:19|20)\d{2})\s*(?:-|–|—|\bto\b)\s*((?:19|20)\d{2}|Present|Current)\b/i,
    );

    if (dateRange) {
      const school = line
        .slice(0, dateRange.index)
        .trim()
        .replace(/[-–—,]+$/, "")
        .trim();
      const nextLine = cleanedLines[index + 1] ?? "";
      const degree = nextLine && !/\b(?:19|20)\d{2}\b/.test(nextLine) ? nextLine : "";

      education.push({
        id: makeId("edu", education.length),
        school,
        degree,
        location: "",
        startDate: dateRange[1] ?? "",
        endDate: dateRange[2] ?? "",
        details: "",
      });
      index += degree ? 2 : 1;
      continue;
    }

    education.push({
      id: makeId("edu", education.length),
      school: line,
      degree: cleanedLines[index + 1] ?? "",
      location: "",
      startDate: "",
      endDate: "",
      details: "",
    });
    index += 2;
  }

  return education.filter((entry) => entry.school || entry.degree);
}

function parseSkillGroups(lines: string[]): SkillGroup[] {
  const skills = lines
    .join(", ")
    .split(/[,;|•]/)
    .map((skill) => skill.trim())
    .filter(Boolean);

  return skills.length
    ? [
        {
          id: makeId("skills", 0),
          name: "Skills",
          skills: [...new Set(skills)],
        },
      ]
    : [];
}

function extractKeywords(text: string) {
  const words = text.match(/[a-z0-9][a-z0-9+#.-]{2,}/gi) ?? [];

  return [...new Set(words.map((word) => word.toLowerCase()))]
    .filter((word) => !STOP_WORDS.has(word))
    .slice(0, 8);
}

function makeId(prefix: string, index: number) {
  return `${prefix}-imported-${index + 1}`;
}
