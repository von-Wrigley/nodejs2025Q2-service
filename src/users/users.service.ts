import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { users, Userstype } from './users';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './userEntity';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'generated/prisma_client';

@Injectable()
export class UsersService {
  // users: Userstype[];
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => plainToClass(UserEntity, user));
  }

  async findById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    // const x = users.find((user) => user.id === id);
    const x = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!x) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(UserEntity, x);
  }

  async create(data: Prisma.UserCreateInput): Promise<any> {
    const tS = new Date().getMilliseconds();
    const user = await this.prisma.user.create({
      data: {
        id: uuidv4(),
        login: data.login,
        password: data.password,
        version: 1,
        createdAt: tS,
        updatedAt: tS,
      },
    });
    return plainToClass(UserEntity, user);
  }

  async update(id: string, dto: UpdatePasswordDto): Promise<UserEntity> {
    const tS = new Date().getMilliseconds();
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== dto.oldPassword) {
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: dto.newPassword,
        version: { increment: 1 },
      },
    });
    return plainToClass(UserEntity, updatedUser);
  }

  async delete(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }

    const userFound = users.find((user) => user.id === id);
    if (!userFound) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    // const userIndex = users.findIndex((user) => user.id === id);
    // users.splice(userIndex, 1);
    // return true;
    return this.prisma.user.delete({ where: { id } });
  }
}
