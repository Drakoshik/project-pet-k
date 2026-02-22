import { Injectable } from '@nestjs/common';

import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  UserResponseDtoWithoutPassword,
} from './users.contracts';
import { UsersRepository } from '../../repositories/users/users.repository';
import { RequestContext } from '../../utils/request-context';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  private excludePassword(
    user: UserResponseDto,
  ): UserResponseDtoWithoutPassword {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  private excludePasswordFromArray(
    users: UserResponseDto[],
  ): UserResponseDtoWithoutPassword[] {
    return users.map((user) => this.excludePassword(user));
  }

  public async findByEmailWithPassword(
    email: string,
  ): Promise<UserResponseDto | null> {
    return this.userRepository.getByEmail(email);
  }

  public async create(
    userDtoWithoutId: CreateUserDto,
  ): Promise<UserResponseDtoWithoutPassword | null> {
    const user = await this.userRepository.create(userDtoWithoutId);
    return user ? this.excludePassword(user) : null;
  }

  public async findAll(): Promise<UserResponseDtoWithoutPassword[] | null> {
    const users = await this.userRepository.findAll();
    return users ? this.excludePasswordFromArray(users) : null;
  }

  public async findById(
    id: number,
  ): Promise<UserResponseDtoWithoutPassword | null> {
    const user = await this.userRepository.getOne(id);
    return user ? this.excludePassword(user) : null;
  }

  public async findByEmail(
    email: string,
  ): Promise<UserResponseDtoWithoutPassword | null> {
    const user = await this.userRepository.getByEmail(email);
    return user ? this.excludePassword(user) : null;
  }

  public async update(userDto: UpdateUserDto) {
    const id = RequestContext.get('userId') as number;
    const updatedUser = await this.userRepository.update(id, userDto);
    return updatedUser ? this.excludePassword(updatedUser) : null;
  }

  public async delete() {
    const userId = RequestContext.get<number>('userId')!;
    await this.userRepository.delete(userId);
    return {
      success: true,
    };
  }
}
