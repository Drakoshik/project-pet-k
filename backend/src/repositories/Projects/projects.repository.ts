import { ProjectDto, ProjectWithoutIdDto } from './projects.contracts';

export abstract class ProjectsRepository {
  public abstract getOne(id: number): Promise<ProjectDto | null>;
  public abstract create(data: ProjectWithoutIdDto): Promise<ProjectDto>;
  public abstract delete(id: number): Promise<void>;
  public abstract findAll(): Promise<ProjectDto[]>;
  public abstract update(
    id: number,
    dto: Partial<ProjectWithoutIdDto>,
  ): Promise<ProjectDto>;
}
