import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBillDto } from './dto/create-bill.dto';

@Injectable()
export class BillsService {
	constructor(private prisma: PrismaService) {}

	async create(createBillDto: CreateBillDto) {
	  const { factureNumber, items } = createBillDto;
  
	  return this.prisma.bill.create({
		data: {
		  factureNumber,
		  items: {
			create: items,
		  },
		},
		include: {
		  items: true,
		},
	  });
	}
}
