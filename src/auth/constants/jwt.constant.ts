import { ConfigService } from '@nestjs/config';
import type { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConstants: JwtModuleAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
    global: true,
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: `${configService.get('JWT_EXPIRES_IN')}`,
    },
  }),
  inject: [ConfigService],
};
