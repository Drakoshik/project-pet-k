import { PartialType } from '@nestjs/mapped-types';

export class CreateCardDto {
  title: string;
  description?: string | null;
  position: number;
  listId: number;
  assigneeId?: number | null;
}

export class CardsResponseDto extends CreateCardDto {
  id: number;
}

export class UpdateCardDto extends PartialType(CreateCardDto) {}
