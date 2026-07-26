import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type OrderDocument = Order & Document;


@Schema({
  timestamps: true,
})
export class Order {


  @Prop({
    required: true,
  })
  userId: string;



  @Prop({
    required: true,
    type: Array,
  })
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];



  @Prop({
    required: true,
  })
  totalAmount: number;



  @Prop({
    default: 'pending',
  })
  status: string;


}


export const OrderSchema =
  SchemaFactory.createForClass(Order);