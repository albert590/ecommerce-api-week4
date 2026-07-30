import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
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
}

export const CartSchema = SchemaFactory.createForClass(Cart);