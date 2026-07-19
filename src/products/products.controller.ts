import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';


@Controller('products')
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService,
  ) {}


  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  create(
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto);
  }


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


  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ) {
    return this.productsService.update(
      id,
      updateProductDto,
    );
  }


  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  remove(
    @Param('id') id: string,
  ) {
    return this.productsService.remove(id);
  }
}