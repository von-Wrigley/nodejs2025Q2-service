import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
    return this.usersService.update(id, dto);
  }
  @HttpCode(204)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
