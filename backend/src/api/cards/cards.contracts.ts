import { PartialType } from '@nestjs/mapped-types';

export class CreateCardDTO {
  title: string;
  description?: string | null;
  position: number;
  listId: number;
  assigneeId?: number | null;
}

export class CardsResponseDTO extends CreateCardDTO {
  id: number;
}

export class UpdateCardDto extends PartialType(CreateCardDTO) {}
