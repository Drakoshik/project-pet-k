import { Module } from '@nestjs/common';
import { UsersPrismaRepository } from './users.prisma.repository';
import { UsersRepository } from './users.repository';

@Module({
  providers: [
    UsersPrismaRepository,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
  ],
  exports: [UsersRepository],
})
export class UserRepositoryModule {}
