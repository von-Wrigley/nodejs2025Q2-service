export const favorites = { artists: [], albums: [], tracks: [] };

export interface FavoritesType {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
