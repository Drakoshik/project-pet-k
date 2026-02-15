export type CardDto = {
  id: number;
  title: string;
  description?: string | null;
  position: number;
  listId: number;
  assigneeId?: number | null;
};

export type CardWithoutIdDto = Omit<CardDto, 'id'>;
