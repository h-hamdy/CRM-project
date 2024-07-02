import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}
	async appendColumns(newColumns: string[] | any[]) {
		if (!Array.isArray(newColumns)) {
		  throw new UnauthorizedException('Invalid request: newColumns must be an array');
		}
	
		const table = await this.prisma.dynamicColumnTable.findUnique({
		  where: { id: 1 },
		});
	
		let updatedColumns: string[] = [];
	
		if (table.columns) {
		  try {
			updatedColumns = JSON.parse(table.columns);
		  } catch (error) {
			throw new UnauthorizedException('Invalid JSON in columns field');
		  }
		}
	
		for (const newColumn of newColumns) {
		  if (updatedColumns.includes(newColumn)) {
			throw new UnauthorizedException(`Column '${newColumn}' already exists`);
		  }
		  updatedColumns.push(newColumn);
		}
	
		return this.prisma.dynamicColumnTable.update({
		  where: { id: 1 },
		  data: { columns: JSON.stringify(updatedColumns) },
		});
	  }

	  async getColumns() {
		const table = await this.prisma.dynamicColumnTable.findUnique({
			where: { id: 1 }, // Assuming ID 1 is your default table
		  });
	  
		  try {
			return table.columns;
		  } catch (error) {
			throw new Error('Invalid JSON in columns field'); // Handle JSON parsing error
		  }
	  }
}
