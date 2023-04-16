import { Inject, Injectable, Logger } from '@nestjs/common';
import { countValues, getClientListPipeline } from './client.repository';
import { Model } from 'mongoose';
import { IClient } from 'src/mongodb/schemas/client';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    @Inject('CLIENT_MODEL')
    private clientModel: Model<IClient>,
  ) {}

  create(client: IClient) {
    const result = this.clientModel.findOne({ indentif: client.Identif });
    return client;
  }

  findAll(): IClient[] {
    return new Array<IClient>();
  }

  async findAllPaging(filter?: string, page?: number, pageSize?: number) {
    // If the filter is empty, we use a regular expression that matches everything

    page = page ? page : 1;
    filter = filter ? filter : '';
    pageSize = pageSize ? pageSize : 10;

    let regex = filter ? new RegExp(filter, 'i') : /.*/;
    const offset: number = (page - 1) * pageSize;
    let words = [];

    if (filter) {
      words = filter.split(',').map((word) => word.trim());
      regex = new RegExp(words.join('|'), 'i');
    }

    // Get and count the results
    const results = await this.clientModel.aggregate(
      getClientListPipeline(regex, offset, pageSize, words.length),
    );

    const count_values = await this.clientModel
      .aggregate(countValues(regex, words.length))
      .exec();

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(count_values.length / pageSize),
      total_resultados: count_values.length,
    };
  }

  findOne(id: number): IClient {
    return Object.assign({});
  }

  update(id: number, client: any): IClient {
    return Object.assign({});
  }

  remove(id: number) {
    return 'User deleted';
  }
}
