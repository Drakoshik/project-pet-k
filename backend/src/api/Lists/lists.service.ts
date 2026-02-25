import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from '../../repositories/Projects/projects.repository';
import { CardsResponseDTO, CreateCardDTO } from '../cards/cards.contracts';
import { CreateListDTO, ListResponseDTO } from './lists.contracts';
import { ListsRepository } from '../../repositories/Lists/lists.repository';

@Injectable()
export class ListsService {
  constructor(private listsRepository: ListsRepository) {}

  public async findAll(): Promise<ListResponseDTO[] | null> {
    return this.listsRepository.findAll();
  }

  public async getOne(id: number): Promise<ListResponseDTO | null> {
    return this.listsRepository.getOne(id);
  }

  public async create(dto: CreateListDTO): Promise<ListResponseDTO> {
    return this.listsRepository.create(dto);
  }

  public async delete(id: number) {
    await this.listsRepository.delete(id);
    return {
      success: true,
    };
  }
}
