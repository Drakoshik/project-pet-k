import { Global, Module } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { ProjectRepositoryModule } from '../../repositories/Projects/projects.repository.module';
import { ProjectsController } from './projects.controller';
import { ListRepositoryModule } from '../../repositories/Lists/lists.repository.module';
import { CardRepositoryModule } from '../../repositories/Cards/cards.repository.module';

@Global()
@Module({
  imports: [
    ProjectRepositoryModule,
    ListRepositoryModule,
    CardRepositoryModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
