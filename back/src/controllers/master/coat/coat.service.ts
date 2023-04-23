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
}
