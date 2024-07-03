import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColumnsDto, InsertDataDto } from './dto/create-columns.dto';


@Injectable()
export class ProductService {
	// private readonly logger = new Logger(ProductService.name);


  constructor(private prisma: PrismaService) {}

  async getColumnsByTableId(tableId: number) {
	return this.prisma.column.findMany({
	  where: {
		tableId: 1,
	  },
	});
  }

  async createTableWithColumns(createColumnsDto: CreateColumnsDto) {
    const { tableName, columns } = createColumnsDto;

    // Check if a Table with id = 1 already exists
    let table = await this.prisma.table.findUnique({
      where: { id: 1 },
    });

    if (!table) {
      // Create the Table with id = 1 if it doesn't exist
      table = await this.prisma.table.create({
        data: {
          id: 1,
          name: tableName,
        },
      });
    } else {
      throw new ConflictException('Table with id = 1 already exists');
    }

    // Create columns for the new Table
    const columnData = columns.map(column => ({
      name: column.name,
      tableId: table.id,
    }));

    await this.prisma.column.createMany({
      data: columnData,
    });

    return table;
  }

  async getAllDataRows() {
    return this.prisma.rowData.findMany();
  }

  async insertData(insertDataDto: InsertDataDto) {
    const { data } = insertDataDto;

    try {
    //   this.logger.debug('Inserting data:', data);

      const rowData = await this.prisma.rowData.create({
        data: {
          table: { connect: { id: 1 } },
          data: data,
        },
      });

      return rowData;
    } catch (error) {
    //   this.logger.error('Failed to insert data:', error);

      if (error.code === 'P2002') {
        throw new ConflictException('Data insertion failed due to a conflict.');
      }

      throw new Error('Failed to insert data.');
    }
  }
}
