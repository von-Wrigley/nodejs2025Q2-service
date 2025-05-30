// import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
// import { UsersService } from './users.service';

// @Controller('user')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @HttpCode(HttpStatus.OK)
//   @Get()
//   findAll() {
//     return this.usersService.findAll();
//   }

//   @Get(':id')
//   findById(@Param('id') id: string) {
//     return this.usersService.findById(+id);
//   }
// }
