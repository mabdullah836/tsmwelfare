import { StaticImageData } from 'next/image';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface TestimonialProps {
  name: string;
  role?: string;
  content: string;
  image?: string | StaticImageData;
}

export interface DonationRecord {
  id: string;
  amount: number;
  date: string;
  donor: string;
  category: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  image?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
}

export interface ImpactStatProps {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  title?: string;
  description?: string;
  uploadedAt: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
  }[];
} 