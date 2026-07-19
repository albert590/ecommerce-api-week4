import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

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
      return {
        message: 'Invalid credentials',
      };
    }

    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
    });

    return {
      message: 'Login successful',
      access_token: token,
    };
  }
}