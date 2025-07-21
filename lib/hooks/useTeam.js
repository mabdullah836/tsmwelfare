import useSWR from 'swr';
import fetcher from '../fetcher';

export function useTeam({ page = 1, limit = 8, q = '' } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (q) params.append('q', q);
  const key = `/api/team?${params.toString()}`;
  const { data, error, isLoading, mutate } = useSWR(key, fetcher);
  return {
    team: data?.data || [],
    meta: data?.meta || { total: 0, page: 1, pages: 1, limit },
    isLoading,
    isError: error,
    mutate,
  };
} 