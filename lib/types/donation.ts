export interface DonationRecord {
    id: string;
    amount: number;
    date: string;
    donor: string;
    category: string;
    status: 'pending' | 'completed' | 'failed';
    paymentMethod: 'cash' | 'bank' | 'online' | 'other';
    email?: string;
    message?: string;
  }