import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import type { AppData, CandidateProfile, CoverLetter } from "@/lib/resume-types";
import { createEmptyAppData } from "@/lib/sample-data";
import { loadStoredAppData, saveAppData } from "@/lib/storage";

type AppDataContextValue = {
  data: AppData;
  setCandidate: (candidate: CandidateProfile) => void;
  setCoverLetter: (coverLetter: CoverLetter) => void;
  importCandidate: (candidate: CandidateProfile) => void;
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => {
    return loadStoredAppData() ?? createEmptyAppData();
  });

  useEffect(() => {
    saveAppData(data);
  }, [data]);

  const value: AppDataContextValue = {
    data,
    setCandidate: (candidate) => {
      setData((currentData) => ({
        ...currentData,
        candidate,
      }));
    },
    setCoverLetter: (coverLetter) => {
      setData((currentData) => ({
        ...currentData,
        coverLetter,
      }));
    },
    importCandidate: (candidate) => {
      setData((currentData) => ({
        ...currentData,
        candidate: {
          ...candidate,
          photo: currentData.candidate.photo,
        },
      }));
    },
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider");
  }

  return context;
}
