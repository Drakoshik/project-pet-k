import { ApiTags } from '@nestjs/swagger';
import { CardsRepository } from '../../repositories/Cards/cards.repository';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../utils/auth.guard.service';

@UseGuards(AuthGuard)
@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsRepository) {}
}
