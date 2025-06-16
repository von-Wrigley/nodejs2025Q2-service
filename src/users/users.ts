export const users = [
  {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    login: 'string',
    password: 'string',
    version: 1, // integer number, increments on update
    createdAt: 2025, // timestamp of creation
    updatedAt: 2025, // timestamp of last update
  },
  {
    id: '6b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    login: 'string2',
    password: 'string2',
    version: 1, // integer number, increments on update
    createdAt: 20225, // timestamp of creation
    updatedAt: 20225, // timestamp of last update
  },
];

export interface Userstype {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
