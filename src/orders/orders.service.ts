import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Order,
  OrderDocument,
} from './schemas/order.schema';

import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  // CREATE ORDER
  async create(
    orderData: CreateOrderDto,
  ) {
    console.log('========== ORDER RECEIVED ==========');
    console.log(orderData);
    console.log('====================================');

    const order = new this.orderModel({
      userId: orderData.userId,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      status: 'pending',
    });

    return await order.save();
  }

  // GET ALL ORDERS
  async findAll() {
    return await this.orderModel
      .find()
      .sort({ createdAt: -1 });
  }

  // GET ORDERS FOR ONE USER
  async findByUser(
    userId: string,
  ) {
    return await this.orderModel
      .find({ userId })
      .sort({ createdAt: -1 });
  }

  // UPDATE ORDER STATUS
  async updateStatus(
    id: string,
    status: string,
  ) {
    return await this.orderModel.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      },
    );
  }

  // DELETE ORDER
  async remove(
    id: string,
  ) {
    return await this.orderModel.findByIdAndDelete(
      id,
    );
  }
}