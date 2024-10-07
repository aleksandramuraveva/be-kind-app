import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { email: string; password: string };
type RegisterInput = { name: string; email: string; password: string };
type SignInData = { userId: number; username: string };
type AuthResult = { accessToken: string; userId: number; username: string; uniqueTag: string };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(input: RegisterInput): Promise<AuthResult> {
    const user = await this.usersService.createUser(input);
    return this.signIn({ userId: user.userId, username: user.username, uniqueTag: user.uniqueTag });
  }

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData & { uniqueTag: string } | null> {
    const user = await this.usersService.findUserByEmail(input.email);
    if (user && user.password === input.password) {
      return {
        userId: user.userId,
        username: user.username,
        uniqueTag: user.uniqueTag,
      };
    }
    return null;
  }

  async signIn(user: SignInData & { uniqueTag: string }): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return {
      accessToken,
      username: user.username,
      userId: user.userId,
      uniqueTag: user.uniqueTag,
    };
  }
}
