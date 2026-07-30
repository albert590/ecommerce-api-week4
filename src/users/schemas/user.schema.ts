import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'customer' })
  role: string;

  // Password Reset Token
  @Prop({ default: null })
  resetToken: string;

  // Password Reset Token Expiry
  @Prop({ default: null })
  resetTokenExpiry: Date;
}

export const UserSchema =
  SchemaFactory.createForClass(User);