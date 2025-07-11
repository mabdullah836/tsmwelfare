import { Application } from "../types/application"
import { fetchFromAPI } from "../utils/api"

export const getApplications = async ({ page = 1, limit = 10, q = '' } = {}): Promise<{ data: Application[]; meta: any }> => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (q) params.append('q', q)
  const res = await fetchFromAPI<{ data: Application[]; meta: any }>(`/api/applications?${params.toString()}`)
  return res?.data && Array.isArray(res.data) && res.meta ? res : { data: [], meta: { total: 0, page, pages: 0, limit } }
}

export async function updateApplicationStatus(applicationId: string, newStatus: 'pending' | 'approved' | 'rejected'): Promise<void> {
  const response = await fetch(`/api/applications/${applicationId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  })
  if (!response.ok) throw new Error('Failed to update application status')
} 