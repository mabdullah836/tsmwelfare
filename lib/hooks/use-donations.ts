import { useState, useEffect } from 'react';
import { DonationRecord } from '../types/components';
import { API_ENDPOINTS } from '../constants/app';

interface UseDonationsOptions {
  limit?: number;
  category?: string;
}

interface UseDonationsReturn {
  donations: DonationRecord[];
  isLoading: boolean;
  error: Error | null;
  totalAmount: number;
  fetchDonations: () => Promise<void>;
}

export const useDonations = ({ limit, category }: UseDonationsOptions = {}): UseDonationsReturn => {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDonations = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (limit) params.append('limit', limit.toString());
      if (category) params.append('category', category);

      const response = await fetch(`${API_ENDPOINTS.donations}?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch donations');

      const data = await response.json();
      setDonations(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [limit, category]);

  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return {
    donations,
    isLoading,
    error,
    totalAmount,
    fetchDonations,
  };
}; 