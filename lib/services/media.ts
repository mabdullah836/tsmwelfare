import { Media } from '@/lib/types/media'
import { fetchFromAPI } from '../utils/api'


export const getMedia = async (folder: string = 'general'): Promise<Media[]> => {
  const data = await fetchFromAPI<Media[]>(`/api/media?folder=${folder}`)
  return Array.isArray(data) ? data : []
}

export async function uploadMedia(files: File[], folder: string = 'events'): Promise<Media[]> {
  const formData = new FormData()
  files.forEach(file => formData.append('files', file))
  formData.append('folder', folder)
  const response = await fetch('/api/media/upload', {
    method: 'POST',
    body: formData,
  })
  if (!response.ok) throw new Error('Failed to upload files')
  return await response.json()
}

export async function deleteMedia(id: string): Promise<void> {
  const response = await fetch(`/api/media/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Failed to delete media')
} 