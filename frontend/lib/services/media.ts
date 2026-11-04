import { Media } from '@/lib/types/media'

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

export async function uploadVideoByUrl({ videoUrl, thumbnail, title, tag, folder = 'general' }: {
  videoUrl: string;
  thumbnail: string;
  title?: string;
  tag?: string;
  folder?: string;
}): Promise<Media[]> {
  const formData = new FormData();
  formData.append('videoUrl', videoUrl);
  formData.append('thumbnail', thumbnail);
  if (title) formData.append('title', title);
  formData.append('folder', folder);
  if (tag) formData.append('tag', tag);
  const response = await fetch('/api/media/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to add video');
  return await response.json();
}

export async function uploadThumbnail(file: File): Promise<string> {
  const uploaded = await uploadMedia([file], 'thumbnails');
  return uploaded[0]?.url || '';
} 