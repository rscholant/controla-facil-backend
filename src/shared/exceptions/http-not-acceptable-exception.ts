import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpNotAcceptableException extends HttpException {
  constructor(specificMessage?: string, data?: any) {
    const status = HttpStatus.NOT_ACCEPTABLE;
    const message = specificMessage ? specificMessage : 'Not acceptable data!';

    super({ status, message, data }, status);
  }
}
