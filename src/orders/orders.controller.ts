import {
  Controller,
  Post,
  Body,
  Get,
 Patch,
  Delete,
  Param,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  // CREATE ORDER
  @Post()
  create(
    @Body() orderData: CreateOrderDto,
  ) {
    return this.ordersService.create(orderData);
  }

  // GET ALL ORDERS (ADMIN)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // GET ORDERS FOR A SPECIFIC USER
  @Get(':userId')
  findUserOrders(
    @Param('userId') userId: string,
  ) {
    return this.ordersService.findByUser(userId);
  }

  // UPDATE ORDER STATUS
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.ordersService.updateStatus(
      id,
      body.status,
    );
  }

  // DELETE ORDER
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.ordersService.remove(id);
  }
}