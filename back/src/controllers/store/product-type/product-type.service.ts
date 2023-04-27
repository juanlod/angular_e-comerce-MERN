import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  IProductType,
  ProductType,
} from 'src/mongodb/schemas/store/product-type';

@Injectable()
export class ProductTypeService {
  constructor(
    @Inject('PRODUCT_TYPE_MODEL')
    private productTypeModel: Model<IProductType>,
  ) {}

  async create(productType: ProductType): Promise<any> {
    return await this.productTypeModel.create(productType);
  }

  findAll() {
    return this.productTypeModel.find();
  }

  findOne(id: string): Promise<ProductType> {
    return this.productTypeModel.findOne({ _id: id });
  }

  async update(id: number, productType: ProductType) {
    const filter = { _id: id };
    const updateData = { $set: productType };
    return await this.productTypeModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.productTypeModel.deleteOne({ _id: id });
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
