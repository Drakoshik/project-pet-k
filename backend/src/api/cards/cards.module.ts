import { Global, Module } from '@nestjs/common';

import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardRepositoryModule } from '../../repositories/Cards/cards.repository.module';

@Global()
@Module({
  imports: [CardRepositoryModule],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
