import { MessageDto, MessageWithoutIdDto } from './messages.contracts';

export abstract class MessagesRepository {
  public abstract getOne(id: number): Promise<MessageDto | null>;
  public abstract create(data: MessageWithoutIdDto): Promise<MessageDto>;
  public abstract delete(id: number): Promise<void>;
  public abstract findAll(): Promise<MessageDto[]>;
}
