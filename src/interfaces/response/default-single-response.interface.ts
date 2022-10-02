import { HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class DefaultSingleResponse<T> {
  @ApiResponseProperty({
    example: HttpStatus.CREATED,
  })
  status: HttpStatus;
  @ApiResponseProperty({
    example: 'Mensagem exemplo',
  })
  message: string;
  @ApiResponseProperty({
    example: {},
  })
  data: T | T[];
}
