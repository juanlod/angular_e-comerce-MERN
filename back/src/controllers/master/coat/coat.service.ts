import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ICoat, Coat } from 'src/mongodb/schemas/master/coat';

@Injectable()
export class CoatService {
  constructor(
    @Inject('COAT_MODEL')
    private coatModel: Model<ICoat>,
  ) {}

  async create(coat: Coat): Promise<any> {
    return await this.coatModel.create(coat);
  }

  findAll() {
    return this.coatModel.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.coatModel.findOne({ _id: id });
  }

  async update(id: number, coat: Coat) {
    const filter = { _id: id };
    const updateData = { $set: coat };
    return await this.coatModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.coatModel.deleteOne({ _id: id });
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
