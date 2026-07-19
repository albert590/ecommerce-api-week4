import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(productData: any) {
    const product = new this.productModel(productData);
    return product.save();
  }

  async findAll() {
    return this.productModel.find();
  }

  async findOne(id: string) {
    return this.productModel.findById(id);
  }

  async update(id: string, productData: any) {
    return this.productModel.findByIdAndUpdate(
      id,
      productData,
      { new: true },
    );
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
