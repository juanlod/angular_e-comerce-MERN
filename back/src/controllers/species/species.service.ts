import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ISpecies, Species } from 'src/mongodb/schemas/species';

@Injectable()
export class SpeciesService {
  constructor(
    @Inject('SPECIES_MODEL')
    private speciesModel: Model<ISpecies>,
  ) {}

  create(species: Species): Promise<Species> {
    return Object.assign({});
  }

  findAll() {
    return this.speciesModel.find();
  }

  findOne(id: string): Promise<Species> {
    return this.speciesModel.findOne({ _id: id });
  }

  update(id: number, species: Species): any {
    return Object.assign({});
  }

  remove(id: number) {
    return `This action removes a #${id} species`;
  }
}
