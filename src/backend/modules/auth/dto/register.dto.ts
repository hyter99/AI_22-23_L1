import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { Match } from '../../../decorators/match.decorator';
import { Unique } from '../../../decorators/unique.decorator';
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'Name'})
  name!: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'Surname'})
  surname!: string;

  @Unique('user', 'email')
  @MaxLength(255)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'E-mail address'})
  email!: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'Password, must contain big letter and number'})
  password!: string;

  @Match(RegisterDto, (dto) => dto.password)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'Password confirm'})
  passwordConfirm!: string;
}
