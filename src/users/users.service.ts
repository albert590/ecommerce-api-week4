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

    const { password, ...safeUser } =
      savedUser.toObject();

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
    return bcrypt.compare(
      password,
      hashedPassword,
    );
  }

  // Save password reset token
  async saveResetToken(
    email: string,
    token: string,
  ) {
    return this.userModel.findOneAndUpdate(
      { email },
      {
        resetToken: token,
        resetTokenExpiry:
          new Date(
            Date.now() + 1000 * 60 * 30,
          ), // 30 minutes
      },
      { new: true },
    );
  }

  // Find user by reset token
  async findByResetToken(
    token: string,
  ) {
    return this.userModel.findOne({
      resetToken: token,
      resetTokenExpiry: {
        $gt: new Date(),
      },
    });
  }

  // Update password
  async updatePassword(
    userId: string,
    newPassword: string,
  ) {
    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10,
      );

    return this.userModel.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(
      id,
    );
  }
}