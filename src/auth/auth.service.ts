import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/users/userEntity';
import bcrypt from 'bcrypt';

@Injectable()
export class LoggingService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateAuthDto) {
    const { login, password } = dto;
    const newPass = await bcrypt.hash(password, 10);
    // const ehckUser = await this.prismaService.user.findFirst({
    //   where: {
    //     login,
    //   },
    // });
    // if (ehckUser) {
    //   throw new HttpException(
    //     'Login or passwword problem',
    //     HttpStatus.FORBIDDEN,
    //   );
    // }

    const user = await this.prismaService.user.create({
      data: {
        login,
        password: newPass,
      },
    });
  
    return { id: user.id };
  }

  async log(dto: CreateAuthDto) {
    const { login, password } = dto;

    const user = await this.checkUSer(login, password);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid login or wrong password');
        }

    const payload = {
      userId: user.id,
      login: user.login,
    };
    console.log('dcd  ', payload);
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
         expiresIn: '7d',
      // expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME + 's',
    });
    console.log('accessToken ', accessToken);
    return { accessToken, refreshToken };
  }

  private async checkUSer(login: string, password: string) {
    const findUser = await this.prismaService.user.findFirst({
      where: {
        login,
      },
    });
    console.log('user ', findUser);
    if (!findUser) {
      throw new HttpException(
        'Login or passwword problem',
        HttpStatus.FORBIDDEN,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      throw new HttpException(
        'Login or passwword problem',
        HttpStatus.FORBIDDEN,
      );
    }

    return findUser;
  }
}
