import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

export class SerializerInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((response: any) => {
        let data: any;
        if (!response) return;
        const { data: list } = response;
        if (list) {
          data = list;
          return {
            ...response,
            data: plainToInstance(this.dto, data, {
              excludeExtraneousValues: true,
              enableCircularCheck: true,
            }),
          };
        }
        return plainToInstance(this.dto, response, {
          excludeExtraneousValues: true,
          enableCircularCheck: true,
        });
      }),
    );
  }
}
