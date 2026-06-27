export type ResumeLink = {
  id: string;
  label: string;
  url: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
};

export type SkillGroup = {
  id: string;
  name: string;
  skills: string[];
};

export type ResumePhoto = {
  dataUrl: string;
  include: boolean;
};

export type CandidateProfile = {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  photo: ResumePhoto;
  links: ResumeLink[];
  summary: string;
  includeSummary: boolean;
  includeEducation: boolean;
  experience: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
};

export type CoverLetter = {
  recipientName: string;
  recipientCompany: string;
  recipientLocation: string;
  date: string;
  salutation: string;
  signOff: string;
  bodyState: string;
};

export type AppData = {
  candidate: CandidateProfile;
  coverLetter: CoverLetter;
};
