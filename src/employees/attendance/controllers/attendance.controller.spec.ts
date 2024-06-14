import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from '../services/attendance.service';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';

describe('AttendanceController', () => {
  let controller: AttendanceController;
  let service: AttendanceService;

  const mockAttendanceService = {
    create: jest.fn((id, dto) => {
      return { id, ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceController],
      providers: [
        {
          provide: AttendanceService,
          useValue: mockAttendanceService,
        },
      ],
    }).compile();

    controller = module.get<AttendanceController>(AttendanceController);
    service = module.get<AttendanceService>(AttendanceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an attendance record', async () => {
    const createAttendanceDto: CreateAttendanceDto = {
      date: new Date(),
    };

    expect(await controller.create('1', createAttendanceDto)).toEqual({
      id: '1',
      ...createAttendanceDto,
    });

    expect(mockAttendanceService.create).toHaveBeenCalledWith('1', createAttendanceDto);
  });
});
