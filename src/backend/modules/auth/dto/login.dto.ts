import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'E-mail address'})
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'Password'})
  password!: string;
}
