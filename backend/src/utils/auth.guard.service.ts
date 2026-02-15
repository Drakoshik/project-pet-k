import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthUtilsService } from './auth/auth-utils.service';
import { RequestContext } from './request-context';
import { Request } from 'express';
import { UsersService } from '../api/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authUtilsService: AuthUtilsService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) throw new UnauthorizedException('No token provided');

      const payload = this.authUtilsService.validateToken(token);
      const user = await this.usersService.findById(payload.userId);

      if (!user) throw new UnauthorizedException('User not found');

      RequestContext.set('userId', user.id);

      console.log(RequestContext.get<number>('userId'));
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
