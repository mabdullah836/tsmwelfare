export interface Event {
  _id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt?: string;
  updatedAt?: string;
} 