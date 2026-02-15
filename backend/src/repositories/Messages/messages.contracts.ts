export type MessageDto = {
  id: number;
  text: string;
  authorId: number;
  projectId: number;
  createdAt: Date;
};

export type MessageWithoutIdDto = Omit<MessageDto, 'id'>;
