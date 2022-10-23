import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpPartialException extends HttpException {
  constructor(specificMessage?: string, data?: any) {
    const status = HttpStatus.PARTIAL_CONTENT;
    const message = specificMessage ? specificMessage : 'Falha na requisição!';

    super({ status, message, data }, status);
  }
}
