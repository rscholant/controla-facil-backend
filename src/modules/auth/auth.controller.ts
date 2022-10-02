import { AuthService } from '@modules/auth/auth.service';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AllowAny } from '@shared/custom-decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @AllowAny()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
