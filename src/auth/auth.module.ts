import { Module } from '@nestjs/common';
import { EmployeesModule } from '../employees/employees.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    EmployeesModule,
    PassportModule,
    JwtModule.registerAsync(jwtConstants),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
