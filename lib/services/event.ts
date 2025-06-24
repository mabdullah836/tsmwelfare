import { Event } from '@/lib/types/event'

export async function fetchEvents(): Promise<Event[]> {
  const response = await fetch('/api/events')
  if (!response.ok) throw new Error('Failed to fetch events')
  return await response.json()
}

export async function fetchEventById(id: string): Promise<Event> {
  const response = await fetch(`/api/events/${id}`)
  if (!response.ok) throw new Error('Failed to fetch event')
  return await response.json()
} 