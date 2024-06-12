import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/services/employees.service';
import { LoginDTO } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private employeesService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  async validateEmployee(
    email: string,
    pass: string,
  ): Promise<null | { name: string; email: string }> {
    const employee = await this.employeesService.findEmployee(email);
    if (employee) {
      const isMatch = await bcrypt.compare(pass, employee.password);
      if (!isMatch) {
        return null;
      }
      return { name: employee.name, email: employee.email };
    }
    return null;
  }

  async login(req: LoginDTO): Promise<{ access_token: string }> {
    const res = await this.validateEmployee(req.email, req.password);

    if (!res) {
      throw new HttpException(
        'Email or Password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      access_token: this.jwtService.sign(res),
    };
  }
}
