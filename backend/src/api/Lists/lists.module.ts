import { Global, Module } from '@nestjs/common';

import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ListRepositoryModule } from '../../repositories/Lists/lists.repository.module';

@Global()
@Module({
  imports: [ListRepositoryModule],
  controllers: [ListsController],
  providers: [ListsService],
  exports: [ListsService],
})
export class ListsModule {}
