import { useState, useMemo } from "react";

export function usePaginationFilter<T>(
  data: T[],
  options: {
    pageSize?: number;
    searchValue?: string;
    filterFn?: (item: T, search: string) => boolean;
    extraFilters?: Record<string, any>;
    extraFilterFn?: (item: T, filters: Record<string, any>) => boolean;
  } = {}
) {
  const [page, setPage] = useState(1);
  const pageSize = options.pageSize ?? 10;

  // Filtering
  const filtered = useMemo(() => {
    let result = data;
    if (options.searchValue && options.filterFn) {
      result = result.filter(item => options.filterFn!(item, options.searchValue!));
    }
    if (options.extraFilters && options.extraFilterFn) {
      result = result.filter(item => options.extraFilterFn!(item, options.extraFilters!));
    }
    return result;
  }, [data, options.searchValue, options.filterFn, options.extraFilters, options.extraFilterFn]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize]
  );

  return {
    page,
    setPage,
    pageSize,
    totalPages,
    filtered,
    paginated,
  };
} 