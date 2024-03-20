import { IsString, MinLength, IsJWT } from 'class-validator';

export class AuthResetPasswordDTO {
  @IsString()
  @MinLength(6)
  password: string;

  @IsJWT()
  token: string;
}
