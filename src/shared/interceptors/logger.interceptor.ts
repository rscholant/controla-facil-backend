import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiLoggerService } from '@shared/logger/logger.service';

import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: ApiLoggerService) {
    this.logger.setContext(LoggerInterceptor.name);
  }

  private success(context: ExecutionContext, now: number): void {
    const { url, method, body } = context.getArgByIndex(0);
    const { name } = context.getClass();
    const dataToStringfy = JSON.stringify(
      Object.fromEntries(
        Object.entries(body).map((m) => {
          if (m[0] === 'password') return [m[0], '*****'];
          return m;
        }),
      ),
    );
    const diff = Date.now() - now;
    this.logger.log(
      `[${method} ${url}] (${name}) - requestData: ${JSON.stringify(
        dataToStringfy,
      )} - ${diff}ms`,
    );
  }

  private error(
    context: ExecutionContext,
    now: number,
    error: any,
  ): Observable<any> {
    const { url, method, body } = context.getArgByIndex(0);
    const { name } = context.getClass();
    const diff = Date.now() - now;
    this.logger.error(
      `[${method} ${url}] (${name}) - requestData: ${JSON.stringify(
        Object.fromEntries(
          Object.entries(body).map((m) => {
            if (m[0] === 'password') return [m[0], '*****'];
            return m;
          }),
        ),
      )}, errorData: ${JSON.stringify(error)} - ${diff}s`,
    );

    return throwError(() => error);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => this.success(context, now)),
      catchError((error) => this.error(context, now, error)),
    );
  }
}
