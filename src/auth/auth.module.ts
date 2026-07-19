import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from '../users/users.module';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],

  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
  ],

  controllers: [
    AuthController,
  ],
})
export class AuthModule {}