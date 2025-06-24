import { Application } from '@/lib/types/application'

export async function fetchApplications(): Promise<Application[]> {
  const response = await fetch('/api/applications')
  if (!response.ok) throw new Error('Failed to fetch applications')
  return await response.json()
}

export async function updateApplicationStatus(applicationId: string, newStatus: 'pending' | 'approved' | 'rejected'): Promise<void> {
  const response = await fetch(`/api/applications/${applicationId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  })
  if (!response.ok) throw new Error('Failed to update application status')
} 