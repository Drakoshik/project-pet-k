import { Injectable } from '@nestjs/common';
import { ProjectMembersRepository } from '../../repositories/ProjectMembers/projectMembers.repository';
import { CreateProjectMemberDto } from './projectMembers.contracts';

@Injectable()
export class ProjectMembersService {
  constructor(private projectMembersRepository: ProjectMembersRepository) {}

  public async create(
    dto: CreateProjectMemberDto,
  ): Promise<CreateProjectMemberDto> {
    return this.projectMembersRepository.create(dto);
  }

  public async delete(id: number) {
    await this.projectMembersRepository.delete(id);
    return {
      success: true,
    };
  }
}
