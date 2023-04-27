import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUnityType, UnityType } from 'src/mongodb/schemas/store/unity-type';

@Injectable()
export class UnityTypeService {
  constructor(
    @Inject('UNITY_TYPE_MODEL')
    private unityTypeModel: Model<IUnityType>,
  ) {}

  async create(unityType: UnityType): Promise<any> {
    return await this.unityTypeModel.create(unityType);
  }

  findAll() {
    return this.unityTypeModel.find();
  }

  findOne(id: string): Promise<UnityType> {
    return this.unityTypeModel.findOne({ _id: id });
  }

  async update(id: number, unityType: UnityType) {
    const filter = { _id: id };
    const updateData = { $set: unityType };
    return await this.unityTypeModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.unityTypeModel.deleteOne({ _id: id });
  }

  async findAllPaging(filter?: string, page?: number, pageSize?: number) {
    // If the filter is empty, we use a regular expression that matches everything

    page = page ? page : 1;
    filter = filter ? filter : '';
    pageSize = pageSize ? pageSize : 10;

    let regex = filter ? new RegExp(filter, 'i') : /.*/;
    const offset: number = (page - 1) * pageSize;
    let words = [];

    if (filter) {
      words = filter.split(',').map((word) => word.trim());
      regex = new RegExp(words.join('|'), 'i');
    }

    // Get and count the results
    const results = [];

    const count_values = [];

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(count_values.length / pageSize),
      total_resultados: count_values.length,
    };
  }
}
