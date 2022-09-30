import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class ApiLoggerService extends ConsoleLogger {
  log(message: any): void {
    super.log.apply(this, [message]);
  }

  error(message: any, stack?: string, context?: string): void {
    const errorData = [message];
    if (stack) errorData.push(stack);
    if (context) errorData.push(context);

    super.error.apply(this, errorData);
  }

  warn(message: any): void {
    super.warn.apply(this, [message]);
  }

  debug(message: any): void {
    super.debug.apply(this, [message]);
  }

  verbose(message: any): void {
    super.verbose.apply(this, [message]);
  }
}
