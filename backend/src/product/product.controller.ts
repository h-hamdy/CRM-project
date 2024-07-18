import { Controller, Get, Post, Body, UseGuards, Param, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateColumnsDto, InsertDataDto } from './dto/create-columns.dto';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}


	  @Get('')
  @UseGuards(JwtAuthGuard)
	  async getColumnsByTableId(@Param('tableId') tableId: number) {
		try {
			const columns = await this.productService.getColumnsByTableId(tableId);
			const columnNames = columns.map((column : any) => column.name);
			return columnNames;
		  } catch (error) {
			return { message: 'Failed to fetch columns' };
		  }
	  }

	@Post('columns')
	@UseGuards(JwtAuthGuard)
	async createTableWithColumns(@Body() createColumnsDto: CreateColumnsDto) {
	  return this.productService.createTableWithColumns(createColumnsDto);
	}
  
	@Post('data')
	@UseGuards(JwtAuthGuard)
	async insertData(@Body() insertDataDto: InsertDataDto) {
	  return this.productService.insertData(insertDataDto);
	}

	@Get('data-rows')
	@UseGuards(JwtAuthGuard)
  async getAllDataRows() {
    try {
      return await this.productService.getAllDataRows();
    } catch (error) {
      // Handle the error, for example:
      return { message: 'Failed to fetch data rows' };
    }
  }

  @Post('data-rows-by-client')
  @UseGuards(JwtAuthGuard)
  async getDataRowsByClient(@Body('client') client: string) {
    try {
      return await this.productService.getDataRowsByClient(client);
    } catch (error) {
      // Handle the error, for example:
      return { message: 'Failed to fetch data rows' };
    }
  }
}
