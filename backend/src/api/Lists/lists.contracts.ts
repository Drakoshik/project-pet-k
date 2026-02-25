import { PartialType } from '@nestjs/mapped-types';

export class CreateListDTO {
  title: string;
  position: number;
  projectId: number;
}

export class ListResponseDTO extends CreateListDTO {
  id: number;
}

export class UpdateListDto extends PartialType(CreateListDTO) {}
