import { TeamMember } from '@/lib/types/team'
import { fetchFromAPI } from '../utils/api'

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const response = await fetch('/api/team')
  if (!response.ok) throw new Error('Failed to fetch team members')
  return await response.json()
}
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const data = await fetchFromAPI<TeamMember[]>('/api/team', undefined, 60)
  return data ?? []
}

export async function fetchTeamMemberById(id: string): Promise<TeamMember> {
  const response = await fetch(`/api/team/${id}`)
  if (!response.ok) throw new Error('Failed to fetch team member')
  return await response.json()
} 