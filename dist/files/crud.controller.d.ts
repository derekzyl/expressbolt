/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { NextFunction, Request, Response } from "express";
import { FilterQuery, UpdateQuery } from "mongoose";
import { CrudModelI, PopulateFieldI } from "./interface.crud";
declare class CrudController {
    request: Request;
    response: Response;
    next: NextFunction;
    useNext: boolean;
    env: "development" | "production";
    /**
     * Constructor for creating an instance of the class.
     *
     * @param {Object} options - The options object containing request, response, next, useNext, and env.
     * @param {Request} options.request - The request object.
     * @param {Response} options.response - The response object.
     * @param {NextFunction} options.next - The next function.
     * @param {boolean} [options.useNext=true] - Flag indicating whether to use the next function.
     * @param {"development" | "production"} [options.env="development"] - The environment setting.
     */
    constructor({ request, response, next, useNext, env, }: {
        request: Request;
        response: Response;
        next: NextFunction;
        useNext?: boolean;
        env?: "development" | "production";
    });
    /**
     * A description of the entire function.
     *
     * @param {CrudModelI<T>} modelData - description of parameter
     * @param {T} data - description of parameter
     * @param {FilterQuery<T & Document>} check - description of parameter
     * @return {Promise<Response | NextFunction | void>} description of return value
     */
    create<T>({ modelData, data, check, }: {
        modelData: CrudModelI<T>;
        data: T;
        check: FilterQuery<T & Document>;
    }): Promise<Response | NextFunction | void>;
    /**
     * A function to create multiple records in the database.
     *
     * @param {Object} param0 - Object containing modelData, data, and check
     * @param {CrudModelI<T>} param0.modelData - The model data for the records
     * @param {T[]} param0.data - The array of records to be created
     * @param {FilterQuery<T & Document>[]} param0.check - The filter query for checking existing records
     * @return {Promise<Response | NextFunction | void>} A promise that resolves to a response or next function, or void in case of error
     */
    createMany<T>({ check, modelData, data, }: {
        modelData: CrudModelI<T>;
        data: T[];
        check: FilterQuery<T & Document>[];
    }): Promise<Response | NextFunction | void>;
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
    update<T>({ data, modelData, filter, }: {
        modelData: CrudModelI<T>;
        data: UpdateQuery<T>;
        filter: FilterQuery<T & Document>;
    }): Promise<void | Response<any, Record<string, any>>>;
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
     *   select: ['field1','field2'],
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
    getMany<T>({ filter, modelData, populate, query, }: {
        modelData: CrudModelI<T>;
        query: any;
        populate: PopulateFieldI<T> | PopulateFieldI<T>[];
        filter: FilterQuery<T> | null;
    }): Promise<void>;
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
     *   select: 'field1 field2',
     * }
     */
    delete<T>({ data, modelData, }: {
        modelData: CrudModelI<T>;
        data: FilterQuery<T>;
    }): Promise<void>;
    /**
     * This TypeScript function deletes multiple documents based on a filter query using a CRUD service.
     * @param  - The `deleteMany` function takes in two parameters:
     * @returns The `deleteMany` method is returning the response from the `CrudService.deleteMany`
     * function call if successful. If there is an error, it will either call `this.next(error)` if
     * `this.useNext` is true, or it will call `errorCenter` function with the provided parameters.
     */
    deleteMany<T>({ data, modelData, }: {
        modelData: CrudModelI<T>;
        data: FilterQuery<T>;
    }): Promise<void>;
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
     *select: string;
     *  }
     *   populate: { model?: string | undefined; fields?: string | undefined } ```
     *
     *   @example
     * // returns a response
     * getOne< T the model >(modelData, category<T>, populate: { model?: string | undefined; fields?: string | undefined)})
     */
    getOne<T>({ data, modelData, populate, }: {
        modelData: CrudModelI<T>;
        data: FilterQuery<T>;
        populate: PopulateFieldI<T> | PopulateFieldI<T>[];
    }): Promise<void>;
}
export default CrudController;
