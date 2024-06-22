import { Controller, Get, Post, Delete, Body, UseGuards, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientDto, UpdateEmailDto, UpdatePhoneDto, UpdateAddressDto, UpdateTypeDto, UpdateNoteDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createClientDto: ClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<ClientDto[]> {
    return this.
	clientsService.findAll();
  }

  @Delete('/deleteClient')
  @UseGuards(JwtAuthGuard)
  async remove(@Body('id', ParseIntPipe) id: number) {
    const deletedClient = await this.clientsService.remove(id);
    if (!deletedClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return { message: `Client with ID ${id} has been deleted` };
  }

  @Put('/updateEmail')
  @UseGuards(JwtAuthGuard)
  updateEmail(@Body() updateEmailDto: UpdateEmailDto) {
	const id = updateEmailDto.id
	const email = updateEmailDto.email
    return this.clientsService.updateEmail(id, email);
  }

  @Put('/updatePhone')
  @UseGuards(JwtAuthGuard)
  updatePhone(@Body() UpdatePhoneDto: UpdatePhoneDto) {
	const id = UpdatePhoneDto.id
	const phone = UpdatePhoneDto.phone
    return this.clientsService.updatePhone(id, phone);
  }

  @Put('/updateAddress')
  @UseGuards(JwtAuthGuard)
  updateAddress(@Body() UpdateAddressDto: UpdateAddressDto) {
	const id = UpdateAddressDto.id
	const address = UpdateAddressDto.address
    return this.clientsService.updateAddress(id, address);
  }

  @Put('/updateType')
  @UseGuards(JwtAuthGuard)
  updateType(@Body() updateTypeDto: UpdateTypeDto) {
	const id = updateTypeDto.id
	const type = updateTypeDto.type
    return this.clientsService.updateType(id, type);
  }

  @Put('/updateNote')
  @UseGuards(JwtAuthGuard)
  updateNote(@Body() updateNoteDto: UpdateNoteDto) {
	const id = updateNoteDto.id
	const note = updateNoteDto.note
    return this.clientsService.updateNote(id, note);
  }
}
