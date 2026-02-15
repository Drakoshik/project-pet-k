import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.contracts';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../utils/auth.guard.service';

@UseGuards(AuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() userDtoWithoutId: CreateUserDto) {
    return this.usersService.create(userDtoWithoutId);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Patch()
  update(@Body() userDto: UpdateUserDto) {
    return this.usersService.update(userDto);
  }

  @Delete()
  remove() {
    return this.usersService.delete();
  }
}
