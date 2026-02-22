import { ApiTags } from '@nestjs/swagger';
import { ListsRepository } from '../../repositories/Lists/lists.repository';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../utils/auth.guard.service';

@UseGuards(AuthGuard)
@ApiTags('lists')
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsRepository) {}
}
