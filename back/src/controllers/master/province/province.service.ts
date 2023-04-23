import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IProvince, Province } from 'src/mongodb/schemas/master/province';

@Injectable()
export class ProvinceService {
  constructor(
    @Inject('PROVINCE_MODEL')
    private provinceModel: Model<IProvince>,
  ) {}

  async create(province: Province): Promise<any> {
    return await this.provinceModel.create(province);
  }

  async findAll() {
    return await this.provinceModel.find().exec();
  }

  async findOne(id: number): Promise<any> {
    return await this.provinceModel.findOne({ _id: id });
  }

  async update(id: number, province: Province) {
    const filter = { _id: id };
    const updateData = { $set: province };
    return await this.provinceModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.provinceModel.deleteOne({ _id: id });
  }
}
