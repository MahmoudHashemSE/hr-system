import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Employee } from '../employees/schemas/employees.schema';
import { EmployeeGroup } from '../employees/enums/employee-group.enum';

@Injectable()
export class EmployeeSeeder implements Seeder {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
  ) {}

  async seed(): Promise<any> {
    const employees = [
      {
        name: 'Mahmoud Hashem',
        email: 'Mahmoud.Hashem.SE@gmail.com',
        password: 'password123',
        group: EmployeeGroup.HR,
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        group: EmployeeGroup.NORMAL_EMPLOYEE,
      },
      {
        name: 'John Smith',
        email: 'John.smith@example.com',
        password: 'password123',
        group: EmployeeGroup.NORMAL_EMPLOYEE,
      },
    ];

    const processedEmployees = await Promise.all(
      employees.map(async (employee) => {
        const email = employee.email.toLowerCase();
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(employee.password, salt);
        return { ...employee, email, password };
      }),
    );

    return this.employeeModel.insertMany(processedEmployees);
  }

  async drop(): Promise<any> {
    return this.employeeModel.deleteMany({});
  }
}
