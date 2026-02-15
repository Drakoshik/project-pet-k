import { Module } from '@nestjs/common';
import { ListsPrismaRepository } from './lists.prisma.repository';
import { ListsRepository } from './lists.repository';

@Module({
  providers: [
    ListsPrismaRepository,
    {
      provide: ListsRepository,
      useClass: ListsPrismaRepository,
    },
  ],
  exports: [ListsRepository],
})
export class ListRepositoryModule {}
