import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IProvince, Province } from 'src/mongodb/schemas/province';

@Injectable()
export class ProvinceService {
  constructor(
    @Inject('PROVINCE_MODEL')
    private provinceModel: Model<IProvince>,
  ) {}

  create(province: Province): Province {
    return Object.assign({});
  }

  findAll() {
    return this.provinceModel.find();
  }

  findOne(id: number): Province {
    return Object.assign({});
  }

  update(id: number, province: Province): Province {
    return Object.assign({});
  }

  remove(id: number) {
    return `This action removes a #${id} province`;
  }
}
