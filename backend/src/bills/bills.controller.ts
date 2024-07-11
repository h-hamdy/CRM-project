import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createBillDto: CreateBillDto) {
    return this.billsService.create(createBillDto);
  }
}
