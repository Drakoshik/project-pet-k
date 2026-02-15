import { UserDto, UserWithoutIdDto } from './users.contracts';

export abstract class UsersRepository {
  public abstract getOne(id: number): Promise<UserDto | null>;
  public abstract getByEmail(email: string): Promise<UserDto | null>;
  public abstract create(data: UserWithoutIdDto): Promise<UserDto>;
  public abstract delete(id: number): Promise<void>;
  public abstract findAll(): Promise<UserDto[]>;
  public abstract update(
    id: number,
    dto: Partial<UserWithoutIdDto>,
  ): Promise<UserDto>;
}
