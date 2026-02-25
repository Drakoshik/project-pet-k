import { Global, Module } from '@nestjs/common';

import { ProjectMembersService } from './projectMembers.service';
import { ProjectMembersController } from './projectMembers.controller';
import { ListRepositoryModule } from '../../repositories/Lists/lists.repository.module';

@Global()
@Module({
  imports: [ListRepositoryModule],
  controllers: [ProjectMembersController],
  providers: [ProjectMembersService],
  exports: [ProjectMembersService],
})
export class ProjectMembersModule {}
