import { ApiResponseProperty } from '@nestjs/swagger';
import { HealthCheckResult } from '@nestjs/terminus';

export class PingResponse {
  @ApiResponseProperty({
    example: 'pong',
  })
  message: 'pong';
  @ApiResponseProperty({
    example: {
      status: 'up',
      info: {
        database: {
          status: 'up',
        },
      },
      error: {},
      details: {},
    },
  })
  health: HealthCheckResult;
}
