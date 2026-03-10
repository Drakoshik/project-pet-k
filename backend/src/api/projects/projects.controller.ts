import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../utils/auth.guard.service';
import { CreateProjectDTO, GetProjectsRequestDTO } from './projects.contracts';
import { ProjectsService } from './projects.service';

@UseGuards(AuthGuard)
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(@Query() query: GetProjectsRequestDTO) {
    query.id = Number(query.id);

    if (query.id) {
      if (query.full) {
        const project = await this.projectsService.getProjectsFully(query.id);
        if (!project) {
          throw new NotFoundException(`Project with ID ${query.id} not found`);
        }
        return {
          success: true,
          data: project,
        };
      }

      const project = await this.projectsService.getOne(query.id);
      if (!project) {
        throw new NotFoundException(`Project with ID ${query.id} not found`);
      }
      return {
        success: true,
        data: project,
      };
    }

    const projects = await this.projectsService.findAll();

    return {
      success: true,
      data: projects,
    };
  }

  @Post()
  create(@Body() projectWithoutId: CreateProjectDTO) {
    return this.projectsService.create(projectWithoutId);
  }

  @Delete(':id')
  delete(@Query('id') id: number) {
    return this.projectsService.delete(id);
  }
}
