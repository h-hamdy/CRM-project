import { Controller, Post, Body, Get, UseGuards, NotFoundException, Param, BadRequestException } from '@nestjs/common';
import { BillsService } from './bills.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BillInfo, CreateBillDto } from './dto/create-bill.dto';
import { CheckFactureDto } from './dto/create-check-facture.dto';
import { FetchBillDto } from './dto/fetch-bill.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createBillDto: CreateBillDto) {
    return this.billsService.create(createBillDto);
  }

  @Post('get-by-facture-number')
  @UseGuards(JwtAuthGuard)
  async getBillInfoByFactureNumber(@Body() body: { factureNumber: string }){
    const { factureNumber } = body;
    const billInfo = await this.billsService.findFactureNumber(factureNumber);

    if (!billInfo) {
      throw new NotFoundException('BillInfo not found');
    }

    return billInfo;
  }

  @Post('create-bill-info')
  @UseGuards(JwtAuthGuard)
  async createBillInfo(@Body() billInfoDto: BillInfo) {
    return this.billsService.createBillInfo(billInfoDto);
  }

  @Post('exists')
  @UseGuards(JwtAuthGuard)
  async checkFactureNumber(@Body() checkFactureDto: CheckFactureDto) {
    const { factureNumber } = checkFactureDto;
    console.log(`Checking facture number: ${factureNumber}`);
    const bill = await this.billsService.getBillByFactureNumber(factureNumber);
    if (!bill) {
		return { exists: false };
    }
    return { exists: true };
  }

  @Post('fetch-by-facture-number')
  @UseGuards(JwtAuthGuard)
  async fetchByFactureNumber(@Body() fetchBillDto: FetchBillDto) {
    const { factureNumber } = fetchBillDto;

    const bill = await this.billsService.findByFactureNumber(factureNumber);
    if (!bill) {
      throw new BadRequestException('Bill with provided factureNumber not found');
    }

    return bill;
  }
}
