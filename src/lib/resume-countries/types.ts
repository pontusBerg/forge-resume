import type { ReactNode } from "react";

export type SupportedResumeCountry = "none" | "sweden" | "austria";

export const supportedResumeCountries: SupportedResumeCountry[] = ["none", "sweden", "austria"];

export type CountryGuidance = {
  title: string;
  tips: string[];
};

export type CountryDisplay = {
  flag: ReactNode;
  subtitle: string;
};
