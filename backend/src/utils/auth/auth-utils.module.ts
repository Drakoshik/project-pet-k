import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthUtilsService } from './auth-utils.service';
import { UsersModule } from '../../api/users/users.module';

@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'trello-chat',
      signOptions: { algorithm: 'HS256' },
    }),
  ],
  providers: [AuthUtilsService],
  exports: [AuthUtilsService],
})
export class AuthUtilsModule {}
