import { FilterQuery, Model } from 'mongoose';

import { HttpStatus } from '@nestjs/common';
import {
  DefaultPaginatedResponse,
  DefaultSingleResponse,
} from '@interfaces/response';
import { DefaultPaginatedQueryRequest } from '@interfaces/request';
import { HttpBadRequestException } from '@shared/exceptions';

export class DefaultCrudService<T> {
  constructor(
    private readonly model: Model<T>,
    private readonly populate?: string,
  ) {}

  async findAll(
    searchParams: DefaultPaginatedQueryRequest,
  ): Promise<DefaultPaginatedResponse<T>> {
    let pageNumber: number;
    const limit = 20;
    if (searchParams) {
      const { page } = searchParams;
      if (typeof page === 'string') {
        pageNumber = parseInt(page, 10);
      } else if (typeof page === 'number') {
        pageNumber = page;
      }
    }
    const skip = (pageNumber ? pageNumber - 1 : 0) * limit;
    const data = await this.model
      .find()
      .skip(skip)
      .limit(limit)
      .populate(this.populate)
      .exec();
    return {
      data,
      page: 1,
      count: 1,
    };
  }

  async findOne(filter: FilterQuery<T>): Promise<DefaultSingleResponse<T>> {
    const data = await this.model
      .findOne(filter)
      .populate(this.populate)
      .exec();
    return {
      data: data as T,
      status: HttpStatus.OK,
      message: '',
    };
  }

  async create(createDto: Partial<T>): Promise<DefaultSingleResponse<T>> {
    try {
      const data = await this.model.create(createDto);

      return {
        data,
        status: HttpStatus.CREATED,
        message: 'Item created.',
      };
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        throw new HttpBadRequestException(`User already exists`);
      }
      throw new HttpBadRequestException(`Error to insert user`, { err });
    }
  }

  async update(
    id: string,
    updateDto: Partial<T>,
  ): Promise<DefaultSingleResponse<T>> {
    const existingData = await this.model
      .findByIdAndUpdate(id, updateDto, {
        new: true,
      })
      .exec();
    if (!existingData) {
      throw new HttpBadRequestException('Item not found');
    }
    return {
      data: existingData,
      status: HttpStatus.CREATED,
      message: 'Item updated.',
    };
  }

  async remove(id: string): Promise<DefaultSingleResponse<boolean>> {
    await this.model.findByIdAndDelete(id).exec();
    return {
      data: true,
      status: HttpStatus.OK,
      message: 'Item deleted.',
    };
  }
}
