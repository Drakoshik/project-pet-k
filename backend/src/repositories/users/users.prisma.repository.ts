import { UserDto, UserWithoutIdDto } from './users.contracts';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class UsersPrismaRepository extends UsersRepository {
  constructor(private databaseService: DatabaseService) {
    super();
  }

  public async getOne(id: number): Promise<UserDto | null> {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async getByEmail(email: string): Promise<UserDto | null> {
    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async findAll(): Promise<UserDto[]> {
    const user = await this.databaseService.user.findMany();

    return user;
  }

  public async create(data: UserWithoutIdDto): Promise<UserDto> {
    const user = await this.databaseService.user.create({
      data,
    });

    return user;
  }

  public async delete(id: number): Promise<void> {
    await this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }

  public async update(
    id: number,
    data: Partial<UserWithoutIdDto>,
  ): Promise<UserDto> {
    return await this.databaseService.user.update({
      where: { id },
      data,
    });
  }
}
