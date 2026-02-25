import { Global, Module } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { ProjectRepositoryModule } from '../../repositories/Projects/projects.repository.module';
import { ProjectsController } from './projects.controller';
import { ProjectMembersModule } from '../projectMembers/projectMembers.module';

@Global()
@Module({
  imports: [ProjectRepositoryModule, ProjectMembersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
