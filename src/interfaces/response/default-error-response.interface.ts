import { HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class DefaultErrorResponse {
  @ApiResponseProperty({
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: HttpStatus;
  @ApiResponseProperty({
    example: 'Mensagem exemplo',
  })
  message: string;
  @ApiResponseProperty({
    example: {},
  })
  data: any;
}
