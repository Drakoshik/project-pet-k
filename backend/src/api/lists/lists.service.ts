import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from '../../repositories/Projects/projects.repository';
import { CardsResponseDto, CreateCardDto } from '../cards/cards.contracts';
import { CreateListDto, ListResponseDto } from './lists.contracts';
import { ListsRepository } from '../../repositories/Lists/lists.repository';

@Injectable()
export class ListsService {
  constructor(private listsRepository: ListsRepository) {}

  public async findAll(): Promise<ListResponseDto[] | null> {
    return this.listsRepository.findAll();
  }

  public async getOne(id: number): Promise<ListResponseDto | null> {
    return this.listsRepository.getOne(id);
  }

  public async create(dto: CreateListDto): Promise<ListResponseDto> {
    return this.listsRepository.create(dto);
  }

  public async delete(id: number) {
    await this.listsRepository.delete(id);
    return {
      success: true,
    };
  }
}
