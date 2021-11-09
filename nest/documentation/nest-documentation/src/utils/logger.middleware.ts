import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
