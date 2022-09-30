import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpBadRequestException extends HttpException {
  constructor(specificMessage?: string, data?: any) {
    const status = HttpStatus.BAD_REQUEST;
    const message = specificMessage ? specificMessage : 'Falha na requisição!';

    super({ status, message, data }, status);
  }
}
