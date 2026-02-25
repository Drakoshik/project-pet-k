import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from '../../repositories/Projects/projects.repository';
import { CreateProjectDTO, ProjectResponseDTO } from './projects.contracts';
import { RequestContext } from '../../utils/request-context';
import { ProjectMembersService } from '../projectMembers/projectMembers.service';

@Injectable()
export class ProjectsService {
  constructor(
    private projectsRepository: ProjectsRepository,
    private projectMembersService: ProjectMembersService,
  ) {}

  public async findAll(): Promise<ProjectResponseDTO[] | null> {
    return this.projectsRepository.findAll();
  }

  public async getOne(id: number): Promise<ProjectResponseDTO | null> {
    return this.projectsRepository.getOne(id);
  }

  public async create(dto: CreateProjectDTO): Promise<ProjectResponseDTO> {
    const userId = RequestContext.get<number>('userId')!;
    const project = await this.projectsRepository.create(dto);
    await this.projectMembersService.create({
      projectId: project.id,
      userId,
      role: 'OWNER',
    });
    return project;
  }

  public async delete(id: number) {
    await this.projectsRepository.delete(id);
    return {
      success: true,
    };
  }
}
