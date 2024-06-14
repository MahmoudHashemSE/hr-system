import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from '../services/employees.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { EmployeeGroup } from '../enums/employee-group.enum';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  const mockEmployeesService = {
    create: jest.fn(dto => {
      return { id: Date.now(), ...dto };
    }),
    update: jest.fn((id, dto) => {
      return { id, ...dto };
    }),
    findAll: jest.fn(() => {
      return [];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: mockEmployeesService,
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an employee', async () => {
    const createEmployeeDto: CreateEmployeeDto = {
      name: 'Test Employee',
      email: 'test@example.com',
      password: 'password',
      group: EmployeeGroup.NORMAL_EMPLOYEE,
    };

    expect(await controller.create(createEmployeeDto)).toEqual({
      id: expect.any(Number),
      ...createEmployeeDto,
    });

    expect(mockEmployeesService.create).toHaveBeenCalledWith(createEmployeeDto);
  });

  it('should update an employee', async () => {
    const updateEmployeeDto: UpdateEmployeeDto = {
      name: 'Updated Employee',
      email: 'updated@example.com',
    };

    expect(await controller.update('1', updateEmployeeDto)).toEqual({
      id: '1',
      ...updateEmployeeDto,
    });

    expect(mockEmployeesService.update).toHaveBeenCalledWith('1', updateEmployeeDto);
  });

  it('should return an array of employees', async () => {
    expect(await controller.findAll()).toEqual([]);
    expect(mockEmployeesService.findAll).toHaveBeenCalled();
  });
});
