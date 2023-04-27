import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  IStoreProvider,
  StoreProvider,
} from 'src/mongodb/schemas/store/store-provider';

@Injectable()
export class StoreProviderService {
  constructor(
    @Inject('STORE_PROVIDER_MODEL')
    private storeProviderModel: Model<IStoreProvider>,
  ) {}

  async create(storeProvider: StoreProvider): Promise<any> {
    return await this.storeProviderModel.create(storeProvider);
  }

  findAll() {
    return this.storeProviderModel.find();
  }

  findOne(id: string): Promise<StoreProvider> {
    return this.storeProviderModel.findOne({ _id: id });
  }

  async update(id: number, storeProvider: StoreProvider) {
    const filter = { _id: id };
    const updateData = { $set: storeProvider };
    return await this.storeProviderModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.storeProviderModel.deleteOne({ _id: id });
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
    const results = [];

    const count_values = [];

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(count_values.length / pageSize),
      total_resultados: count_values.length,
    };
  }
}
