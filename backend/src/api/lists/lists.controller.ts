import { ApiTags } from '@nestjs/swagger';
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
import { CreateListDto } from './lists.contracts';
import { ListsService } from './lists.service';

@UseGuards(AuthGuard)
@ApiTags('lists')
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  create(@Body() listWithoutId: CreateListDto) {
    return this.listsService.create(listWithoutId);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.listsService.getOne(id);
  }

  @Get()
  findAll() {
    return this.listsService.findAll();
  }

  @Delete()
  delete(@Param('id') id: number) {
    return this.listsService.delete(id);
  }
}
