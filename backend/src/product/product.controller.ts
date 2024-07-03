import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateColumnsDto, InsertDataDto } from './dto/create-columns.dto';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}


	  @Get('')
	  async getColumnsByTableId(@Param('tableId') tableId: number) {
		try {
			const columns = await this.productService.getColumnsByTableId(tableId);
			const columnNames = columns.map(column => column.name);
			return columnNames;
		  } catch (error) {
			// Handle the error, for example:
			return { message: 'Failed to fetch columns' };
		  }
	  }

	@Post('columns')
	async createTableWithColumns(@Body() createColumnsDto: CreateColumnsDto) {
	  return this.productService.createTableWithColumns(createColumnsDto);
	}
  
	@Post('data')
	async insertData(@Body() insertDataDto: InsertDataDto) {
	  return this.productService.insertData(insertDataDto);
	}

	@Get('data-rows')
  async getAllDataRows() {
    try {
      return await this.productService.getAllDataRows();
    } catch (error) {
      // Handle the error, for example:
      return { message: 'Failed to fetch data rows' };
    }
  }
}
