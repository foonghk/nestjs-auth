import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}