import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { FilterQuery, UpdateQuery } from 'mongoose';
import CrudService from './crud.service';
import { CrudModelI, PopulateFieldI } from './interface.crud';

/**
 * Crud functionality
 *
 *
 */
class CrudC {
  request: Request;

  response: Response;

  next: NextFunction;

  /**
   *
   * @param {Request} request express request object
   * @param {Response} response express response object
   * @param {NextFunction} next function
   */
  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request;
    this.response = response;
    this.next = next;
  }

  async create<T, U>(MyModel: CrudModelI, data: T, finder: FilterQuery<U>): Promise<Response | NextFunction | void> {
    try {
      const response = await CrudService.create(MyModel, data, finder);

      return this.response.status(httpStatus.CREATED).json(response);
    } catch (error) {
      return this.next(error);
    }
  }

  async createMany<T, U>(MyModel: CrudModelI, data: T[], finder: FilterQuery<U>[]): Promise<Response | NextFunction | void> {
    try {
      const response = await CrudService.createMany(MyModel, data, finder);
      return this.response.status(httpStatus.CREATED).json(response);
    } catch (error) {
      return this.next(error);
    }
  }

  /**
   * Update
   *
   * ---------
   *  @summary please insert the literal value update <T>
   *
   * @param {CrudModelI | CrudModelI[]} MyModel model object or an array of model object and whats its exempting when returning a response
   * @param {Record<string, any>} data this is the data to be used for updating the model
   * @param {Record<string, any>} filter this is used to find the document that need to be filtered
   * @returns
   *
   * @example
   * // returns a response
   * update< T{ for the body}, U{ for the model }>(MyModel, data<T>, filter<U>)
   */
  async update<T, U>(MyModel: CrudModelI | CrudModelI[], data: UpdateQuery<T>, filter: FilterQuery<U>) {
    try {
      const response = await CrudService.update(MyModel, data, filter);

      return this.response.status(httpStatus.OK).json(response);
    } catch (error) {
      return this.next(error);
    }
  }

  /**
   * Fetches multiple documents from the database based on the provided query parameters.
   * Supports pagination, sorting, and field selection.
   * Can fetch data from multiple models if an array of models is provided.
   *
   * @param {CrudModelI | CrudModelI[]} MyModels - The model(s) to fetch data from.
   * @param {typeof this.request.query} query - The query parameters.
   * @param {PopulateFieldI | PopulateFieldI[]} populate - The fields to populate.
   * @param {FilterQuery<T> | null} [category=null] - The category filter.
   * @returns {Promise<void>} - JSON response with the fetched data, success status, message, and the length of the fetched documents.
   *
   * @example
   * const crud = new Crud(request, response, next);
   * const MyModel = {
   *   Model: Model,
   *   exempt: 'field1 field2',
   * };
   * const query = request.query;
   * const populate = {
   *   model: 'relatedModel',
   *   fields: 'field1 field2',
   *   second_layer_populate: 'nestedModel',
   * };
   * const category = { category: 'category1' };
   *
   * await crud.getMany(MyModel, query, populate, category);
   *
   * This example initializes the `Crud` class object and calls the `getMany` method to fetch documents from the `Model` based on the provided query parameters.
   * It also specifies the fields to be populated and the category filter.
   */
  async getMany<T>(
    MyModels: CrudModelI | CrudModelI[],
    query: typeof this.request.query,
    populate: PopulateFieldI | PopulateFieldI[],
    category: FilterQuery<T> | null = null
  ) {
    try {
      const response = await CrudService.getMany(MyModels, query, populate, category);

      this.response.status(httpStatus.OK).json(response);
    } catch (error) {
      this.next(error);
    }
  }

  /**
   *
   * @param {CrudModelI} MyModel -it takes a model and exempt field
   * @param {Object} data it takes the field that is used to mďthď up the data to be deleted
   * @example
   * // returns a response
   * delete< T the model >(MyModel,category<T>,)
   */
  async delete<T>(MyModel: CrudModelI | CrudModelI[], data: FilterQuery<T>) {
    try {
      const response = await CrudService.delete(MyModel, data);

      this.response.status(httpStatus.OK).json(response);
    } catch (error) {
      this.next(error);
    }
  }

  /**
   * Get One Crud Model
   *
   * -----------------
   *
   *
   * @param MyModel - it takes object as parameter {model, exempt}
   * @param data -data is the filter parameters and its an object  it takes `<key, value>`
   * @param populate - takes the model name and the fields from the you want to populate
   *
   * @example
   * ```ts
   * CrudModelI {
   * model: Model<any>;
   *exempt: string;
   *  }
   *   populate: { model?: string | undefined; fields?: string | undefined } ```
   *
   *   @example
   * // returns a response
   * getOne< T the model >(MyModel, category<T>, populate: { model?: string | undefined; fields?: string | undefined)})
   */
  async getOne<T>(MyModel: CrudModelI | CrudModelI[], data: FilterQuery<T>, populate: PopulateFieldI | PopulateFieldI[]) {
    try {
      const response = await CrudService.getOne(MyModel, data, populate);

      this.response.status(httpStatus.OK).json(response);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CrudC;
