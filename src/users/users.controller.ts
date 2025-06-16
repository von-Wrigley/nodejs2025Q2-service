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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { UserEntity } from './userEntity';
import { Prisma } from 'generated/prisma_client';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findById(id);
  }
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(
    @Body() data: Prisma.UserCreateInput,
  ): Promise<CreateUserDto> {
    return this.usersService.create(data);
  }
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UpdatePasswordDto) {
    return this.usersService.update(id, data);
  }
  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
