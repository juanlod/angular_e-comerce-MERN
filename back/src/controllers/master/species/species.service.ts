import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ISpecies, Species } from 'src/mongodb/schemas/master/species';

@Injectable()
export class SpeciesService {
  constructor(
    @Inject('SPECIES_MODEL')
    private speciesModel: Model<ISpecies>,
  ) {}

  async create(species: Species): Promise<Species> {
    return await this.speciesModel.create(species);
  }

  findAll() {
    return this.speciesModel.find();
  }

  findOne(id: string): Promise<Species> {
    return this.speciesModel.findOne({ _id: id });
  }

  async update(id: number, species: Species) {
    const filter = { _id: id };
    const updateData = { $set: species };
    return await this.speciesModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.speciesModel.deleteOne({ _id: id });
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
