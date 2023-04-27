import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ISex, Sex } from 'src/mongodb/schemas/master/sex';

@Injectable()
export class SexService {
  constructor(
    @Inject('SEX_MODEL')
    private sexModel: Model<ISex>,
  ) {}

  async create(sex: Sex): Promise<any> {
    return await this.sexModel.create(sex);
  }

  async findAll() {
    return await this.sexModel.find().exec();
  }

  async findOne(id: number): Promise<any> {
    return await this.sexModel.findOne({ _id: id });
  }

  async update(id: number, sex: Sex) {
    const filter = { _id: id };
    const updateData = { $set: sex };
    return await this.sexModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.sexModel.deleteOne({ _id: id });
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
