import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
  new (...args: any[]): any;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

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
