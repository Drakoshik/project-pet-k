import { PartialType } from '@nestjs/mapped-types';

export class CreateProjectDTO {
  name: string;
  description?: string | null;
}

export class ProjectResponseDTO extends CreateProjectDTO {
  id: number;
}

export class UpdateProjectDto extends PartialType(CreateProjectDTO) {}
