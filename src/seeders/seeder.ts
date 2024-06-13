import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSeeder } from './employees.seeder';
import {
  Employee,
  EmployeeSchema,
} from '../employees/schemas/employees.schema';

seeder({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Seniory:Test1Test@cluster0.ejzdvgv.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
}).run([EmployeeSeeder]);
