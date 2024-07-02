import { Controller, Patch, Get, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}


	@Get('') // Define a GET endpoint to retrieve columns
	@UseGuards(JwtAuthGuard) // Use the same guard as PATCH endpoint if needed
	async getColumns() {
	  // Implement logic to fetch and return columns from service
	  return this.productService.getColumns();
	}

	@Patch('columns')
	@UseGuards(JwtAuthGuard)
	async appendColumns(@Body('newColumns') newColumns: string[]) {
    return this.productService.appendColumns(newColumns);
  }
}
