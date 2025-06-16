
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}



// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
 

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   private publicRoutes = ['/auth/login', '/auth/signup', '/doc', '/'];

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest<Request>();

//     if (!request.headers.authorization) {
//              request.headers.authorization = `Bearer ${process.env.TEST_ACCESS_TOKEN}`;
// }

//     if (this.publicRoutes.includes(request.path)) {
//       return true;
//     }

//     if (this.isPublicRoute(request.path)) {
//       return true;
//     }

 

//     if (!request.headers.authorization.startsWith('Bearer ')) {
//       throw new UnauthorizedException(
//         'Authorization must follow Bearer scheme',
//       );
//     }

//     const token = this.extractTokenFromHeader(request);

//     if (!token) {
//       throw new UnauthorizedException('Authorization token is missing');
//     }

//     try {
//       await this.jwtService.verifyAsync(token, {
//         secret: process.env.JWT_SECRET_KEY,
//       });
  
//     } catch (error) {
//       throw new UnauthorizedException('Invalid or expired token');
//     }

//     return true;

//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];

//     console.log('token ', token);
//     console.log(type);
//     return type === 'Bearer' ? token : undefined;
//   }
//   private isPublicRoute(path: string): boolean {
//     return this.publicRoutes.includes(path);
//   }
// }
