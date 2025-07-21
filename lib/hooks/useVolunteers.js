import useSWR from 'swr';
import fetcher from '../fetcher';

export function useVolunteers({ page = 1, limit = 10, q = '' } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (q) params.append('q', q);
  const key = `/api/volunteer?${params.toString()}`;
  const { data, error, isLoading, mutate } = useSWR(key, fetcher);
  return {
    volunteers: data?.data || [],
    meta: data?.meta || { total: 0, page: 1, pages: 1, limit },
    isLoading,
    isError: error,
    mutate,
  };
} 