import { VolunteerFormData } from "../types/volunteer"
import { fetchFromAPI } from "../utils/api"

export const getVolunteers = async ({ page = 1, limit = 10, q = '' } = {}): Promise<{ data: VolunteerFormData[]; meta: any }> => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (q) params.append('q', q)
  const res = await fetchFromAPI<{ data: VolunteerFormData[]; meta: any }>(`/api/volunteer?${params.toString()}`)
  return res?.data && Array.isArray(res.data) && res.meta ? res : { data: [], meta: { total: 0, page, pages: 0, limit } }
}