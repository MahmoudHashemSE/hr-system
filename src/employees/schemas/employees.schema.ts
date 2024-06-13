import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EmployeeGroup } from '../enums/employee-group.enum';
import * as bcrypt from 'bcrypt';

@Schema()
export class Employee extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: EmployeeGroup })
  group: EmployeeGroup;

  @Prop()
  attendance: Date[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.pre<Employee>('save', async function (next) {
  if (this.isModified('email') || this.isNew) {
    this.email = this.email.toLowerCase();
  }

  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
