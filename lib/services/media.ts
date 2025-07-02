import { Media } from '@/lib/types/media'

export async function fetchMedia(folder: string = 'general'): Promise<Media[]> {
  const response = await fetch(`/api/media?folder=${folder}`)
  if (!response.ok) throw new Error('Failed to fetch media')
  const data = await response.json()
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