export interface DonationRecord {
  _id: string;
  amount: number;
  type: string;
  donor: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  message?: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
  createdAt: string;
}