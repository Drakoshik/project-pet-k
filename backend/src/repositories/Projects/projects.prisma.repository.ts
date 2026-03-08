import { ProjectDto, ProjectWithoutIdDto } from './projects.contracts';
import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ProjectsPrismaRepository extends ProjectsRepository {
  constructor(private databaseService: DatabaseService) {
    super();
  }

  public async getOne(id: number): Promise<ProjectDto | null> {
    const project = await this.databaseService.project.findUnique({
      where: {
        id,
      },
    });

    return project;
  }

  public async findAll(): Promise<ProjectDto[]> {
    const project = await this.databaseService.project.findMany();

    return project;
  }

  public async create(data: ProjectWithoutIdDto): Promise<ProjectDto> {
    const project = await this.databaseService.project.create({
      data,
    });

    return project;
  }

  public async delete(id: number): Promise<void> {
    await this.databaseService.project.delete({
      where: {
        id,
      },
    });
  }

  public async update(
    id: number,
    data: Partial<ProjectWithoutIdDto>,
  ): Promise<ProjectDto> {
    return await this.databaseService.project.update({
      where: { id },
      data,
    });
  }

  public async createWithOwner(
    projectData: ProjectWithoutIdDto,
    ownerId: number,
  ): Promise<ProjectDto> {
    return this.databaseService.$transaction(async (prisma) => {
      const project = await prisma.project.create({
        data: projectData,
      });

      await prisma.projectMember.create({
        data: {
          projectId: project.id,
          userId: ownerId,
          role: 'OWNER',
        },
      });

      return project;
    });
  }
}
