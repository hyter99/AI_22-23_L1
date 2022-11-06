import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { Unique } from "../../../decorators/unique.decorator";

export class UpdateUserDto {
  @Unique('user', 'email')
  @MaxLength(255)
  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  name?: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  surname?: string;
}