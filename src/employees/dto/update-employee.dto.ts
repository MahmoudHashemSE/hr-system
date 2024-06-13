import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
