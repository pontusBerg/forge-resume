import { createEmptyCoverLetter } from "@/lib/cover-letter-defaults";
import type { AppData, CoverLetter } from "@/lib/resume-types";

const STORAGE_KEY = "resume-creator-v2:app-data";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

type StoredAppData = {
  candidate: AppData["candidate"];
  coverLetter?: Partial<CoverLetter>;
};

function isStoredAppData(value: unknown): value is StoredAppData {
  if (!isRecord(value)) {
    return false;
  }

  return isRecord(value.candidate);
}

function normalizeStoredAppData(data: StoredAppData): AppData {
  const defaultCoverLetter = createEmptyCoverLetter();

  return {
    ...data,
    candidate: {
      ...data.candidate,
      includeSummary: data.candidate.includeSummary ?? true,
      includeEducation: data.candidate.includeEducation ?? true,
      photo: data.candidate.photo ?? {
        dataUrl: "",
        include: false,
      },
    },
    coverLetter: {
      recipientName: data.coverLetter?.recipientName ?? defaultCoverLetter.recipientName,
      recipientCompany: data.coverLetter?.recipientCompany ?? defaultCoverLetter.recipientCompany,
      recipientLocation:
        data.coverLetter?.recipientLocation ?? defaultCoverLetter.recipientLocation,
      date: data.coverLetter?.date ?? defaultCoverLetter.date,
      salutation: data.coverLetter?.salutation ?? defaultCoverLetter.salutation,
      signOff: data.coverLetter?.signOff ?? defaultCoverLetter.signOff,
      bodyState: data.coverLetter?.bodyState ?? defaultCoverLetter.bodyState,
    },
  };
}

export function loadStoredAppData(): AppData | null {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    return isStoredAppData(parsedValue) ? normalizeStoredAppData(parsedValue) : null;
  } catch {
    return null;
  }
}

export function saveAppData(data: AppData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearAppData() {
  window.localStorage.removeItem(STORAGE_KEY);
}
