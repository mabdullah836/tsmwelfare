import { Application } from "../types/application"
import { fetchFromAPI } from "../utils/api"

export const getApplications = async (): Promise<Application[]> => {
  const data = await fetchFromAPI<Application[]>('/api/applications')
  return data ?? []
}

export async function updateApplicationStatus(applicationId: string, newStatus: 'pending' | 'approved' | 'rejected'): Promise<void> {
  const response = await fetch(`/api/applications/${applicationId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  })
  if (!response.ok) throw new Error('Failed to update application status')
} 