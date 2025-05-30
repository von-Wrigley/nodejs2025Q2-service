// import {
//   HttpException,
//   HttpStatus,
//   Injectable,
//   // NotFoundException,
// } from '@nestjs/common';
// import { validate as uuidValidate } from 'uuid';

// @Injectable()
// export class UsersService {
//   private tasks = [
//     {
//       id: 1,
//       name: 'Title 1',
//     },
//     {
//       id: 2,
//       name: 'Title 2',
//     },
//   ];
//   findAll() {
//     return this.tasks;
//   }

//   findById(id: number) {
//     if (!uuidValidate(id.toString())) {
//       throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
//     }
//     const x = this.tasks.find((task) => task.id === id);

//     if (!x) {
//       // throw new NotFoundException('NOT_FOUND')
//       throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
//     }
//     return x;
//   }
// }

// npm test -- test/users.e2e.spec.ts
// npm test -- test/artists.e2e.spec.ts
// npm test -- test/albums.e2e.spec.ts
// npm test -- test/favorites.e2e.spec.ts
// npm test -- test/tracks.e2e.spec.ts
