import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
