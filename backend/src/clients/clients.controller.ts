import { Controller, Get, Post, Delete, Body, UseGuards, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Adjust the path as needed

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
  async remove(@Body('id', ParseIntPipe) id: number) {
    const deletedClient = await this.clientsService.remove(id);
    if (!deletedClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return { message: `Client with ID ${id} has been deleted` };
  }
}
