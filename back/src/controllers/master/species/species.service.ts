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
}
