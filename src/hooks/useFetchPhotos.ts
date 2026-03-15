/**
 * Custom Hook: useFetchPhotos
 * Fetches photos from Picsum API with loading and error states.
 */

import { useState, useEffect } from 'react';

export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export function useFetchPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://picsum.photos/v2/list?limit=30');
        if (!response.ok) throw new Error('Failed to fetch photos');
        const data: Photo[] = await response.json();
        // All photos use same size for uniform cards but different images
        const enhanced = data.map((photo, index) => ({
          ...photo,
          download_url: `https://picsum.photos/seed/${photo.id}-${index}/600/750`,
        }));
        setPhotos(enhanced);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
}
