import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ILocality, Locality } from 'src/mongodb/schemas/locality';

@Injectable()
export class LocalityService {
  constructor(
    @Inject('LOCALITY_MODEL')
    private localityModel: Model<ILocality>,
  ) {}

  create(locality: Locality): ILocality {
    return Object.assign({});
  }

  findAll() {
    return this.localityModel.find();
  }

  findOne(id: number): Locality {
    return Object.assign({});
  }

  update(id: number, locality: Locality): ILocality {
    return Object.assign({});
  }

  remove(id: number) {
    return `This action removes a #${id} locality`;
  }
}
