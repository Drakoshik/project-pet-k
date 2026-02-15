import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/users.contracts';
import { UsersService } from '../users/users.service';
import { LoginDto } from './auth.contracts';
import { AuthUtilsService } from '../../utils/auth/auth-utils.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private authUtilsService: AuthUtilsService,
  ) {}

  public async registration(dto: CreateUserDto) {
    const userEmail = await this.userService.findByEmail(dto.email);
    if (userEmail) throw new BadRequestException('email: Email alredy exist');

    const hasedPassword = this.authUtilsService.hashPassword(dto.password);

    const user = await this.userService.create({
      ...dto,
      secondName: dto.secondName || null,
      password: hasedPassword,
    });

    if (!user) throw new BadRequestException('data: Invalid data');

    const tokens = this.authUtilsService.generateTokens({
      userId: user.id,
    });

    return {
      success: true,
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }

  public async authentication(LoginDto: LoginDto) {
    const user = await this.userService.findByEmail(LoginDto.email);
    if (!user) throw new BadRequestException('email: User not found');

    const isPasswordValid = await this.authUtilsService.validatePassword(
      LoginDto.password,
      user.password,
    );

    if (!isPasswordValid)
      throw new BadRequestException('password: Incorrect password');

    console.log(isPasswordValid);

    const tokens = this.authUtilsService.generateTokens({
      userId: user.id,
    });

    console.log(tokens);

    return {
      success: true,
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }

  public async refreshToken(refreshToken: string) {
    const payload = this.authUtilsService.validateToken(refreshToken);
    if (!payload)
      throw new BadRequestException('refresh token: Invalid refresh token');

    const tokens = this.authUtilsService.generateTokens({
      userId: payload.userId,
    });

    return {
      success: true,
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }
}
