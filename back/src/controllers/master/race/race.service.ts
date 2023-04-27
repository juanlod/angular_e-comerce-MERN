import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IRace, Race } from 'src/mongodb/schemas/master/race';

@Injectable()
export class RaceService {
  constructor(
    @Inject('RACE_MODEL')
    private raceModel: Model<IRace>,
  ) {}

  async create(race: Race): Promise<any> {
    return await this.raceModel.create(race);
  }

  async findAll() {
    return await this.raceModel.find().exec();
  }

  async findOne(id: number): Promise<any> {
    return await this.raceModel.findOne({ _id: id });
  }

  async update(id: number, race: Race) {
    const filter = { _id: id };
    const updateData = { $set: race };
    return await this.raceModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.raceModel.deleteOne({ _id: id });
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
