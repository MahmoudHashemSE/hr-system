import { IsDate } from 'class-validator';

export class CreateAttendanceDto {
  @IsDate()
  date: Date;
}
