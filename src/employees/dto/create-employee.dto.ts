import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EmployeeGroup } from '../enums/employee-group.enum';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(EmployeeGroup)
  group: EmployeeGroup;
}
