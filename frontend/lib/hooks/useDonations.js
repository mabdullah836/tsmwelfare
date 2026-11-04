import useSWR from 'swr';
import fetcher from '../fetcher';

export function useDonations(params = {}) {
  const searchParams = new URLSearchParams(params);
  const key = `/api/donations?${searchParams.toString()}`;
  const { data, error, isLoading, mutate } = useSWR(key, fetcher);
  return {
    donations: data?.data || [],
    meta: data?.meta || { total: 0, page: 1, pages: 1, limit: 10 },
    isLoading,
    isError: error,
    mutate,
    totalAmount: data?.data?.reduce?.((sum, d) => sum + (d.amount || 0), 0) || 0,
  };
} 