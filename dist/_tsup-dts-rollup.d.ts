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

import { Document as Document_2 } from 'mongoose';
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
    create<T>({ modelData, data, check, }: {
        modelData: CrudModelI<T>;
        data: T;
        check: FilterQuery<T & Document>;
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
    createMany<T>({ check, modelData, data, }: {
        modelData: CrudModelI<T>;
        data: T[];
        check: FilterQuery<T & Document>[];
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
    update<T>({ data, modelData, filter, }: {
        modelData: CrudModelI<T>;
        data: UpdateQuery<T>;
        filter: FilterQuery<T & Document>;
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
     *   exempt: 'field1 field2',
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
     *exempt: string;
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
export { CrudController }
export { CrudController as default_alias }

export declare interface CrudModelI<V> {
    Model: Model<any>;
    exempt: (keyof (V & Document_2) extends string ? string : never | `-${keyof (V & Document_2) extends string ? string : never}`)[];
}

declare class CrudService {
    /**
     * The `create` function creates a document in a MongoDB collection.
     * It takes in a `CrudModelI` object, the data to be created, and a filter to check for existing documents.
     * It returns a Promise that resolves to a response message containing the successfully created document.
     *
     * @param {Object} param - An object containing the `modelData`, `data`, and `check` properties.
     * @param {CrudModelI<T>} param.modelData - A `CrudModelI` object representing the MongoDB collection.
     * @param {T} param.data - The data to be created.
     * @param {FilterQuery<T & Document>} param.check - A filter to check for existing documents.
     * @returns {Promise<any>} A Promise that resolves to a response message containing the successfully created document.
     */
    static create<T>({ check, modelData, data, }: {
        modelData: CrudModelI<T>;
        data: T;
        check: FilterQuery<T & Document_2>;
    }): Promise<any>;
    /**
     * The function `createMany` creates multiple documents in a MongoDB collection based on an array of data.
     * It takes in a `CrudModelI` object, an array of data, and an array of filters to check for existing documents.
     * It returns a Promise that resolves to a response message containing the successfully created documents.
     *
     * @param {Object} param - An object containing the `modelData`, `data`, and `check` properties.
     * @param {CrudModelI<T>} param.modelData - A `CrudModelI` object representing the model to be created.
     * @param {T[]} param.data - An array of data to be created.
     * @param {FilterQuery<T & Document>[]} param.check - An array of filters to check for existing documents.
     * @returns {Promise<any>} A Promise that resolves to a response message containing the successfully created documents.
     */
    static createMany<T>({ check, data, modelData, }: {
        modelData: CrudModelI<T>;
        data: T[];
        check: FilterQuery<T & Document_2>[];
    }): Promise<any>;
    /**
     * The `update` static method is used to update a document in a database based on specified criteria.
     *
     * @param {Object} params - The `params` object contains the necessary parameters for the update operation.
     * @param {CrudModelI<T>} params.modelData - The `modelData` parameter represents the model(s) to update.
     * @param {UpdateQuery<T>} params.data - The `data` parameter represents the update data.
     * @param {FilterQuery<T & Document>} params.filter - The `filter` parameter represents the criteria to
     * identify the document(s) to update.
     * @returns {Promise<any>} The method returns a promise that resolves to a response message containing the
     * updated document and a success status.
     */
    static update<T>({ data, filter, modelData, }: {
        modelData: CrudModelI<T>;
        data: UpdateQuery<T>;
        filter: FilterQuery<T & Document_2>;
    }): Promise<any>;
    /**
     * This function retrieves multiple documents from a MongoDB collection based on the provided
     * filter, model, populate, and query parameters.
     * @param {Object} params - The `params` object contains the necessary parameters for the getMany
     * operation.
     * @param {CrudModelI<T>} params.modelData - The `modelData` parameter represents the model(s) to
     * retrieve documents from.
     * @param {FilterQuery<T> | null} params.filter - The `filter` parameter represents the criteria to
     * identify the documents to retrieve.
     * @param {PopulateFieldI<T> | PopulateFieldI<T>[]} params.populate - The `populate` parameter
     * represents the fields to populate in the retrieved documents.
     * @param {typeof request.query} params.query - The `query` parameter represents the query parameters
     * from the request.
     * @returns {Promise<any>} The method returns a promise that resolves to a response message object
     * containing the retrieved documents, a success status, and other relevant information.
     */
    static getMany<T>({ filter, modelData, populate, query, }: {
        modelData: CrudModelI<T>;
        query: typeof request.query;
        populate: PopulateFieldI<T> | PopulateFieldI<T>[];
        filter: FilterQuery<T> | null;
    }): Promise<any>;
    /**
     * The function `populateModel` populates a model with specified fields and nested fields based on
     * the provided criteria.
     * @param {any} modelFind - The `modelFind` parameter is the model object that you want to populate
     * with additional data. It could be a Mongoose model instance or any other object that supports
     * population of fields.
     * @param {PopulateFieldI<T> | PopulateFieldI<T>[]} populate - The `populate` parameter in the
     * `populateModel` function is used to specify which fields in the model should be populated with
     * additional data. It can be a single `PopulateFieldI` object or an array of `PopulateFieldI`
     * objects. Each `PopulateFieldI` object
     * @returns The `populateModel` function returns the result of populating the specified fields in the
     * modelFind object based on the populate configuration provided.
     */
    private static populateModel;
    /**
     * The function `delete` is an asynchronous static method in TypeScript that deletes data based on
     * the provided filter query and model data, handling errors and returning a success message.
     * @param  - The `delete` method you provided is an asynchronous function that deletes data from a
     * database using the given `modelData` and `data` parameters. Here's a breakdown of the parameters:
     * @returns The `delete` method is returning a Promise that resolves to an object with the following
     * properties:
     * - `success_status`: a boolean value indicating the success status of the deletion operation
     * - `message`: a string message indicating that the deletion was successful
     * - `data`: a string value indicating that the data was deleted
     */
    static delete<T>({ data, modelData, }: {
        modelData: CrudModelI<T>;
        data: FilterQuery<T>;
    }): Promise<any>;
    /**
     * This TypeScript function deletes multiple documents based on a filter query using the deleteMany
     * method and returns a success message.
     * @param  - The `deleteMany` function takes in two parameters:
     * @returns The `deleteMany` function returns a Promise that resolves to an object with the following
     * properties:
     * - `success_status`: a boolean indicating the success status of the deletion operation (true in
     * this case)
     * - `message`: a string message indicating that the deletion was successful ("Deleted successfully"
     * in this case)
     * - `data`: a string value indicating that the data was deleted ("deleted" in this case
     */
    static deleteMany<T>({ data, modelData, }: {
        modelData: CrudModelI<T>;
        data: FilterQuery<T>;
    }): Promise<any>;
    /**
     * Asynchronously retrieves a single document from a MongoDB collection.
     *
     * @param {Object} params - The parameters for retrieving the document.
     * @param {CrudModelI<T>} params.modelData - The model data for the MongoDB collection.
     * @param {FilterQuery<T>} params.data - The filter query for finding the document.
     * @param {PopulateFieldI<T> | PopulateFieldI<T>[]} params.populate - The populate options for the document.
     * @returns {Promise<any>} The response message containing the retrieved document.
     * @throws {CustomError} If the document is not found.
     */
    static getOne<T>({ modelData, data, populate, }: {
        modelData: CrudModelI<T>;
        data: FilterQuery<T>;
        populate: PopulateFieldI<T> | PopulateFieldI<T>[];
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

declare const errorCenter: ({ error, response, env, }: {
    error: any;
    response: Response_2;
    env: "production" | "development";
}) => void;
export { errorCenter }
export { errorCenter as errorCenter_alias_1 }

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

export declare interface PopulateFieldI<V> {
    path?: keyof V;
    fields?: (keyof V extends string ? string : never)[];
    second_layer_populate?: PopulateOptions | string;
}

export { }
