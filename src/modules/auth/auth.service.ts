import { User } from '@modules/users/schemas/user.schema';
import { UsersService } from '@modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpNotAcceptableException } from '@shared/exceptions';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email: username });
    if (!user) return null;
    const passwordValid = compareSync(password, (user.data as User).password);
    if (!user) {
      throw new HttpNotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
