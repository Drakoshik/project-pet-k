import { MessageDto, MessageWithoutIdDto } from './messages.contracts';
import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class MessagesPrismaRepository extends MessagesRepository {
  constructor(private databaseService: DatabaseService) {
    super();
  }

  public async getOne(id: number): Promise<MessageDto | null> {
    const message = await this.databaseService.message.findUnique({
      where: {
        id,
      },
    });

    return message;
  }

  public async findAll(): Promise<MessageDto[]> {
    const message = await this.databaseService.message.findMany();

    return message;
  }

  public async create(data: MessageWithoutIdDto): Promise<MessageDto> {
    const message = await this.databaseService.message.create({
      data,
    });

    return message;
  }

  public async delete(id: number): Promise<void> {
    await this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
