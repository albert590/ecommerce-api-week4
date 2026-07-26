import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}



  async register(registerDto: any) {

    const user =
      await this.usersService.create(
        registerDto
      );


    return {
      message: "User registered successfully",
      user,
    };

  }





  async login(loginDto: any) {

    const user =
      await this.usersService.findByEmail(
        loginDto.email
      );


    if (!user) {

      throw new UnauthorizedException(
        "Invalid email or password"
      );

    }



    const passwordValid =
      await this.usersService.validatePassword(
        loginDto.password,
        user.password
      );



    if (!passwordValid) {

      throw new UnauthorizedException(
        "Invalid email or password"
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

      message:
        "Login successful",


      access_token,


      user: {

        _id:
          user._id.toString(),

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,

      },

    };

  }

}