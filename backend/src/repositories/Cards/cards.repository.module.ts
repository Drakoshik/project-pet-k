import { Module } from '@nestjs/common';
import { CardsPrismaRepository } from './cards.prisma.repository';
import { CardsRepository } from './cards.repository';

@Module({
  providers: [
    CardsPrismaRepository,
    {
      provide: CardsRepository,
      useClass: CardsPrismaRepository,
    },
  ],
  exports: [CardsRepository],
})
export class CardRepositoryModule {}
