import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IRace, Race } from 'src/mongodb/schemas/master/race';

@Injectable()
export class RaceService {
  constructor(
    @Inject('RACE_MODEL')
    private raceModel: Model<IRace>,
  ) {}

  async create(race: Race): Promise<any> {
    return await this.raceModel.create(race);
  }

  async findAll() {
    return await this.raceModel.find().exec();
  }

  async findOne(id: number): Promise<any> {
    return await this.raceModel.findOne({ _id: id });
  }

  async update(id: number, race: Race) {
    const filter = { _id: id };
    const updateData = { $set: race };
    return await this.raceModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.raceModel.deleteOne({ _id: id });
  }
}
