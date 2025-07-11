import { TeamMember } from '@/lib/types/team'
import { fetchFromAPI } from '../utils/api'

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const response = await fetch('/api/team')
  if (!response.ok) throw new Error('Failed to fetch team members')
  return await response.json()
}
export const getTeamMembers = async ({ page = 1, limit = 10, q = '' } = {}): Promise<{ data: TeamMember[]; meta: any }> => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (q) params.append('q', q)
  const res = await fetchFromAPI<{ data: TeamMember[]; meta: any }>(`/api/team?${params.toString()}`)
  return res?.data && Array.isArray(res.data) && res.meta ? res : { data: [], meta: { total: 0, page, pages: 0, limit } }
}

export async function fetchTeamMemberById(id: string): Promise<TeamMember> {
  const response = await fetch(`/api/team/${id}`)
  if (!response.ok) throw new Error('Failed to fetch team member')
  return await response.json()
} 