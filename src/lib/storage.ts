import type { AppData } from "@/lib/resume-types";

const STORAGE_KEY = "resume-creator-v2:app-data";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStoredAppData(value: unknown): value is AppData {
  if (!isRecord(value)) {
    return false;
  }

  return isRecord(value.candidate) && isRecord(value.jobTarget);
}

function normalizeStoredAppData(data: AppData): AppData {
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
