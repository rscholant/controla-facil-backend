import { UseInterceptors } from '@nestjs/common';
import { SerializerInterceptor } from '@shared/interceptors';

interface ClassConstructor {
  new (...args: any[]): any;
}
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}
