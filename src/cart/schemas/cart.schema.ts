import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Cart extends Document {

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