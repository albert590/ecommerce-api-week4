import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {

    console.log(
      "DTO INSTANCE:",
      registerDto instanceof RegisterDto
    );

    console.log(
      "DTO DATA:",
      registerDto
    );

    return this.authService.register(registerDto);
  }


  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

}