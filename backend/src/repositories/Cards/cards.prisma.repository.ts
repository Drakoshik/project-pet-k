import { CardDto, CardWithoutIdDto } from './cards.contracts';
import { Injectable } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class CardsPrismaRepository extends CardsRepository {
  constructor(private databaseService: DatabaseService) {
    super();
  }

  public async getOne(id: number): Promise<CardDto | null> {
    const card = await this.databaseService.card.findUnique({
      where: {
        id,
      },
    });

    return card;
  }

  public async findAll(): Promise<CardDto[]> {
    const card = await this.databaseService.card.findMany();

    return card;
  }

  public async create(data: CardWithoutIdDto): Promise<CardDto> {
    const card = await this.databaseService.card.create({
      data,
    });

    return card;
  }

  public async delete(id: number): Promise<void> {
    await this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
