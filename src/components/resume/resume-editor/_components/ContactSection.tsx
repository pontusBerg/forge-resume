import { FormField } from "@/components/resume/FormField";
import { SectionTitle } from "@/components/resume/SectionTitle";
import { Input } from "@/components/ui/input";

type CandidateTextField = "name" | "headline" | "email" | "phone" | "location";

type ContactSectionProps = {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  onFieldChange: (field: CandidateTextField, value: string) => void;
};

export function ContactSection({
  name,
  headline,
  email,
  phone,
  location,
  onFieldChange,
}: ContactSectionProps) {
  return (
    <section className="grid gap-5">
      <SectionTitle title="Contact" />
      <div className="grid gap-4">
        <FormField id="candidate-name" label="Name">
          <Input
            id="candidate-name"
            value={name}
            onChange={(event) => onFieldChange("name", event.target.value)}
          />
        </FormField>
        <FormField id="candidate-headline" label="Headline">
          <Input
            id="candidate-headline"
            value={headline}
            onChange={(event) => onFieldChange("headline", event.target.value)}
          />
        </FormField>
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField id="candidate-email" label="Email">
            <Input
              id="candidate-email"
              type="email"
              value={email}
              onChange={(event) => onFieldChange("email", event.target.value)}
            />
          </FormField>
          <FormField id="candidate-phone" label="Phone">
            <Input
              id="candidate-phone"
              value={phone}
              onChange={(event) => onFieldChange("phone", event.target.value)}
            />
          </FormField>
          <FormField id="candidate-location" label="Location">
            <Input
              id="candidate-location"
              value={location}
              onChange={(event) => onFieldChange("location", event.target.value)}
            />
          </FormField>
        </div>
      </div>
    </section>
  );
}
