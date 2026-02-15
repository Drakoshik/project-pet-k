import { ListDto, ListWithoutIdDto } from './lists.contracts';

export abstract class ListsRepository {
  public abstract getOne(id: number): Promise<ListDto | null>;
  public abstract create(data: ListWithoutIdDto): Promise<ListDto>;
  public abstract delete(id: number): Promise<void>;
  public abstract findAll(): Promise<ListDto[]>;
  public abstract update(
    id: number,
    dto: Partial<ListWithoutIdDto>,
  ): Promise<ListDto>;
}
