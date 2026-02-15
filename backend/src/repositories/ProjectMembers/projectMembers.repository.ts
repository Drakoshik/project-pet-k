import {
  ProjectMemberDto,
  ProjectMemberWithoutIdDto,
} from './projectMembers.contracts';

export abstract class ProjectMembersRepository {
  public abstract getOne(id: number): Promise<ProjectMemberDto | null>;
  public abstract create(
    data: ProjectMemberWithoutIdDto,
  ): Promise<ProjectMemberDto>;
  public abstract delete(id: number): Promise<void>;
  public abstract findAll(): Promise<ProjectMemberDto[]>;
  public abstract update(
    id: number,
    dto: Partial<ProjectMemberWithoutIdDto>,
  ): Promise<ProjectMemberDto>;
}
