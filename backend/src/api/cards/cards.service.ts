import { CardsRepository } from '../../repositories/Cards/cards.repository';
import { Injectable } from '@nestjs/common';
import { CardsResponseDto, CreateCardDto } from './cards.contracts';

@Injectable()
export class CardsService {
  constructor(private cardsRepository: CardsRepository) {}

  public async findAll(): Promise<CardsResponseDto[] | null> {
    return this.cardsRepository.findAll();
  }

  public async findOne(id: number): Promise<CardsResponseDto | null> {
    return this.cardsRepository.getOne(id);
  }

  public async createCard(dto: CreateCardDto): Promise<CardsResponseDto> {
    return this.cardsRepository.create(dto);
  }

  public async deleteCard(id: number) {
    await this.cardsRepository.delete(id);
    return {
      success: true,
    };
  }
}
