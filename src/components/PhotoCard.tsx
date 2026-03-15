/**
 * PhotoCard Component
 * Each card displays a photo with author name and favourite functionality.
 */

import type { Photo } from '@/hooks/useFetchPhotos';

interface PhotoCardProps {
  photo: Photo;
  isFavourite: boolean;
  onToggle: (id: string) => void;
  index: number;
}

const PhotoCard = ({ photo, isFavourite, onToggle }: PhotoCardProps) => {
  return (
    <div className="group relative flex flex-col gap-3">
      {/* Image container with fixed aspect ratio */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.06] group-hover:brightness-[1.02]"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Heart button */}
        <button
          onClick={() => onToggle(photo.id)}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
            isFavourite
              ? 'bg-red-500 text-white shadow-red-500/30'
              : 'bg-white/80 text-gray-600 opacity-0 group-hover:opacity-100'
          }`}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <svg
            className="h-[18px] w-[18px]"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Author overlay at bottom on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-500 ease-in-out group-hover:translate-y-0">
          <p className="text-sm font-medium text-white drop-shadow-md">
            {photo.author}
          </p>
        </div>
      </div>

      {/* Metadata below image */}
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold tracking-tight text-gray-900">
            {photo.author}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-500">
            ID: {photo.id}
          </span>
        </div>
        {isFavourite && (
          <div className="flex h-6 items-center rounded-full bg-red-100 px-2">
            <svg
              className="h-3 w-3 fill-red-500 text-red-500"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoCard;
