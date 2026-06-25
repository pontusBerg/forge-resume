import type {
  CandidateProfile,
  Education,
  Experience,
  ResumeLink,
  SkillGroup,
} from "@/lib/resume-types";

import { Card, CardContent } from "@/components/ui/card";

import { ContactSection } from "./_components/ContactSection";
import { CountryGuidance } from "./_components/CountryGuidance";
import { EducationSection } from "./_components/EducationSection";
import { ExperienceSection } from "./_components/ExperienceSection";
import { LinksSection } from "./_components/LinksSection";
import { ProfileImageSection } from "./_components/ProfileImageSection";
import { SkillsSection } from "./_components/SkillsSection";
import { SummarySection } from "./_components/SummarySection";
import { makeId } from "./_components/utils";
import type { SupportedResumeCountry } from "@/lib/resume-countries";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ResumeEditorProps = {
  candidate: CandidateProfile;
  onChange: (candidate: CandidateProfile) => void;
  selectedCountry: SupportedResumeCountry
  onCountryChange: (country: SupportedResumeCountry) => void;
};

type CandidateTextField = "name" | "headline" | "email" | "phone" | "location" | "summary";

export function ResumeEditor({ candidate, onChange, onCountryChange, selectedCountry }: ResumeEditorProps) {
  const updateField = (field: CandidateTextField, value: string) => {
    onChange({
      ...candidate,
      [field]: value,
    });
  };

  const updatePhoto = (photo: CandidateProfile["photo"]) => {
    onChange({
      ...candidate,
      photo,
    });
  };

  const updateIncludeSummary = (includeSummary: boolean) => {
    onChange({
      ...candidate,
      includeSummary,
    });
  };

  const updateIncludeEducation = (includeEducation: boolean) => {
    onChange({
      ...candidate,
      includeEducation,
    });
  };

  const updateLink = (linkId: string, nextLink: ResumeLink) => {
    onChange({
      ...candidate,
      links: candidate.links.map((link) => (link.id === linkId ? nextLink : link)),
    });
  };

  const addLink = () => {
    onChange({
      ...candidate,
      links: [
        ...candidate.links,
        {
          id: makeId("link"),
          label: "Website",
          url: "",
        },
      ],
    });
  };

  const removeLink = (linkId: string) => {
    onChange({
      ...candidate,
      links: candidate.links.filter((link) => link.id !== linkId),
    });
  };

  const updateExperience = (experienceId: string, nextExperience: Experience) => {
    onChange({
      ...candidate,
      experience: candidate.experience.map((experience) =>
        experience.id === experienceId ? nextExperience : experience,
      ),
    });
  };

  const addExperience = () => {
    onChange({
      ...candidate,
      experience: [
        ...candidate.experience,
        {
          id: makeId("exp"),
          role: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          bullets: [""],
        },
      ],
    });
  };

  const removeExperience = (experienceId: string) => {
    onChange({
      ...candidate,
      experience: candidate.experience.filter((experience) => experience.id !== experienceId),
    });
  };

  const updateEducation = (educationId: string, nextEducation: Education) => {
    onChange({
      ...candidate,
      education: candidate.education.map((education) =>
        education.id === educationId ? nextEducation : education,
      ),
    });
  };

  const addEducation = () => {
    onChange({
      ...candidate,
      education: [
        ...candidate.education,
        {
          id: makeId("edu"),
          school: "",
          degree: "",
          location: "",
          startDate: "",
          endDate: "",
          details: "",
        },
      ],
    });
  };

  const removeEducation = (educationId: string) => {
    onChange({
      ...candidate,
      education: candidate.education.filter((education) => education.id !== educationId),
    });
  };

  const updateSkillGroup = (groupId: string, nextGroup: SkillGroup) => {
    onChange({
      ...candidate,
      skillGroups: candidate.skillGroups.map((group) => (group.id === groupId ? nextGroup : group)),
    });
  };

  const addSkillGroup = () => {
    onChange({
      ...candidate,
      skillGroups: [
        ...candidate.skillGroups,
        {
          id: makeId("skills"),
          name: "New group",
          skills: [],
        },
      ],
    });
  };

  const removeSkillGroup = (groupId: string) => {
    onChange({
      ...candidate,
      skillGroups: candidate.skillGroups.filter((group) => group.id !== groupId),
    });
  };

  return (
    <Card className="min-h-full max-w-2xl overflow-visible rounded-none border-0 border-r border-border shadow-none ring-0">
      <CardContent className="grid gap-10 px-6 py-8">
        <section className="grid gap-4">
          <div className="grid gap-2">
            <p className="text-sm font-medium">Target country</p>
            <RadioGroup
              value={selectedCountry}
              onValueChange={(value) => onCountryChange(value as SupportedResumeCountry)}
              className="flex gap-4"
            >
              <Label className="flex items-center gap-2 text-sm font-normal">
                <RadioGroupItem value="sweden" />
                Sweden
              </Label>
              <Label className="flex items-center gap-2 text-sm font-normal">
                <RadioGroupItem value="austria" />
                Austria
              </Label>
            </RadioGroup>
          </div>
          <CountryGuidance country={selectedCountry} />
        </section>
        <ContactSection
          name={candidate.name}
          headline={candidate.headline}
          email={candidate.email}
          phone={candidate.phone}
          location={candidate.location}
          onFieldChange={updateField}
        />

        <ProfileImageSection
          name={candidate.name}
          photo={candidate.photo}
          onPhotoChange={updatePhoto}
        />

        <SummarySection
          summary={candidate.summary}
          includeSummary={candidate.includeSummary}
          onSummaryChange={(summary) => updateField("summary", summary)}
          onIncludeSummaryChange={updateIncludeSummary}
        />

        <LinksSection
          links={candidate.links}
          onLinkChange={updateLink}
          onAddLink={addLink}
          onRemoveLink={removeLink}
        />

        <ExperienceSection
          experience={candidate.experience}
          onExperienceChange={updateExperience}
          onAddExperience={addExperience}
          onRemoveExperience={removeExperience}
        />

        <EducationSection
          education={candidate.education}
          includeEducation={candidate.includeEducation}
          onEducationChange={updateEducation}
          onIncludeEducationChange={updateIncludeEducation}
          onAddEducation={addEducation}
          onRemoveEducation={removeEducation}
        />

        <SkillsSection
          skillGroups={candidate.skillGroups}
          onSkillGroupChange={updateSkillGroup}
          onAddSkillGroup={addSkillGroup}
          onRemoveSkillGroup={removeSkillGroup}
        />
      </CardContent>
    </Card>
  );
}
