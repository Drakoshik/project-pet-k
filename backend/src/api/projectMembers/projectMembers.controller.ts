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
import { ProjectMembersService } from './projectMembers.service';
import { CreateProjectMemberDto } from './projectMembers.contracts';

@UseGuards(AuthGuard)
@ApiTags('projectsMembers')
@Controller('projectsMembers')
export class ProjectMembersController {
  constructor(private readonly projectMembersService: ProjectMembersService) {}

  @Post()
  create(@Body() projectMemberWithoutId: CreateProjectMemberDto) {
    return this.projectMembersService.create(projectMemberWithoutId);
  }

  @Delete()
  delete(@Param('id') id: number) {
    return this.projectMembersService.delete(id);
  }
}
