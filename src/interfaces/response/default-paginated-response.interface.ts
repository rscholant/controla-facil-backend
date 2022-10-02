import { ApiResponseProperty } from '@nestjs/swagger';

export class DefaultPaginatedResponse<T> {
  @ApiResponseProperty({
    example: [{}],
  })
  data: T[];

  @ApiResponseProperty({
    example: {},
  })
  additional?: object;

  @ApiResponseProperty({
    example: 1,
  })
  page: number;

  @ApiResponseProperty({
    example: 1,
  })
  count: number;
}
