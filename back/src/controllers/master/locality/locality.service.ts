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
}
