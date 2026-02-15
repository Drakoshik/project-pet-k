import { ListDto, ListWithoutIdDto } from './lists.contracts';
import { Injectable } from '@nestjs/common';
import { ListsRepository } from './lists.repository';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ListsPrismaRepository extends ListsRepository {
  constructor(private databaseService: DatabaseService) {
    super();
  }

  public async getOne(id: number): Promise<ListDto | null> {
    const list = await this.databaseService.list.findUnique({
      where: {
        id,
      },
    });

    return list;
  }

  public async findAll(): Promise<ListDto[]> {
    const list = await this.databaseService.list.findMany();

    return list;
  }

  public async create(data: ListWithoutIdDto): Promise<ListDto> {
    const list = await this.databaseService.list.create({
      data,
    });

    return list;
  }

  public async delete(id: number): Promise<void> {
    await this.databaseService.list.delete({
      where: {
        id,
      },
    });
  }

  public async update(
    id: number,
    data: Partial<ListWithoutIdDto>,
  ): Promise<ListDto> {
    return await this.databaseService.list.update({
      where: { id },
      data,
    });
  }
}
