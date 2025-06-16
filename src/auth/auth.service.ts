import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/users/userEntity';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: CreateAuthDto) {
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

  async login(dto: CreateAuthDto) {
    const { login, password } = dto;

    const user = await this.checkUSer(login, password);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid login or wrong password');
    }

    return  this.generateTokens(user)
  }
  async refresh(dto:string ){

          try {
            const payload = await this.jwtService.verifyAsync(dto, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const user = await this.prismaService.user.findFirst({
                where: { id: payload.userId, login: payload.login },
            });

            if (!user) throw new UnauthorizedException();

            return this.generateTokens(user);
        } catch (e) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }

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

  private async generateTokens(user: any){
     const payload = {
      userId: user.id,
      login: user.login,
    };
    console.log('dcd  ', payload);
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '30m',
      // expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME + 's',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: '7d',
      // expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME + 's',
    });
    console.log('accessToken ', accessToken);
    return { accessToken, refreshToken };
  }
}
