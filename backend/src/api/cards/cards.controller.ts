import { ApiTags } from '@nestjs/swagger';
import { CardsRepository } from '../../repositories/Cards/cards.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../utils/auth.guard.service';
import { CreateUserDto } from '../users/users.contracts';
import { CreateCardDto } from './cards.contracts';

@UseGuards(AuthGuard)
@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsRepository) {}

  @Post()
  create(@Body() cardWithoutId: CreateCardDto) {
    return this.cardsService.create(cardWithoutId);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.cardsService.getOne(id);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Delete()
  delete(@Param('id') id: number) {
    return this.cardsService.delete(id);
  }
}
