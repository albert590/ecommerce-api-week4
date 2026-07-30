import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

import { UsersService } from '../users/users.service';

import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: any) {
    const user = await this.usersService.create(registerDto);

    return {
      message: 'User registered successfully',
      user,
    };
  }

  async login(loginDto: any) {
    const user = await this.usersService.findByEmail(
      loginDto.email,
    );

    if (!user) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const passwordValid =
      await this.usersService.validatePassword(
        loginDto.password,
        user.password,
      );

    if (!passwordValid) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const payload = {
      sub: user._id.toString(),
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const access_token =
      this.jwtService.sign(payload);

    return {
      message: 'Login successful',

      access_token,

      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // Forgot Password
  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ) {
    const user = await this.usersService.findByEmail(
      forgotPasswordDto.email,
    );

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    // Generate a unique reset token
    const token = randomUUID();

    // Save the token in the database
    await this.usersService.saveResetToken(
      user.email,
      token,
    );

    // For testing, return the token.
    // In production, send it by email.
    return {
      message: 'Password reset token generated successfully.',
      token,
    };
  }

  // Reset Password
  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ) {
    const user =
      await this.usersService.findByResetToken(
        resetPasswordDto.token,
      );

    if (!user) {
      throw new UnauthorizedException(
        'Invalid or expired reset token',
      );
    }

    await this.usersService.updatePassword(
      user._id.toString(),
      resetPasswordDto.newPassword,
    );

    return {
      message: 'Password reset successfully.',
    };
  }
}