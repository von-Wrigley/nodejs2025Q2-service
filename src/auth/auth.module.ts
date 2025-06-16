import { Module } from '@nestjs/common';
import { LoggingService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.str';
 
 

@Module({
  controllers: [AuthController],
  providers: [LoggingService, JwtStrategy],
  exports: [JwtModule, JwtStrategy],
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: `${process.env.TOKEN_EXPIRE_TIME}s` },
      }),
    }),
  ],
})
export class AuthModule {}
