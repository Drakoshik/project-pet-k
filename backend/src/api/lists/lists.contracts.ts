import { PartialType } from '@nestjs/mapped-types';

export class CreateListDto {
  title: string;
  position: number;
  projectId: number;
}

export class ListResponseDto extends CreateListDto {
  id: number;
}

export class UpdateListDto extends PartialType(CreateListDto) {}
