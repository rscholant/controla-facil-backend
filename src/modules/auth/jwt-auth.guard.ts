import { AuthGuard } from '@nestjs/passport';

import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpUnauthorizedException } from '@shared/exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info: Error, context) {
    if (user) {
      return user;
    }

    const allowAny = this.reflector.get<boolean>(
      'allow-any',
      context.getHandler(),
    );

    if (allowAny) {
      return true;
    }
    throw new HttpUnauthorizedException(
      'You are not authorized to access this feature',
    );
  }
}
