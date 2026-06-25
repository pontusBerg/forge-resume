export type SupportedResumeCountry = "sweden" | "austria";

export const supportedResumeCountries: SupportedResumeCountry[] = ["sweden", "austria"];

export type CountryGuidance = {
  title: string;
  tips: string[];
};

export type CountryDisplay = {
  flag: string;
  subtitle: string;
};
