import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IRace, Race } from 'src/mongodb/schemas/race';

@Injectable()
export class RaceService {
  constructor(
    @Inject('RACE_MODEL')
    private raceModel: Model<IRace>,
  ) {}

  create(race: Race): Race {
    return Object.assign({});
  }

  findAll() {
    return this.raceModel.find();
  }

  findOne(id: number): Race {
    return Object.assign({});
  }

  update(id: number, race: Race): Race {
    return Object.assign({});
  }

  remove(id: number) {
    return `This action removes a #${id} race`;
  }
}
