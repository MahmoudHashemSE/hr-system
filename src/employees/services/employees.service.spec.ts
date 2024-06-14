import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EmployeesService } from './employees.service';
import { Employee } from '../schemas/employees.schema';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { EmployeeGroup } from '../enums/employee-group.enum';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let model: any;

  const mockEmployeeModel = {
    create: jest.fn().mockImplementation((dto) => ({
      save: jest.fn().mockResolvedValue({ _id: '1', ...dto }),
    })),
    findById: jest.fn().mockResolvedValue({
      save: jest.fn().mockResolvedValue({}),
    }),
    findOne: jest.fn().mockResolvedValue(null),
    find: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getModelToken(Employee.name),
          useValue: mockEmployeeModel,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    model = module.get(getModelToken(Employee.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an employee', async () => {
    const createEmployeeDto: CreateEmployeeDto = {
      name: 'Test Employee',
      email: 'test@example.com',
      password: 'password',
      group: EmployeeGroup.NORMAL_EMPLOYEE,
    };

    model.findOne.mockResolvedValueOnce(null);

    await expect(service.create(createEmployeeDto)).resolves.not.toThrow();
    expect(model.create).toHaveBeenCalledWith(createEmployeeDto);
  });

  it('should not create an employee with an existing email', async () => {
    const createEmployeeDto: CreateEmployeeDto = {
      name: 'Test Employee',
      email: 'test@example.com',
      password: 'password',
      group: EmployeeGroup.NORMAL_EMPLOYEE,
    };

    model.findOne.mockResolvedValueOnce({ email: 'test@example.com' });

    await expect(service.create(createEmployeeDto)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should update an employee', async () => {
    const updateEmployeeDto: UpdateEmployeeDto = {
      name: 'Updated Employee',
      email: 'updated@example.com',
    };

    model.findById.mockResolvedValueOnce({
      save: jest.fn().mockResolvedValue({
        _id: '1',
        ...updateEmployeeDto,
      }),
    });

    await expect(service.update('1', updateEmployeeDto)).resolves.not.toThrow();
    expect(model.findById).toHaveBeenCalledWith('1');
  });

  it('should throw error if employee not found for update', async () => {
    const updateEmployeeDto: UpdateEmployeeDto = {
      name: 'Updated Employee',
      email: 'updated@example.com',
    };

    model.findById.mockResolvedValueOnce(null);

    await expect(service.update('1', updateEmployeeDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should find all employees', async () => {
    await expect(service.findAll()).resolves.toEqual([]);
    expect(model.find).toHaveBeenCalled();
  });
});
