import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BillsService {
	constructor(private prisma: PrismaService) {}

	async create(createBillDto: CreateBillDto) {
	  const { factureNumber, items } = createBillDto;

	  const existingBill = await this.prisma.bill.findUnique({
		where: { factureNumber },
	  });
  
	  if (existingBill) {
		throw new BadRequestException('Facture number already exists');
	  }
  
	  return this.prisma.bill.create({
		data: {
		  factureNumber,
		  items: {
			create: items as any,
		  },
		},
		include: {
		  items: true,
		},
	  });
	}

	async getBillByFactureNumber(factureNumber: string) {
		return await this.prisma.bill.findUnique({
		  where: { factureNumber },
		});
	  }

	  async findByFactureNumber(factureNumber: string) {
		const bill = await this.prisma.bill.findUnique({
		  where: { factureNumber },
		  include: {
			items: true, // Include related items if needed
		  },
		});
	
		return bill;
	  }
}
