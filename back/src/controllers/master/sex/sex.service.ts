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
}
