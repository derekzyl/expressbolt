/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/middlewares" />
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

import { FilterQuery } from 'mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { NextFunction } from 'express';
import { PopulateOptions } from 'mongoose';
import { request } from 'express';
import { Request as Request_2 } from 'express';
import { Response as Response_2 } from 'express';
import { SchemaDefinitionProperty } from 'mongoose';
import { UpdateQuery } from 'mongoose';

/**
 * Crud functionality
 *
 *
 */
declare class CrudController {
    request: Request_2;
    response: Response_2;
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
    constructor({ request, response, next, useNext, env, }: {
        request: Request_2;
        response: Response_2;
        next: NextFunction;
        useNext?: boolean;
        env?: "development" | "production";
    });
    /**
     * The function creates a new document in a database using a given model, data, and check query, and
     * returns a response or an error.
     * @param {CrudModelI} modelData - A variable representing a CRUD model interface or class.
     * @param {T} data - The `data` parameter is of type `T` and represents the data that you want to
     * create in the database. It could be an object or any other data type that matches the schema of
     * the `modelData` model.
     * @param check - The `check` parameter is a query object used to filter the data when creating a
     * new record. It is of type `FilterQuery<U>`, where `U` represents the type of the filter criteria.
     * This parameter allows you to specify conditions that the created record must meet in order to be
     * returned
     * @returns a Promise that resolves to either a Response object, a NextFunction object, or void.
     */
    create<T, U>({ modelData, data, check, }: {
        modelData: CrudModelI;
        data: T;
        check: FilterQuery<U>;
    }): Promise<Response_2 | NextFunction | void>;
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
    createMany<T, U>({ check, modelData, data, }: {
        modelData: CrudModelI;
        data: T[];
        check: FilterQuery<U>[];
    }): Promise<Response_2 | NextFunction | void>;
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
    update<T, U>({ data, modelData, filter, }: {
        modelData: CrudModelI;
        data: UpdateQuery<T>;
        filter: FilterQuery<U>;
    }): Promise<void | Response_2<any, Record<string, any>>>;
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
     * await crud.getMany(modelData, query, populate, category);
     *
     * This example initializes the `Crud` class object and calls the `getMany` method to fetch documents from the `Model` based on the provided query parameters.
     * It also specifies the fields to be populated and the category filter.
     */
    getMany<T>({ filter, modelData, populate, query, }: {
        modelData: CrudModelI;
        query: any;
        populate: PopulateFieldI | PopulateFieldI[];
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
     *   exempt: 'field1 field2',
     * }
     */
    delete<T>({ data, modelData, }: {
        modelData: CrudModelI;
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
     *exempt: string;
     *  }
     *   populate: { model?: string | undefined; fields?: string | undefined } ```
     *
     *   @example
     * // returns a response
     * getOne< T the model >(modelData, category<T>, populate: { model?: string | undefined; fields?: string | undefined)})
     */
    getOne<T>({ data, modelData, populate, }: {
        modelData: CrudModelI;
        data: FilterQuery<T>;
        populate: PopulateFieldI | PopulateFieldI[];
    }): Promise<void>;
}
export { CrudController }
export { CrudController as default_alias }

export declare interface CrudModelI {
    Model: Model<any>;
    exempt: string;
}

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
export { CrudService }
export { CrudService as default_alias_2 }

export declare interface CustomMessageI<V> {
    message: string;
    success_status: boolean;
    data: V;
    stack?: any;
    error?: any;
    doc_length?: number;
}

export declare class default_alias_3 extends Error {
    status: number;
    isOperational: boolean;
    constructor(status: number, message: string, isOperational?: boolean);
}

export declare class default_alias_4 {
    model: any;
    request_query: any;
    /**
     * The constructor function takes in a model and request_query as parameters and assigns them to the
     * corresponding properties of the class.
     * @param {any} model - The `model` parameter is used to pass in the model object. This object
     * represents the data structure or schema of the entity that you are working with. It typically
     * includes properties and methods that define how the data is stored, retrieved, and manipulated.
     * @param {any} request_query - The `request_query` parameter is an object that contains the query
     * parameters from an HTTP request. These query parameters are typically used to filter or sort data
     * when querying a database or API.
     */
    constructor(model: any, request_query: any);
    /**
     * The filter function removes excluded fields from the query object and converts it into a string
     * that can be used to filter the model.
     * @returns The filter() method is returning the updated instance of the object.
     */
    filter(): this;
    /**
     * The sort() function sorts the model based on the provided sort query parameter or defaults to
     * sorting by the created_at field in descending order.
     * @returns the updated object with the sorted model.
     */
    sort(): this;
    /**
     * The `limitFields` function selects specific fields from a model based on the `fields` query
     * parameter, or selects all fields except `__v` if no `fields` parameter is provided.
     * @returns the updated object.
     */
    limitFields(): this;
    /**
     * The `paginate` function is used to set the page and limit for pagination in a TypeScript
     * application.
     * @returns The paginate() function returns the modified object itself (this) after applying the skip
     * and limit operations on the model.
     */
    paginate(): this;
}

/**
 *
 * @param {CustomMessageI} msg
 * @returns
 */
/**
 * The function `responseMessage` takes in a custom message object and a configuration option, and
 * returns a response object based on the success status of the message.
 * @param msg - The `msg` parameter is an object of type `CustomMessageI<V>`. It contains the following
 * properties:
 * @param {"development" | "production"} [config=development] - The `config` parameter is a string that
 * specifies the environment in which the function is being executed. It can have two possible values:
 * "development" or "production". By default, it is set to "development".
 * @returns an object with different properties based on the value of `msg.success_status`.
 */
export declare function default_alias_5<V>(msg: CustomMessageI<V>, config?: "development" | "production"): {
    message: string;
    data: V;
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
};

declare type DynamicField<T> = {
    [key in keyof T]: SchemaDefinitionProperty<T>;
};

export declare const errorCenter: ({ error, response, env, }: {
    error: any;
    response: Response_2;
    env: "production" | "development";
}) => void;

/**
 * The function `generateDynamicSchema` creates a dynamic Mongoose schema based on the provided fields,
 * modelName, plugins, and schemaOptions.
 * @param  - The `generateDynamicSchema` function takes in the following parameters:
 * @returns The `generateDynamicSchema` function returns an object with two properties:
 * 1. `model`: This is the model created using the `model` function from Mongoose, with the specified
 * `modelName` and the generated schema (`schemaDef`).
 * 2. `schema`: This is the generated schema object (`schemaDef`) that defines the structure of the
 * model.
 */
declare const generateDynamicSchema: <T, U>({ fields, modelName, plugins, schemaOptions, }: {
    modelName: string;
    fields: DynamicField<T>;
    plugins?: any[] | undefined;
    schemaOptions?: Record<string, any> | undefined;
}) => {
    model: mongoose.Model<T & mongoose.Document<any, any, any>, {}, {}, {}, mongoose.IfAny<T & mongoose.Document<any, any, any>, any, mongoose.Document<unknown, {}, T & mongoose.Document<any, any, any>> & mongoose.Require_id<T & mongoose.Document<any, any, any>>>, any> & U;
    schema: mongoose.Schema<T & mongoose.Document<any, any, any>, mongoose.Model<T & mongoose.Document<any, any, any>, {}, {}, {}, mongoose.IfAny<T & mongoose.Document<any, any, any>, any, mongoose.Document<unknown, {}, T & mongoose.Document<any, any, any>> & mongoose.Require_id<T & mongoose.Document<any, any, any>>>, any> & U, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, mongoose.ObtainDocumentType<any, T & mongoose.Document<any, any, any>, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>>, mongoose.IfAny<mongoose.FlatRecord<mongoose.ObtainDocumentType<any, T & mongoose.Document<any, any, any>, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>>>, any, mongoose.Document<unknown, {}, mongoose.FlatRecord<mongoose.ObtainDocumentType<any, T & mongoose.Document<any, any, any>, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>>>> & mongoose.Require_id<mongoose.FlatRecord<mongoose.ObtainDocumentType<any, T & mongoose.Document<any, any, any>, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>>>>>>;
};
export { generateDynamicSchema as default_alias_1 }
export { generateDynamicSchema }

export declare const MyModel: mongoose.Model<{
    name?: string | null | undefined;
    age?: number | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name?: string | null | undefined;
    age?: number | null | undefined;
}> & {
    name?: string | null | undefined;
    age?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name?: string | null | undefined;
    age?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name?: string | null | undefined;
    age?: number | null | undefined;
}>> & mongoose.FlatRecord<{
    name?: string | null | undefined;
    age?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;

export declare interface PopulateFieldI {
    model?: string;
    fields?: string;
    second_layer_populate?: PopulateOptions | string;
}

export { }
