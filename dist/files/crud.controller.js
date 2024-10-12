var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import httpStatus from "http-status";
import CrudService from "./crud.service";
import { errorCenter } from "./error.handler";
/* The `CrudController` class in TypeScript provides methods for handling CRUD operations with a
request, response, and next function, supporting create, update, delete, and fetch operations. */
class CrudController {
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
    constructor({ request, response, next, useNext = true, env = "development", }) {
        this.request = request;
        this.response = response;
        this.next = next;
        this.useNext = useNext;
        this.env = env;
    }
    /**
     * A description of the entire function.
     *
     * @param {CrudModelI<T>} modelData - description of parameter
     * @param {T} data - description of parameter
     * @param {FilterQuery<T & Document>} check - description of parameter
     * @return {Promise<Response | NextFunction | void>} description of return value
     */
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ modelData, data, check, }) {
            try {
                const response = yield CrudService.create({ modelData, data, check });
                return this.response.status(httpStatus.CREATED).json(response);
            }
            catch (error) {
                return this.useNext
                    ? this.next(error)
                    : errorCenter({ env: this.env, error: error, response: this.response });
            }
        });
    }
    /**
     * A function to create multiple records in the database.
     *
     * @param {Object} param0 - Object containing modelData, data, and check
     * @param {CrudModelI<T>} param0.modelData - The model data for the records
     * @param {T[]} param0.data - The array of records to be created
     * @param {FilterQuery<T & Document>[]} param0.check - The filter query for checking existing records
     * @return {Promise<Response | NextFunction | void>} A promise that resolves to a response or next function, or void in case of error
     */
    createMany(_a) {
        return __awaiter(this, arguments, void 0, function* ({ check, modelData, data, }) {
            try {
                const response = yield CrudService.createMany({ modelData, data, check });
                return this.response.status(httpStatus.CREATED).json(response);
            }
            catch (error) {
                return this.useNext
                    ? this.next(error)
                    : errorCenter({ env: this.env, error: error, response: this.response });
            }
        });
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
    update(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data, modelData, filter, }) {
            try {
                const response = yield CrudService.update({ modelData, data, filter });
                return this.response.status(httpStatus.OK).json(response);
            }
            catch (error) {
                return this.useNext
                    ? this.next(error)
                    : errorCenter({ env: this.env, error: error, response: this.response });
            }
        });
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
    getMany(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filter = null, modelData, populate, query, }) {
            try {
                const response = yield CrudService.getMany({
                    modelData,
                    query,
                    populate,
                    filter,
                });
                this.response.status(httpStatus.OK).json(response);
            }
            catch (error) {
                return this.useNext
                    ? this.next(error)
                    : errorCenter({ env: this.env, error: error, response: this.response });
            }
        });
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
     *   select: 'field1 field2',
     * }
     */
    delete(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data, modelData, }) {
            try {
                const response = yield CrudService.delete({ modelData, data });
                this.response.status(httpStatus.OK).json(response);
            }
            catch (error) {
                return this.useNext
                    ? this.next(error)
                    : errorCenter({ env: this.env, error: error, response: this.response });
            }
        });
    }
    /**
     * This TypeScript function deletes multiple documents based on a filter query using a CRUD service.
     * @param  - The `deleteMany` function takes in two parameters:
     * @returns The `deleteMany` method is returning the response from the `CrudService.deleteMany`
     * function call if successful. If there is an error, it will either call `this.next(error)` if
     * `this.useNext` is true, or it will call `errorCenter` function with the provided parameters.
     */
    deleteMany(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data, modelData, }) {
            try {
                const response = yield CrudService.deleteMany({ modelData, data });
                this.response.status(httpStatus.OK).json(response);
            }
            catch (error) {
                return this.useNext
                    ? this.next(error)
                    : errorCenter({ env: this.env, error: error, response: this.response });
            }
        });
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
     *select: string;
     *  }
     *   populate: { model?: string | undefined; fields?: string | undefined } ```
     *
     *   @example
     * // returns a response
     * getOne< T the model >(modelData, category<T>, populate: { model?: string | undefined; fields?: string | undefined)})
     */
    getOne(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data, modelData, populate, }) {
            try {
                const response = yield CrudService.getOne({ modelData, data, populate });
                this.response.status(httpStatus.OK).json(response);
            }
            catch (error) {
                this.next(error);
            }
        });
    }
}
export default CrudController;
//# sourceMappingURL=crud.controller.js.map