import type {
  CountryDisplay,
  CountryGuidance,
  SupportedResumeCountry,
} from "@/lib/resume-countries/types";

export const countryDisplay: Record<SupportedResumeCountry, CountryDisplay> = {
  sweden: {
    flag: (
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
        <rect width={20} height={20} fill="#F5F5F5" />
        <rect width={1876} height={988} transform="translate(-284 -848)" fill="white" />
        <path
          d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
          fill="#FFDA44"
        />
        <path
          d="M7.82621 8.69566H19.9154C19.2762 3.78914 15.0808 0 10.0001 0C9.25344 0 8.52613 0.0825391 7.82617 0.237695L7.82621 8.69566Z"
          fill="#0052B4"
        />
        <path
          d="M5.21672 8.69567V1.21594C2.47086 2.71415 0.505195 5.46223 0.0839844 8.69571L5.21672 8.69567Z"
          fill="#0052B4"
        />
        <path
          d="M5.21668 11.3043H0.0839844C0.505195 14.5378 2.47086 17.2859 5.21672 18.784L5.21668 11.3043Z"
          fill="#0052B4"
        />
        <path
          d="M7.82617 11.3044V19.7623C8.52613 19.9174 9.25344 20 10.0001 20C15.0808 20 19.2762 16.2108 19.9154 11.3043H7.82617V11.3044Z"
          fill="#0052B4"
        />
      </svg>
    ),
    subtitle: "Local conventions for the Swedish job market",
  },
  austria: {
    flag: (
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
        <rect width={20} height={20} fill="#F5F5F5" />
        <rect width={1876} height={988} transform="translate(-150 -68)" fill="white" />
        <path
          d="M19.378 13.4782C19.78 12.3949 20 11.2232 20 9.99997C20 8.77677 19.78 7.60509 19.378 6.52173L10 5.65216L0.621992 6.52173C0.220039 7.60509 0 8.77677 0 9.99997C0 11.2232 0.220039 12.3949 0.621992 13.4782L10 14.3478L19.378 13.4782Z"
          fill="#F0F0F0"
        />
        <path
          d="M9.99914 20C14.2987 20 17.9642 17.2863 19.3771 13.4783H0.621094C2.03406 17.2863 5.69945 20 9.99914 20Z"
          fill="#D80027"
        />
        <path
          d="M9.99914 0C5.69945 0 2.03406 2.71375 0.621094 6.52176H19.3771C17.9642 2.71375 14.2987 0 9.99914 0Z"
          fill="#D80027"
        />
      </svg>
    ),
    subtitle: "Local conventions for the Austrian job market",
  },
  none: {
    flag: null,
    subtitle: "No country selected",
  },
};

export const resumeCountryGuidance: Record<SupportedResumeCountry, CountryGuidance> = {
  sweden: {
    title: "Swedish resume tips",
    tips: [
      "Photos are optional. Omitting one is a safe choice.",
      "Skip resume objectives; use a short 2–3 line professional summary focused on concrete facts.",
      "Use reverse chronological format with bullet points, action verbs, and quantifiable results.",
      "Match the language of your CV to the language of the job advertisement.",
    ],
  },
  austria: {
    title: "Austrian resume tips",
    tips: [
      "A professional photo is standard.",
      "Include full name, address, phone, email, date of birth, and nationality. Marital status is optional.",
      "Include a Summary. Rather than stating what you want, focus on what you can offer and how your background aligns with the position.",
    ],
  },
  none: {
    title: "No country selected",
    tips: [],
  },
};
