import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';

export class CreateProjectDTO {
  name: string;
  description?: string | null;
}

export class ProjectResponseDTO extends CreateProjectDTO {
  id: number;
}

export class UpdateProjectDto extends PartialType(CreateProjectDTO) {}

export class GetProjectsRequestDTO {
  id?: number;

  full?: boolean;
}
