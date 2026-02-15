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
    const user = await this.databaseService.project.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async findAll(): Promise<ProjectDto[]> {
    const user = await this.databaseService.project.findMany();

    return user;
  }

  public async create(data: ProjectWithoutIdDto): Promise<ProjectDto> {
    const user = await this.databaseService.project.create({
      data,
    });

    return user;
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
}
