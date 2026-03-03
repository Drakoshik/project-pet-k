import { Global, Module } from '@nestjs/common';

import { ProjectMembersService } from './projectMembers.service';
import { ProjectMembersController } from './projectMembers.controller';
import { ProjectMemberRepositoryModule } from '../../repositories/ProjectMembers/projectMembers.repository.module';

@Global()
@Module({
  imports: [ProjectMemberRepositoryModule],
  controllers: [ProjectMembersController],
  providers: [ProjectMembersService],
  exports: [ProjectMembersService],
})
export class ProjectMembersModule {}
