import { VolunteerFormData } from "../types/volunteer"
import { fetchFromAPI } from "../utils/api"

export const getVolunteers = async (): Promise<VolunteerFormData[]> => {
    const data = await fetchFromAPI<VolunteerFormData[]>('/api/volunteer')
    return data ?? []
  }