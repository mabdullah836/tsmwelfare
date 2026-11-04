export interface VolunteerFormData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  occupation?: string;
  availability?: string;
  interests?: string[];
  skills?: string;
  experience?: string;
  motivation?: string;
  references?: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: string | Date;
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

export interface VolunteerResponse {
  id: string;
  createdAt: Date;
  status: string;
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export type VolunteerStatus = 'pending' | 'approved' | 'rejected';
export type AvailabilityType = 'weekdays' | 'weekends' | 'evenings' | 'flexible';
