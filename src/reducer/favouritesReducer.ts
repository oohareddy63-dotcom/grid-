/**
 * Favourites Reducer
 * Manages list of favourited photo IDs using useReducer pattern.
 * Persists state to localStorage for cross-session persistence.
 */

type FavouritesAction = { type: 'TOGGLE_FAVOURITE'; payload: string };

// Load initial state from localStorage, defaulting to empty array
export const initialState: string[] = JSON.parse(
  localStorage.getItem('gallery-favs') || '[]'
);

export function favouritesReducer(
  state: string[],
  action: FavouritesAction
): string[] {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const isFav = state.some((id) => id === action.payload);
      const newState = isFav
        ? state.filter((id) => id !== action.payload)
        : [...state, action.payload];

      // Side-effect: persist to localStorage
      localStorage.setItem('gallery-favs', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}
