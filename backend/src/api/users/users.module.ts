import { Global, Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepositoryModule } from '../../repositories/users/users.repository.module';

@Global()
@Module({
  imports: [UserRepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
