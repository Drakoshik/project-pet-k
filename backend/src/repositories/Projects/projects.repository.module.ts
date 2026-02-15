import { Module } from '@nestjs/common';
import { ProjectsPrismaRepository } from './projects.prisma.repository';
import { ProjectsRepository } from './projects.repository';

@Module({
  providers: [
    ProjectsPrismaRepository,
    {
      provide: ProjectsRepository,
      useClass: ProjectsPrismaRepository,
    },
  ],
  exports: [ProjectsRepository],
})
export class ProjectRepositoryModule {}
