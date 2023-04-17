import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ICoat, Coat } from 'src/mongodb/schemas/coat';

@Injectable()
export class CoatService {
  constructor(
    @Inject('COAT_MODEL')
    private coatModel: Model<ICoat>,
  ) {}

  create(coat: Coat): Coat {
    return Object.assign({});
  }

  findAll() {
    return this.coatModel.find();
  }

  findOne(id: number): Coat {
    return Object.assign({});
  }

  update(id: number, coat: Coat): Coat {
    return Object.assign({});
  }

  remove(id: number) {
    return `This action removes a #${id} coat`;
  }
}
