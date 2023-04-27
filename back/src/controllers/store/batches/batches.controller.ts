import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
0;
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { Batch, IBatch } from 'src/mongodb/schemas/store/batches';
import { BatchService } from './batches.service';

@ApiTags('Batch')
@Controller('/api/batch')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @ApiOperation({
    summary: 'Create a new batch',
    operationId: 'createBatch',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The batch has been successfully created.',
    type: Batch,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  create(@Body() batch: IBatch) {
    return this.batchService.create(batch);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all batchs',
    operationId: 'findAllBatch',
  })
  @ApiOkResponse({
    description: 'Retrieved all batchs successfully.',
    type: [Batch],
  })
  @Get('find_all')
  findAll() {
    return this.batchService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a batch by ID',
    operationId: 'findOneBatch',
  })
  @ApiOkResponse({
    description: 'Retrieved batch successfully.',
    type: Batch,
  })
  @ApiNotFoundResponse({ description: 'Batch not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string): Promise<Batch> {
    return this.batchService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a batch by ID',
    operationId: 'updateBatch',
  })
  @ApiOkResponse({
    description: 'The batch has been successfully updated.',
    type: Batch,
  })
  @ApiNotFoundResponse({ description: 'batch not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: Batch })
  update(@Param('id') id: string, @Body() batch: Batch) {
    return this.batchService.update(+id, batch);
  }

  @ApiOperation({
    summary: 'Remove a batch by ID',
    operationId: 'removeBatch',
  })
  @ApiOkResponse({ description: 'The batch has been successfully removed.' })
  @ApiNotFoundResponse({ description: 'batch not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.batchService.remove(+id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all batchs with pagination',
    operationId: 'findAllPagingBatch',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all batchs paginated.',
    type: [Batch],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.batchService.findAllPaging(filter, page, pageSize);
  }
}
