import { ApiTags } from '@nestjs/swagger';
import { ProjectsRepository } from '../../repositories/Projects/projects.repository';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../utils/auth.guard.service';

@UseGuards(AuthGuard)
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsRepository) {}
}
