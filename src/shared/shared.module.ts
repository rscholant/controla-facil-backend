import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from '@shared/interceptors/logger.interceptor';
import { ApiLoggerService } from '@shared/logger/logger.service';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from '@modules/auth/jwt.strategy';
import { UsersModule } from '@modules/users/users.module';

@Global()
@Module({
  imports: [HttpModule, UsersModule],
  providers: [
    ApiLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    JwtStrategy,
  ],
  exports: [ApiLoggerService],
})
export class SharedModule {}
