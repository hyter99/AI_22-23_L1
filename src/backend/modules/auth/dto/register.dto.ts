import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Match } from '../../../decorators/match.decorator';
import { Unique } from '../../../decorators/unique.decorator';

export class RegisterDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  login!: string;

  @Unique('user', 'email')
  @MaxLength(255)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  password!: string;

  @Match(RegisterDto, (dto) => dto.password)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  passwordConfirm!: string;
}
