import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './schemas/product.schema';
import { products } from './seed-products';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}


  // CREATE PRODUCT
  async create(productData: any) {
    const product = new this.productModel(productData);
    return product.save();
  }


  // GET ALL PRODUCTS
  async findAll() {
    return this.productModel.find();
  }


  // GET SINGLE PRODUCT
  async findOne(id: string) {
    return this.productModel.findById(id);
  }


  // UPDATE PRODUCT
  async update(id: string, productData: any) {
    return this.productModel.findByIdAndUpdate(
      id,
      productData,
      { new: true },
    );
  }


  // DELETE PRODUCT
  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }


  // SEED PRODUCTS
  async seedProducts() {

    const count = await this.productModel.countDocuments();

    if (count > 0) {
      return {
        message: "Products already exist",
        count,
      };
    }


    await this.productModel.insertMany(products);


    return {
      message: "Products seeded successfully",
      count: products.length,
    };
  }

}