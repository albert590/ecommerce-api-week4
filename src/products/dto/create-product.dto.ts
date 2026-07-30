import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  name: string;


  @IsString()
  @IsNotEmpty()
  description: string;


  @IsNumber()
  @IsNotEmpty()
  price: number;


  @IsNumber()
  @IsOptional()
  stock?: number;


  @IsString()
  @IsOptional()
  category?: string;


  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}