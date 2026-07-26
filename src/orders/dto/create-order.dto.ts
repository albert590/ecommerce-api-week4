import { ApiProperty } from '@nestjs/swagger';


export class CreateOrderItemDto {

  @ApiProperty()
  productId: string;


  @ApiProperty()
  name: string;


  @ApiProperty()
  price: number;


  @ApiProperty()
  quantity: number;

}



export class CreateOrderDto {


  @ApiProperty()
  userId: string;



  @ApiProperty({
    type: [CreateOrderItemDto],
  })
  items: CreateOrderItemDto[];



  @ApiProperty()
  totalAmount: number;

}