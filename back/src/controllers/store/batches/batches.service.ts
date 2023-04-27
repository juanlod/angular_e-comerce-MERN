import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IBatch, Batch } from 'src/mongodb/schemas/store/batches';

@Injectable()
export class BatchService {
  constructor(
    @Inject('BATCH_MODEL')
    private batchModel: Model<IBatch>,
  ) {}

  async create(batch: Batch): Promise<Batch> {
    return await this.batchModel.create(batch);
  }

  findAll() {
    return this.batchModel.find();
  }

  findOne(id: string): Promise<Batch> {
    return this.batchModel.findOne({ _id: id });
  }

  async update(id: number, batch: Batch) {
    const filter = { _id: id };
    const updateData = { $set: batch };
    return await this.batchModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.batchModel.deleteOne({ _id: id });
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
