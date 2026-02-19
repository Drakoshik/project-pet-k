import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/users.contracts';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './auth.contracts';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  registation(@Body() userDtoWithoutId: CreateUserDto) {
    return this.authService.registration(userDtoWithoutId);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginInfo = await this.authService.authentication(loginDto);

    res.cookie('refreshToken', loginInfo.data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return loginInfo;
  }

  @Post('refreshToken')
  refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.refreshToken(refreshToken.refreshToken);
  }

  @Post('refresh')
  refresh(@Req() req: Request) {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return { accessToken: null };
    }
    return this.authService.refreshToken(token);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
    return { ok: true };
  }
}
