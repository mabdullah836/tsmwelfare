export interface VolunteerFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  occupation: string
  availability: string
  interests: string[]
  skills: string
  experience: string
  motivation: string
  references: string
}

export interface VolunteerResponse {
  id: string
  createdAt: Date
  status: string
  email: string
}

export interface ApiResponse {
  success: boolean
  message: string
  data?: any
}

export type VolunteerStatus = 'pending' | 'approved' | 'rejected'
export type AvailabilityType = 'weekdays' | 'weekends' | 'evenings' | 'flexible'

export interface VolunteerProgram {
  id: string
  title: string
  description: string
  requirements?: string
  startDate?: Date
  endDate?: Date
  status: 'active' | 'completed' | 'cancelled'
  maxVolunteers?: number
  location?: string
} 