import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(userData: any) {

    if (!userData.password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await bcrypt.hash(
      userData.password,
      10,
    );

    const user = new this.userModel({
      ...userData,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const { password, ...safeUser } = savedUser.toObject();

    return safeUser;
  }


  async findAll() {
    return this.userModel.find();
  }


  async findOne(id: string) {
    return this.userModel.findById(id);
  }


  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }


  async validatePassword(
    password: string,
    hashedPassword: string,
  ) {
    return bcrypt.compare(password, hashedPassword);
  }


  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

}