import { IsEmail, IsJWT, IsString, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @Matches(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$'),
    {
      message:
        'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.',
    },
  )
  password: string;

  confirmPassword: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class ConfirmDto {
  @IsString()
  @IsJWT()
  token: string
}