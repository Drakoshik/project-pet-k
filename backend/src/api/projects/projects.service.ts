import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from '../../repositories/Projects/projects.repository';
import { CreateListDTO, ListResponseDTO } from '../Lists/lists.contracts';
import { ProjectResponseDTO } from './projects.contracts';

@Injectable()
export class ProjectsService {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async findAll(): Promise<ProjectResponseDTO[] | null> {
    return this.projectsRepository.findAll();
  }

  public async getOne(id: number): Promise<ProjectResponseDTO | null> {
    return this.projectsRepository.getOne(id);
  }

  public async create(dto: CreateListDTO): Promise<ProjectResponseDTO> {
    return this.projectsRepository.create(dto);
  }

  public async delete(id: number) {
    await this.projectsRepository.delete(id);
    return {
      success: true,
    };
  }
}
