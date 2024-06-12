import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/login.dto';
import { Public } from '../constants/jwt-public.constant';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() req: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ access_token: string }> {
    const result = await this.authService.login(req);
    const expiresIn = 60 * 24 * 60 * 60 * 1000; // 60 days
    const expirationDate = new Date(Date.now() + expiresIn);

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: expirationDate,
    });

    return result;
  }
}
