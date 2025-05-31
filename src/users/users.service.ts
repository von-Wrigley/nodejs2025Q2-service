import {
  HttpException,
  HttpStatus,
  Injectable,
  // NotFoundException,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { users } from './users';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';

@Injectable()
export class UsersService {
  findAll() {
    return users;
  }

  findById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }
    const x = users.find((user) => user.id === id);

    if (!x) {
      // throw new NotFoundException('NOT_FOUND')
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return x;
  }

  create(dto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 0,
      createdAt: 222,
      updatedAt: 22,
    };

    users.push(newUser);
    return newUser;
  }
  update(id: string, dto: UpdatePasswordDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }

    const user = this.findById(id);

    if (!user) {
      // throw new NotFoundException('NOT_FOUND')
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== dto.oldPassword) {
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
    }

    user.password = dto.newPassword;
    return user;
  }

  delete(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
    }

    const user = this.findById(id);
    if (!user) {
      // throw new NotFoundException('NOT_FOUND')
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    users.filter((us) => us.id !== user.id);
    return true;
  }
}

// npm test -- test/users.e2e.spec.ts
// npm test -- test/artists.e2e.spec.ts
// npm test -- test/albums.e2e.spec.ts
// npm test -- test/favorites.e2e.spec.ts
// npm test -- test/tracks.e2e.spec.ts
