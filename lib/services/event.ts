import { Event } from '@/lib/types/event'
import { fetchFromAPI } from '../utils/api'
import { getMedia } from './media'

export const getUpcomingEvents = async (): Promise<Event[]> => {
  const data = await fetchFromAPI<Event[]>('/api/events', undefined, 60)
  return data ?? []
}

export async function fetchEventById(id: string): Promise<Event> {
  const response = await fetch(`/api/events/${id}`)
  if (!response.ok) throw new Error('Failed to fetch event')
  return await response.json()
} 

export const getEventsWithImages = async (): Promise<Event[]> => {
  try {
    const events = await getUpcomingEvents()
    const media = await getMedia("events")

    const eventsWithImages = events.map(event => {
      const eventMedia = media.find(m => m.url === event.imageUrl && m.folder === "events")
      return {
        ...event,
        imageUrl: eventMedia?.url || event.imageUrl
      }
    })

    return eventsWithImages
  } catch (error) {
    console.error("Failed to fetch events with images:", error)
    return []
  }
}