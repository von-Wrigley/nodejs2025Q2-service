import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ProxyTestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.path.startsWith('/auth') && !req.headers.authorization) {
      req.headers.authorization = `Bearer ${process.env.TEST_ACCESS_TOKEN}`;
    }
    next();
  }
}
