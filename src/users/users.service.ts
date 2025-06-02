import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { users, Userstype } from './users';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './userEntity';

@Injectable()
export class UsersService {
  users: Userstype[];
  findAll() {
    return users.map((user) => plainToClass(UserEntity, user));
  }

  findById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const x = users.find((user) => user.id === id);

    if (!x) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(UserEntity, x);
  }

  create(dto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: new Date().getMilliseconds(),
      updatedAt: new Date().getMilliseconds(),
    };

    users.push(newUser);
    return plainToClass(UserEntity, newUser);
  }
  update(id: string, dto: UpdatePasswordDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }

    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== dto.oldPassword) {
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
    }

    user.password = dto.newPassword;
    user.version = user.version + 1;
    user.updatedAt = new Date().getMilliseconds();
    return plainToClass(UserEntity, user);
  }

  delete(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }

    const userFound = users.find((user) => user.id === id);
    if (!userFound) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex, 1);
    return true;
  }
}
