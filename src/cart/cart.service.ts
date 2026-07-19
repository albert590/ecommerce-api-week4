import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<Cart>,
  ) {}

  async getCart(userId: string) {
    return this.cartModel.findOne({ userId });
  }

  async addToCart(userId: string, item: any) {
    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      cart = new this.cartModel({
        userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (i) => i.productId === item.productId,
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }

    return cart.save();
  }

  async removeFromCart(userId: string, productId: string) {
    const cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      return null;
    }

    cart.items = cart.items.filter(
      (item) => item.productId !== productId,
    );

    return cart.save();
  }

  async clearCart(userId: string) {
    return this.cartModel.findOneAndDelete({ userId });
  }
}