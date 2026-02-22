import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from '../../repositories/Projects/projects.repository';

@Injectable()
export class ListsService {
  constructor(private projectsRepository: ProjectsRepository) {}
}
