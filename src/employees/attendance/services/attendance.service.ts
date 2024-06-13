import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from 'src/employees/schemas/employees.schema';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}
  async create(id: string, createAttendanceDto: CreateAttendanceDto) {
    const { date } = createAttendanceDto;
    const employee = await this.employeeModel.findOne({ id }).exec();
    employee.attendance.push(date);
    return employee.save();
  }
}
