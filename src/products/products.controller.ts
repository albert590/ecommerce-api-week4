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

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(
    @Body() product: any,
  ) {
    return this.productsService.create(product);
  }

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

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.productsService.remove(id);
  }
}