import { useState, useEffect } from 'react';
import { DonationRecord } from '../types/components';
import { API_ENDPOINTS } from '../constants/app';

interface UseDonationsOptions {
  limit?: number;
  category?: string;
  paymentMethod?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}

interface UseDonationsReturn {
  donations: DonationRecord[];
  isLoading: boolean;
  error: Error | null;
  totalAmount: number;
  fetchDonations: () => Promise<void>;
  meta: { total: number; page: number; pages: number; limit: number };
}

export const useDonations = ({ limit, category, paymentMethod, minAmount, maxAmount, sortBy, sortOrder, page, status, startDate, endDate }: UseDonationsOptions = {}): UseDonationsReturn => {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [meta, setMeta] = useState({ total: 0, page: page || 1, pages: 1, limit: limit || 10 });

  const fetchDonations = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (limit) params.append('limit', limit.toString());
      if (category) params.append('category', category);
      if (paymentMethod) params.append('paymentMethod', paymentMethod);
      if (minAmount !== undefined) params.append('minAmount', String(minAmount));
      if (maxAmount !== undefined) params.append('maxAmount', String(maxAmount));
      if (sortBy) params.append('sortBy', sortBy);
      if (sortOrder) params.append('sortOrder', sortOrder);
      if (page) params.append('page', String(page));
      if (status) params.append('status', status);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(`${API_ENDPOINTS.donations}?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch donations');

      const data = await response.json();
      setDonations(Array.isArray(data.data) ? data.data : []);
      setMeta(data.meta || { total: 0, page: 1, pages: 1, limit: limit || 10 });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [limit, category, paymentMethod, minAmount, maxAmount, sortBy, sortOrder, page, status, startDate, endDate]);

  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return {
    donations,
    isLoading,
    error,
    totalAmount,
    fetchDonations,
    meta,
  };
}; 