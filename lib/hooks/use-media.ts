import { useState, useCallback } from 'react';
import { MediaItem } from '../types/components';
import { API_ENDPOINTS } from '../constants/app';

interface UseMediaReturn {
  media: MediaItem[];
  isLoading: boolean;
  error: Error | null;
  uploadMedia: (file: File) => Promise<MediaItem>;
  deleteMedia: (id: string) => Promise<void>;
  fetchMedia: () => Promise<void>;
}

export const useMedia = (): UseMediaReturn => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMedia = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINTS.media);
      if (!response.ok) throw new Error('Failed to fetch media');
      
      const data = await response.json();
      setMedia(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const uploadMedia = async (file: File): Promise<MediaItem> => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(API_ENDPOINTS.media, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload media');
      
      const newMedia = await response.json();
      setMedia(prev => [...prev, newMedia]);
      setError(null);
      return newMedia;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to upload media'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMedia = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_ENDPOINTS.media}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete media');
      
      setMedia(prev => prev.filter(item => item.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete media'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    media,
    isLoading,
    error,
    uploadMedia,
    deleteMedia,
    fetchMedia,
  };
}; 