import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpUnauthorizedException extends HttpException {
  constructor(specificMessage?: string, data?: any) {
    const status = HttpStatus.UNAUTHORIZED;
    const message = specificMessage
      ? specificMessage
      : 'Falha na autenticação!';

    super({ status, message, data }, status);
  }
}
