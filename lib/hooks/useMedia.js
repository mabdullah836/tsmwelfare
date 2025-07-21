import useSWR from 'swr';
import fetcher from '../fetcher';

export function useMedia({ page = 1, limit = 12, q = '', folder = 'general' } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit), folder });
  if (q) params.append('q', q);
  const key = `/api/media?${params.toString()}`;
  const { data, error, isLoading, mutate } = useSWR(key, fetcher);
  return {
    media: data?.data || [],
    meta: data?.meta || { total: 0, page: 1, pages: 1, limit },
    isLoading,
    isError: error,
    mutate,
  };
} 