import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSeeder } from './employees.seeder';
import {
  Employee,
  EmployeeSchema,
} from '../employees/schemas/employees.schema';

seeder({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
}).run([EmployeeSeeder]);
