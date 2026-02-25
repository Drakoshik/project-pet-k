import { CardsRepository } from '../../repositories/Cards/cards.repository';
import { Injectable } from '@nestjs/common';
import { CardsResponseDTO, CreateCardDTO } from './cards.contracts';

@Injectable()
export class CardsService {
  constructor(private cardsRepository: CardsRepository) {}

  public async findAll(): Promise<CardsResponseDTO[] | null> {
    return this.cardsRepository.findAll();
  }

  public async findOne(id: number): Promise<CardsResponseDTO | null> {
    return this.cardsRepository.getOne(id);
  }

  public async createCard(dto: CreateCardDTO): Promise<CardsResponseDTO> {
    return this.cardsRepository.create(dto);
  }

  public async deleteCard(id: number) {
    await this.cardsRepository.delete(id);
    return {
      success: true,
    };
  }
}
