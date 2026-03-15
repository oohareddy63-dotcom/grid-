/**
 * Gallery Component
 * Photo gallery with search, favourites, and responsive grid layout.
 */

import { useReducer, useMemo, useState, useCallback } from 'react';
import { useFetchPhotos } from '@/hooks/useFetchPhotos';
import { favouritesReducer, initialState } from '@/reducer/favouritesReducer';
import PhotoCard from './PhotoCard';

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();
  const [favourites, dispatch] = useReducer(favouritesReducer, initialState);
  const [searchQuery, setSearchQuery] = useState('');

  // useMemo for filtered photos
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [photos, searchQuery]);

  // useCallback for search handler
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  // useCallback for favourite toggle
  const toggleFavourite = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: id });
  }, []);

  // Loading state with spinner
  if (loading)
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Loading gallery
        </p>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="mx-auto max-w-sm rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Header with search */}
      <div className="sticky top-0 z-10 -mx-6 px-6 bg-white/90 py-8 backdrop-blur-xl border-b border-gray-200">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Photo Gallery
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
                {filteredPhotos.length} photographs
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full max-w-xs">
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by author..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 py-2.5 text-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/5 placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Responsive Grid */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={i}
              isFavourite={favourites.includes(photo.id)}
              onToggle={toggleFavourite}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-24 text-gray-500">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-sm">
            No results for "<span className="font-medium text-gray-900">{searchQuery}</span>"
          </p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
