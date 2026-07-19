import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop([
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ])
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 'Pending' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);