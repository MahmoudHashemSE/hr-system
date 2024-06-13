import { Model } from 'mongoose';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from '../schemas/employees.schema';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { name, email, password, group } = createEmployeeDto;

    const existingEmployee = await this.employeeModel.findOne({ email }).exec();

    if (existingEmployee) {
      throw new ConflictException('Employee with this email already exists');
    }

    const createdEmployee = new this.employeeModel({
      name,
      email,
      password,
      group,
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

    employee.name = name;
    employee.email = email;

    await employee.save();

    return employee;
  }

  async findEmployee(email: string): Promise<Employee> {
    const user = await this.employeeModel.findOne({
      email: email.toLowerCase(),
    });

    return user?.toObject();
  }

  async findAll(): Promise<Employee[]> {
    const users = await this.employeeModel.find();

    return users;
  }
}
