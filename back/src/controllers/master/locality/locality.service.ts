import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ILocality, Locality } from 'src/mongodb/schemas/master/locality';

@Injectable()
export class LocalityService {
  constructor(
    @Inject('LOCALITY_MODEL')
    private localityModel: Model<ILocality>,
  ) {}

  async create(locality: Locality): Promise<any> {
    return await this.localityModel.create(locality);
  }

  findAll() {
    return this.localityModel.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.localityModel.findOne({ _id: id });
  }

  async update(id: number, locality: Locality) {
    const filter = { _id: id };
    const updateData = { $set: locality };
    return await this.localityModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.localityModel.deleteOne({ _id: id });
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
