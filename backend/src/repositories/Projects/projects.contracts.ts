export type ProjectDto = {
  id: number;
  name: string;
  description?: string | null;
};

export type ProjectWithoutIdDto = Omit<ProjectDto, 'id'>;
