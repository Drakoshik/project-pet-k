import { CardDto, CardWithoutIdDto } from './cards.contracts';

export abstract class CardsRepository {
  public abstract getOne(id: number): Promise<CardDto | null>;
  public abstract create(data: CardWithoutIdDto): Promise<CardDto>;
  public abstract delete(id: number): Promise<void>;
  public abstract findAll(): Promise<CardDto[]>;
}
