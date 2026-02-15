import { BadRequestException, Injectable } from '@nestjs/common';

import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from './users.contracts';
import { UsersRepository } from '../../repositories/users/users.repository';
import { RequestContext } from '../../utils/request-context';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  public async create(
    userDtoWithoutId: CreateUserDto,
  ): Promise<UserResponseDto | null> {
    return this.userRepository.create(userDtoWithoutId);
  }

  public async findAll() {
    return this.userRepository.findAll();
  }

  public async findById(id: number): Promise<UserResponseDto | null> {
    return this.userRepository.getOne(id);
  }

  public async findByEmail(email: string): Promise<UserResponseDto | null> {
    return this.userRepository.getByEmail(email);
  }

  public async update(userDto: UpdateUserDto) {
    const id = RequestContext.get('userId') as number;

    return this.userRepository.update(id, userDto);
  }

  public async delete() {
    const userId = RequestContext.get<number>('userId')!;
    await this.userRepository.delete(userId);
    return {
      success: true,
    };
  }
}
