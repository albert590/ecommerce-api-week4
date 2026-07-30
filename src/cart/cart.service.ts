import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,
  ) {}

  async addToCart(userId: string, item: any) {
    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      return this.cartModel.create({
        userId,
        items: [item],
      });
    }

    const existingItem = cart.items.find(
      (i: any) => i.productId.toString() === item.productId.toString(),
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }

    return this.cartModel.findOneAndUpdate(
      { userId },
      { items: cart.items },
      { new: true },
    );
  }

  async getCart(userId: string) {
    return this.cartModel.findOne({ userId });
  }

  async removeFromCart(userId: string, productId: string) {
    const cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      return null;
    }

    cart.items = cart.items.filter(
      (item: any) => item.productId.toString() !== productId,
    );

    return this.cartModel.findOneAndUpdate(
      { userId },
      { items: cart.items },
      { new: true },
    );
  }

  async clearCart(userId: string) {
    return this.cartModel.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true },
    );
  }
}