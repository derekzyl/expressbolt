import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { FilterQuery, UpdateQuery } from "mongoose";
import CrudService from "./crud.service";
import { errorCenter } from "./error.handler";
import { CrudModelI, PopulateFieldI } from "./interface.crud";

/* The `CrudController` class in TypeScript provides methods for handling CRUD operations with a
request, response, and next function, supporting create, update, delete, and fetch operations. */
class CrudController {
  request: Request;

  response: Response;

  next: NextFunction;

  useNext: boolean;

  env: "development" | "production";

  /**
   * The constructor function takes in a request, response, and next function as parameters.
   * @param {Request} request - The request object represents the HTTP request made by the client. It
   * contains information such as the URL, headers, query parameters, and body of the request.
   * @param {Response} response - The `response` parameter is an object that represents the HTTP
   * response that will be sent back to the client. It contains methods and properties that allow you
   * to set the response status code, headers, and body.
   * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to
   * the next middleware function in the request-response cycle. It is typically used to invoke the
   * next middleware function in the chain.
   */
  constructor({
    request,
    response,
    next,
    useNext = true,
    env = "development",
  }: {
    request: Request;
    response: Response;
    next: NextFunction;
    useNext?: boolean;
    env?: "development" | "production";
  }) {
    this.request = request;
    this.response = response;
    this.next = next;
    this.useNext = useNext;
    this.env = env;
  }

  async create<T>({
    modelData,
    data,
    check,
  }: {
    modelData: CrudModelI<T>;
    data: T;
    check: FilterQuery<T & Document>;
  }): Promise<Response | NextFunction | void> {
    try {
      const response = await CrudService.create<T>({ modelData, data, check });

      return this.response.status(httpStatus.CREATED).json(response);
    } catch (error) {
      return this.useNext
        ? this.next(error)
        : errorCenter({ env: this.env, error: error, response: this.response });
    }
  }

  /**
   * The function creates multiple documents in a database using a given model, data, and check.
   * @param {CrudModelI} modelData - The `modelData` parameter is a variable representing a CRUD model. It
   * is of type `CrudModelI`, which is an interface defining the structure and behavior of a CRUD
   * model.
   * @param {T[]} data - The `data` parameter is an array of objects of type `T`. It represents the
   * data that needs to be created in the database.
   * @param {FilterQuery<U>[]} check - The `check` parameter is an array of `FilterQuery<U>` objects.
   * @returns a Promise that resolves to either a Response object, a NextFunction object, or void.
   */
  async createMany<T>({
    check,
    modelData,
    data,
  }: {
    modelData: CrudModelI<T>;
    data: T[];
    check: FilterQuery<T & Document>[];
  }): Promise<Response | NextFunction | void> {
    try {
      const response = await CrudService.createMany({ modelData, data, check });
      return this.response.status(httpStatus.CREATED).json(response);
    } catch (error) {
      return this.useNext
        ? this.next(error)
        : errorCenter({ env: this.env, error: error, response: this.response });
    }
  }

  /**
   * The function updates a model using the provided data and filter, and returns the updated response.
   * @param {CrudModelI} modelData - A variable representing a CRUD model interface. It is used to
   * perform CRUD operations on a specific model.
   * @param data - The `data` parameter is an object that contains the fields and values to be updated
   * in the database. It represents the update query that will be executed on the `modelData` collection.
   * The type `T` represents the shape of the data object.
   * @param filter - The `filter` parameter is a query object used to filter the documents to be
   * updated in the database. It specifies the criteria that the documents must meet in order to be
   * updated. The `filter` parameter is of type `FilterQuery<U>`, where `U` is the type of the filter
   * @returns a promise that resolves to a response object.
   */
  async update<T>({
    data,
    modelData,
    filter,
  }: {
    modelData: CrudModelI<T>;
    data: UpdateQuery<T>;
    filter: FilterQuery<T & Document>;
  }) {
    try {
      const response = await CrudService.update<T>({ modelData, data, filter });

      return this.response.status(httpStatus.OK).json(response);
    } catch (error) {
      return this.useNext
        ? this.next(error)
        : errorCenter({ env: this.env, error: error, response: this.response });
    }
  }

  /**
   * Fetches multiple documents from the database based on the provided query parameters.
   * Supports pagination, sorting, and field selection.
   * Can fetch data from multiple models if an array of models is provided.
   *
   * @param {CrudModelI } modelData - The model(s) to fetch data from.
   * @param {typeof this.request.query} query - The query parameters.
   * @param {PopulateFieldI | PopulateFieldI[]} populate - The fields to populate.
   * @param {FilterQuery<T> | null} [category=null] - The category filter.
   * @returns {Promise<void>} - JSON response with the fetched data, success status, message, and the length of the fetched documents.
   *
   * @example
   * const crud = new Crud(request, response, next);
   * const modelData = {
   *   Model: Model,
   *   exempt: ['field1','field2'],
   * };
   * const query = request.query;
   * const populate = {
   *   model: 'relatedModel',
   *   fields: ['field1', 'field2'],
   *   second_layer_populate: 'nestedModel',
   * };
   * const category = { category: 'category1' };
   *
   * await crud.getMany(modelData, query, populate, category);
   *
   * This example initializes the `Crud` class object and calls the `getMany` method to fetch documents from the `Model` based on the provided query parameters.
   * It also specifies the fields to be populated and the category filter.
   */
  async getMany<T>({
    filter = null,
    modelData,
    populate,
    query,
  }: {
    modelData: CrudModelI<T>;
    query: any;
    populate: PopulateFieldI<T> | PopulateFieldI<T>[];
    filter: FilterQuery<T> | null;
  }) {
    try {
      const response = await CrudService.getMany<T>({
        modelData,
        query,
        populate,
        filter,
      });

      this.response.status(httpStatus.OK).json(response);
    } catch (error) {
      return this.useNext
        ? this.next(error)
        : errorCenter({ env: this.env, error: error, response: this.response });
    }
  }

  /**
   * The function is an asynchronous method that deletes data from a model using a filter query and
   * returns the response.
   * @param {CrudModelI} modelData - The modelData parameter is an instance of a CRUD model. It represents
   * the model or schema that you want to perform the delete operation on. It should implement the
   * CrudModelI interface.
   * @param data - The `data` parameter is a filter query object used to specify the criteria for
   * deleting documents from the database. It is of type `FilterQuery<T>`, where `T` represents the
   * type of the documents being deleted. The `FilterQuery` type is typically used in MongoDB queries
   * to filter documents
   * @example - The example below shows how to use the `delete` function to delete a document from the
   * `Model` using a filter query.
   * const crud = new Crud(request, response, next);
   * const modelData = {
   *   Model: Model,
   *   exempt: 'field1 field2',
   * }
   */
  async delete<T>({
    data,
    modelData,
  }: {
    modelData: CrudModelI<T>;
    data: FilterQuery<T>;
  }) {
    try {
      const response = await CrudService.delete<T>({ modelData, data });

      this.response.status(httpStatus.OK).json(response);
    } catch (error) {
      return this.useNext
        ? this.next(error)
        : errorCenter({ env: this.env, error: error, response: this.response });
    }
  }

  /**
   * This TypeScript function deletes multiple documents based on a filter query using a CRUD service.
   * @param  - The `deleteMany` function takes in two parameters:
   * @returns The `deleteMany` method is returning the response from the `CrudService.deleteMany`
   * function call if successful. If there is an error, it will either call `this.next(error)` if
   * `this.useNext` is true, or it will call `errorCenter` function with the provided parameters.
   */
  async deleteMany<T>({
    data,
    modelData,
  }: {
    modelData: CrudModelI<T>;
    data: FilterQuery<T>;
  }) {
    try {
      const response = await CrudService.deleteMany<T>({ modelData, data });

      this.response.status(httpStatus.OK).json(response);
    } catch (error) {
      return this.useNext
        ? this.next(error)
        : errorCenter({ env: this.env, error: error, response: this.response });
    }
  }

  /**
   * The function retrieves one document from a database using a given model, data filter, and optional
   * population fields, and returns the response as JSON.
   * @param {CrudModelI} modelData - The `modelData` parameter is the model that you want to perform the
   * operation on. It should be an instance of a CRUD model that implements the `CrudModelI` interface.
   * @param data - The `data` parameter is a filter query object used to specify the conditions for
   * finding a document in the database. It can be used to filter the documents based on certain
   * criteria such as equality, inequality, greater than, less than, etc. The type `T` represents the
   * type of the data
   * @param {PopulateFieldI | PopulateFieldI[]} populate - The "populate" parameter is used to specify
   * which fields of the retrieved document(s) should be populated with their referenced documents. It
   * can be a single field or an array of fields to populate.
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
   * getOne< T the model >(modelData, category<T>, populate: { model?: string | undefined; fields?: string | undefined)})
   */

  async getOne<T>({
    data,
    modelData,
    populate,
  }: {
    modelData: CrudModelI<T>;
    data: FilterQuery<T>;
    populate: PopulateFieldI<T> | PopulateFieldI<T>[];
  }) {
    try {
      const response = await CrudService.getOne({ modelData, data, populate });

      this.response.status(httpStatus.OK).json(response);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CrudController;
