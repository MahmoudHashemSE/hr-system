import { Model } from 'mongoose';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from '../schemas/employees.schema';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeeGroup } from '../enums/employee-group.enum';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { name, email } = createEmployeeDto;
    const existingEmployee = await this.employeeModel.findOne({ email }).exec();
    if (existingEmployee) {
      throw new ConflictException('Employee with this email already exists');
    }
    const createdEmployee = new this.employeeModel({
      name,
      email,
      group: EmployeeGroup.NORMAL_EMPLOYEE,
    });
    return createdEmployee.save();
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const { name, email } = updateEmployeeDto;

    const employee = await this.employeeModel.findById(id);

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    if (employee.group !== EmployeeGroup.NORMAL_EMPLOYEE) {
      throw new ForbiddenException(
        `Only employees in the NORMAL group can be updated`,
      );
    }

    employee.name = name;
    employee.email = email;

    await employee.save();

    return employee;
  }

  async findEmployee(email: string): Promise<Employee> {
    const user = await this.employeeModel.findOne({ email });

    return user?.toObject();
  }

  async findAll(): Promise<Employee[]> {
    const users = await this.employeeModel.find();

    return users;
  }
}
