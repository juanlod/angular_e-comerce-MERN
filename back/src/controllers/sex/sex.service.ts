import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ISex, Sex } from 'src/mongodb/schemas/sex';

@Injectable()
export class SexService {
  constructor(
    @Inject('SEX_MODEL')
    private sexModel: Model<ISex>,
  ) {}

  create(sex: Sex): Sex {
    return Object.assign({});
  }

  findAll() {
    return this.sexModel.find();
  }

  findOne(id: number): Sex {
    return Object.assign({});
  }

  update(id: number, sex: Sex): Sex {
    return Object.assign({});
  }

  remove(id: number) {
    return `This action removes a #${id} sex`;
  }
}
