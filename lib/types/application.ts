export interface Application {
  _id?: string;
  type: 'orphan_marriage' | 'education' | 'healthcare' | 'self_earning' | 'food' | 'other';
  name: string;
  cnic: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  reviewedAt?: string;
  createdAt?: string;
  updatedAt?: string;
} 