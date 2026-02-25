import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ description: ' email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: ' password' })
  password: string;

  @ApiProperty({ description: ' name' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ description: ' secondname' })
  @IsString()
  @IsOptional()
  secondName?: string | null;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserResponseDto extends CreateUserDto {
  @ApiProperty({ description: 'id' })
  id: number;
}

export class UserResponseDtoWithoutPassword extends OmitType(UserResponseDto, [
  'password',
] as const) {}
