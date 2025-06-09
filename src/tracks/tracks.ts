// export const tracks = [
//   {
//     id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb1d', // uuid v4
//     name: 'Poker Face',
//     artistId: null, // refers to Artist
//     albumId: null, // refers to Album
//     duration: 213, // integer number
//   },
//   {
//     id: '2b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', // uuid v4
//     name: '22',
//     artistId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', // refers to Artist
//     albumId: null, // refers to Album
//     duration: 213, // integer number
//   },
// ];

export interface trackstype {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
