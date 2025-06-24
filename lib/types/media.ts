export interface Media {
  _id?: string;
  name: string;
  title: string;
  description?: string;
  type: 'image' | 'video';
  url: string;
  publicId: string;
  size: string;
  folder?: 'events' | 'team-members' | 'general';
  createdAt?: string;
  updatedAt?: string;
} 