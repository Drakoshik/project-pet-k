import { CardsRepository } from '../../repositories/Cards/cards.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CardsService {
  constructor(private cardsRepository: CardsRepository) {}
}
