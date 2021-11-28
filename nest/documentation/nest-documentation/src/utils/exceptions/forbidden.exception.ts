import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    // 메시지만 재정의
    // super('Forbidden', HttpStatus.FORBIDDEN)
    // 응답 전체를 재정의
    super(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
