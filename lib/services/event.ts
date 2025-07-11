import { Event } from '@/lib/types/event'
import { fetchFromAPI } from '../utils/api'
import { getMedia } from './media'

export const getUpcomingEvents = async ({ page = 1, limit = 10, q = '' } = {}): Promise<{ data: Event[]; meta: any }> => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (q) params.append('q', q)
  const res = await fetchFromAPI<{ data: Event[]; meta: any }>(`/api/events?${params.toString()}`)
  return res?.data && Array.isArray(res.data) && res.meta ? res : { data: [], meta: { total: 0, page, pages: 1, limit } }
}

export async function fetchEventById(id: string): Promise<Event> {
  const response = await fetch(`/api/events/${id}`)
  if (!response.ok) throw new Error('Failed to fetch event')
  return await response.json()
} 

export const getEventsWithImages = async (): Promise<Event[]> => {
  try {
    const { data: events } = (await getUpcomingEvents()) ?? { data: [] };
    const { data: media } = (await getMedia({ folder: "events" })) ?? { data: [] };

    const eventsWithImages = events?.map?.(event => {
      const eventMedia = media?.find?.(m => m.url === event.imageUrl && m.folder === "events");
      return {
        ...event,
        imageUrl: eventMedia?.url || event.imageUrl
      };
    }) ?? [];

    return eventsWithImages;
  } catch (error) {
    console.error("Failed to fetch events with images:", error);
    return [];
  }
}