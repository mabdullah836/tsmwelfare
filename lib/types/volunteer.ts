export interface VolunteerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  occupation: string;
  availability: string;
  interests: string[];
  skills: string;
  experience: string;
  motivation: string;
  references: string;
}

export interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface AvailabilityOption {
  value: string;
  label: string;
} 