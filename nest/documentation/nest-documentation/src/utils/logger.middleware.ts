import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

export function logger(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log(`Request...`);
  next();
}
