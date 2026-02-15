import { Role } from '@prisma/client';

export type ProjectMemberDto = {
  id: number;
  userId: number;
  projectId: number;
  role?: Role;
};

export type ProjectMemberWithoutIdDto = Omit<ProjectMemberDto, 'id'>;
