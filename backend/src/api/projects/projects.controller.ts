import { ApiTags } from '@nestjs/swagger';
import { ProjectsRepository } from '../../repositories/Projects/projects.repository';
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
import { CreateProjectDTO } from './projects.contracts';

@UseGuards(AuthGuard)
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsRepository) {}

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.projectsService.getOne(id);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Post()
  create(@Body() projectWithoutId: CreateProjectDTO) {
    return this.projectsService.create(projectWithoutId);
  }

  @Delete()
  delete(@Param('id') id: number) {
    return this.projectsService.delete(id);
  }
}
