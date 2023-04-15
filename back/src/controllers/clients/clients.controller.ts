import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Auth } from 'auth/auth.decorator';
import { Role } from 'auth/role';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { Client, IClient } from 'src/mongodb/schemas/client';

@Controller('api/clients')
@ApiTags('Clients')
export class ClientsController {
  private readonly logger = new Logger(ClientsController.name);

  constructor(private readonly clientsService: ClientsService) {}

  @Post('save')
  @ApiOperation({ summary: 'Create a new client', operationId: 'createClient' })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully created.',
    type: Client,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() client: IClient): IClient {
    return this.clientsService.create(client);
  }

  @ApiOperation({
    summary: 'Obtener todos los clientes',
    operationId: 'findAllClient',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los clientes',
    type: [Client],
  })
  @Get('find_all')
  findAll(): Client[] {
    return this.clientsService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener clientes paginados',
    operationId: 'findAllPagingClient',
  })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Filtro para buscar clientes',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Número de elementos por página',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes paginados',
    type: [Client],
  })
  @Get('find_all/paging')
  @Auth(Role.Admin)
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.clientsService.findAllPaging(filter, page, pageSize);
  }

  @ApiOperation({
    summary: 'Obtener un cliente por id',
    operationId: 'findOneClient',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El ID del cliente a buscar',
  })
  @ApiResponse({
    status: 200,
    description: 'El cliente ha sido encontrado satisfactoriamente',
    type: Client,
  })
  @ApiResponse({ status: 404, description: 'El cliente no ha sido encontrado' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({
    summary: 'Actualizar un cliente por id',
    operationId: 'updateClient',
  })
  @ApiParam({
    name: 'id',
    description: 'El ID del cliente a actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'El cliente ha sido actualizado satisfactoriamente',
  })
  @ApiResponse({ status: 404, description: 'El cliente no ha sido encontrado' })
  update(@Param('id') id: string, @Body() client: IClient) {
    return this.clientsService.update(+id, client);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Eliminar un cliente por id',
    operationId: 'removeClient',
  })
  @ApiParam({
    name: 'id',
    description: 'El ID del cliente a eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'El cliente ha sido eliminado satisfactoriamente',
  })
  @ApiResponse({ status: 404, description: 'El cliente no ha sido encontrado' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
