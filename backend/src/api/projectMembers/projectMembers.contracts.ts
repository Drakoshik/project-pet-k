import { PartialType } from '@nestjs/mapped-types';
import { Role } from '@prisma/client';

export class CreateProjectMemberDto {
  userId: number;
  projectId: number;
  role?: Role;
}

export class ProjectMemberResponseDto extends CreateProjectMemberDto {
  id: number;
}

export class UpdateProjectMemberDto extends PartialType(
  CreateProjectMemberDto,
) {}
