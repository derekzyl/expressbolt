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
import { request } from "express";
import { FilterQuery, UpdateQuery } from "mongoose";
import { CrudModelI, PopulateFieldI } from "./interface.crud";
declare class CrudService {
    /**
     * This function creates a new document in the database using the provided data and checks if the
     * document already exists based on the provided check.
     * @param {CrudModelI} modelData - A variable of type `CrudModelI`, which is an interface for a CRUD
     * model.
     * @param {T} data - The `data` parameter is the object containing the data that you want to create
     * in the database. It is of type `T`, which means it can be any type you specify when calling the
     * `create` function.
     * @param check - The `check` parameter is a filter query object used to find existing data in the
     * database. It is of type `FilterQuery<U>`, where `U` represents the type of the filter query.
     * @returns a Promise that resolves to an object with the following properties:
     * - success_status: a boolean indicating whether the operation was successful
     * - data: the created data object
     * - message: a success message
     */
    static create<T, U>({ check, modelData, data, }: {
        modelData: CrudModelI;
        data: T;
        check: FilterQuery<U>;
    }): Promise<any>;
    /**
     * The `createMany` function is a static method that creates multiple documents in a MongoDB
     * collection, performs a check to ensure that the data does not already exist, and returns the
     * created documents.
     * @param {CrudModelI} modelData - The `modelData` parameter is an object that implements the
     * `CrudModelI` interface. It represents a model in a CRUD (Create, Read, Update, Delete) operation.
     * @param {T[]} data - An array of objects (T) that contains the data to be created in the database.
     * @param {FilterQuery<U>[]} check - `check` is an array of filter queries used to check if any
     * data already exists in the database. Each filter query is an object with key-value pairs
     * representing the fields and values to search for.
     * @returns a Promise that resolves to an object with the following properties:
     * - success_status: a boolean indicating whether the operation was successful or not
     * - data: an array of objects representing the created data, with only the selected properties
     * specified by modelData.exempt
     * - message: a string message indicating the result of the operation, which is "Successfully
     * created" in this case.
     */
    static createMany<T, U>({ check, data, modelData, }: {
        modelData: CrudModelI;
        data: T[];
        check: FilterQuery<U>[];
    }): Promise<any>;
    /**
     * The function `update` updates a document in a MongoDB collection based on a filter and returns the
     * updated document.
     * @param {CrudModelI} modelData - A CrudModelI object that represents the model to be updated.
     * @param data - The `data` parameter is an object that contains the fields and values to be updated
     * in the database. It is of type `UpdateQuery<T>`, where `T` represents the type of the data being
     * updated.
     * @param filter - The `filter` parameter is used to specify the conditions that the documents must
     * meet in order to be updated. It is of type `FilterQuery<U>`, where `U` represents the type of the
     * document being filtered.
     * @returns a Promise that resolves to an object with the following properties:
     * - success_status: a boolean indicating whether the update was successful or not
     * - data: an array of updated documents
     * - message: a string message indicating the success of the update
     */
    static update<T, U>({ data, filter, modelData, }: {
        modelData: CrudModelI;
        data: UpdateQuery<T>;
        filter: FilterQuery<U>;
    }): Promise<any>;
    /**
     * The above function is a static method that retrieves multiple documents from a database based on
     * specified criteria and returns them as a response message.
     * @param {CrudModelI} modelData - The `modelData` parameter is an object that implements the
     * `CrudModelI` interface. It represents the model(s) that you want to fetch data from.
     * @param query - The `query` parameter is of type `typeof request.query`, which means it represents
     * the query parameters of an HTTP request. It is used to filter, limit, paginate, and sort the data
     * being fetched.
     * @param {PopulateFieldI | PopulateFieldI[]} populate - The `populate` parameter is used to specify
     * which fields of the model should be populated with their referenced documents. It can be a single
     * field or an array of fields.
     * @param {FilterQuery<T> | null} [category=null] - The `category` parameter is used to filter the
     * documents in the database based on a specific condition. It can be a query object that specifies
     * the filtering criteria. If no `category` is provided, all documents will be fetched.
     * @returns a Promise that resolves to an object with the following properties:
     * - success_status: a boolean indicating whether the data was fetched successfully
     * - message: a string message indicating the status of the fetch operation
     * - data: an array containing the fetched data
     * - doc_length: a number indicating the length of the fetched data array
     */
    static getMany<T>({ filter, modelData, populate, query, }: {
        modelData: CrudModelI;
        query: typeof request.query;
        populate: PopulateFieldI | PopulateFieldI[];
        filter: FilterQuery<T> | null;
    }): Promise<any>;
    /**
     * The function `populateModel` takes a modelFind object and a populate object or array of objects,
     * and returns the modelFind object with populated fields based on the populate object(s).
     * @param {any} modelFind - The `modelFind` parameter is the model or query object that you want to
     * populate with data. It could be an instance of a model or a query object that you want to populate
     * with data.
     * @param {PopulateFieldI | PopulateFieldI[]} populate - The `populate` parameter is used to specify
     * the fields that should be populated in the `modelFind` object. It can be either a single
     * `PopulateFieldI` object or an array of `PopulateFieldI` objects.
     * @returns the populated model.
     */
    private static populateModel;
    /**
     * The above function is a static method that deletes data from a model in a TypeScript application.
     * @param {CrudModelI} modelData - The modelData parameter is of type CrudModelI, which is a model
     * interface for CRUD operations.
     * @param data - The `data` parameter is a filter query object used to specify the criteria for
     * deleting documents from the database. It can be of any type (`T`) and is used to filter the
     * documents to be deleted.
     * @returns a Promise that resolves to an object with the following properties:
     * - success_status: a boolean indicating whether the deletion was successful or not
     * - message: a string message indicating the result of the deletion
     * - data: a string value indicating that the deletion was completed
     */
    static delete<T>({ data, modelData, }: {
        modelData: CrudModelI;
        data: FilterQuery<T>;
    }): Promise<any>;
    /**
     * This function retrieves data from a database based on a given filter and optional population
     * fields.
     * @param {CrudModelI | CrudModelI[]} modelData - The `modelData` parameter is either a single
     * `CrudModelI` object or an array of `CrudModelI` objects.
     * @param data - The `data` parameter is a filter query object used to specify the conditions for
     * fetching data from the database. It is of type `FilterQuery<T>`, where `T` represents the type of
     * the data being fetched.
     * @param {PopulateFieldI | PopulateFieldI[]} populate - The `populate` parameter is used to specify
     * the fields that should be populated in the returned data. It can be a single object or an array of
     * objects. Each object in the array represents a field to be populated and can have the following
     * properties:
     * @returns a response message object with the following properties:
     * - success_status: a boolean indicating whether the operation was successful or not
     * - message: a string message indicating the status of the operation
     * - data: an array containing the fetched data
     */
    static getOne<T>({ modelData, data, populate, }: {
        modelData: CrudModelI;
        data: FilterQuery<T>;
        populate: PopulateFieldI | PopulateFieldI[];
    }): Promise<{
        message: string;
        data: T;
        success: true;
        doc_length: number | undefined;
        error?: undefined;
        stack?: undefined;
    } | {
        message: string;
        error: any;
        success: false;
        stack: any;
        data?: undefined;
        doc_length?: undefined;
    }>;
}
export default CrudService;
