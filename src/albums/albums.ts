export const albums = [
  {
    id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
    name: 'Red',
    year: 2020,
    artistId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  },
];

export interface AlbumType {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
