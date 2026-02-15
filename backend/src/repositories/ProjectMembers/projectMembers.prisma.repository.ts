import { Injectable } from '@nestjs/common';
import { ProjectMembersRepository } from './projectMembers.repository';
import { DatabaseService } from '../../database/database.service';
import {
  ProjectMemberDto,
  ProjectMemberWithoutIdDto,
} from './projectMembers.contracts';

@Injectable()
export class ProjectMembersPrismaRepository extends ProjectMembersRepository {
  constructor(private databaseService: DatabaseService) {
    super();
  }

  public async getOne(id: number): Promise<ProjectMemberDto | null> {
    const user = await this.databaseService.projectMember.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async findAll(): Promise<ProjectMemberDto[]> {
    const user = await this.databaseService.projectMember.findMany();

    return user;
  }

  public async create(
    data: ProjectMemberWithoutIdDto,
  ): Promise<ProjectMemberDto> {
    const user = await this.databaseService.projectMember.create({
      data,
    });

    return user;
  }

  public async delete(id: number): Promise<void> {
    await this.databaseService.projectMember.delete({
      where: {
        id,
      },
    });
  }

  public async update(
    id: number,
    data: Partial<ProjectMemberWithoutIdDto>,
  ): Promise<ProjectMemberDto> {
    return await this.databaseService.projectMember.update({
      where: { id },
      data,
    });
  }
}
