import { PingResponse } from '@interfaces/ping-response.interface';
import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class AppService {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: MongooseHealthIndicator,
  ) {}
  async ping(): Promise<Partial<PingResponse>> {
    const health = await this.health.check([
      () => this.db.pingCheck('mongo', { timeout: 5000 }),
    ]);
    return { message: 'pong', health };
  }
}
