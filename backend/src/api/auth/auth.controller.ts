import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/users.contracts';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './auth.contracts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  registation(@Body() userDtoWithoutId: CreateUserDto) {
    return this.authService.registration(userDtoWithoutId);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.authentication(loginDto);
  }

  @Post('refreshToken')
  refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.refreshToken(refreshToken.refreshToken);
  }
}
