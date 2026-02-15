import { Module } from '@nestjs/common';
import { ProjectMembersPrismaRepository } from './projectMembers.prisma.repository';
import { ProjectMembersRepository } from './projectMembers.repository';

@Module({
  providers: [
    ProjectMembersPrismaRepository,
    {
      provide: ProjectMembersRepository,
      useClass: ProjectMembersPrismaRepository,
    },
  ],
  exports: [ProjectMembersRepository],
})
export class ProjectMemberRepositoryModule {}
