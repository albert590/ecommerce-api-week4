import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService,
  ) {}


  // GET ALL PRODUCTS
  @Get()
  findAll() {
    return this.productsService.findAll();
  }


  // SEED PRODUCTS
  @Get('seed')
  seedProducts() {
    return this.productsService.seedProducts();
  }


  // GET SINGLE PRODUCT
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.productsService.findOne(id);
  }


  // CREATE PRODUCT
  @Post()
  create(
    @Body() product: any,
  ) {
    return this.productsService.create(product);
  }


  // UPDATE PRODUCT
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() product: any,
  ) {
    return this.productsService.update(
      id,
      product,
    );
  }


  // DELETE PRODUCT
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.productsService.remove(id);
  }

}