import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AttendanceService } from './attendance.service';
import { Employee } from 'src/employees/schemas/employees.schema';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';

describe('AttendanceService', () => {
  let service: AttendanceService;
  let model: any;

  const mockEmployeeModel = {
    findOne: jest.fn().mockResolvedValue({
      attendance: [],
      save: jest.fn().mockResolvedValue({}),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendanceService,
        {
          provide: getModelToken(Employee.name),
          useValue: mockEmployeeModel,
        },
      ],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
    model = module.get(getModelToken(Employee.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an attendance record for an employee', async () => {
    const createAttendanceDto: CreateAttendanceDto = {
      date: new Date(),
    };

    model.findOne.mockResolvedValueOnce({
      attendance: [],
      save: jest.fn().mockResolvedValue({}),
    });

    await expect(
      service.create('1', createAttendanceDto),
    ).resolves.not.toThrow();
    expect(model.findOne).toHaveBeenCalledWith({ _id: '1' });
  });
});
