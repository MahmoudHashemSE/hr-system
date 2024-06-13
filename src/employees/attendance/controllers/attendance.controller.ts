import { Controller, Post, Body, Param } from '@nestjs/common';
import { AttendanceService } from '../services/attendance.service';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';

@Controller('employees/:id/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async create(
    @Param('id') id: string,
    @Body() createAttendanceDto: CreateAttendanceDto,
  ) {
    return this.attendanceService.create(id, createAttendanceDto);
  }
}
