export type ListDto = {
  id: number;
  title: string;
  position: number;
  projectId: number;
};

export type ListWithoutIdDto = Omit<ListDto, 'id'>;
