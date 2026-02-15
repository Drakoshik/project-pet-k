import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'zalupnyi email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'zalupnyi password' })
  password: string;

  @ApiProperty({ description: 'zalupnyi name' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ description: 'zalupnyi secondname' })
  @IsString()
  @IsOptional()
  secondName?: string | null;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserResponseDto extends CreateUserDto {
  @ApiProperty({ description: 'id' })
  id: number;
}
