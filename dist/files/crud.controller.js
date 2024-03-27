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
/**
 * Crud functionality
 *
 *
 */
/* The `CrudC` class is a TypeScript class that provides CRUD operations (create, read, update, delete)
for a given model. */
class CrudController {
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
    constructor({ request, response, next, useNext = true, env = "development", }) {
        this.request = request;
        this.response = response;
        this.next = next;
        this.useNext = useNext;
        this.env = env;
    }
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
    create({ modelData, data, check, }) {
        return __awaiter(this, void 0, void 0, function* () {
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
     * The function creates multiple documents in a database using a given model, data, and check.
     * @param {CrudModelI} modelData - The `modelData` parameter is a variable representing a CRUD model. It
     * is of type `CrudModelI`, which is an interface defining the structure and behavior of a CRUD
     * model.
     * @param {T[]} data - The `data` parameter is an array of objects of type `T`. It represents the
     * data that needs to be created in the database.
     * @param {FilterQuery<U>[]} check - The `check` parameter is an array of `FilterQuery<U>` objects.
     * @returns a Promise that resolves to either a Response object, a NextFunction object, or void.
     */
    createMany({ check, modelData, data, }) {
        return __awaiter(this, void 0, void 0, function* () {
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
    update({ data, modelData, filter, }) {
        return __awaiter(this, void 0, void 0, function* () {
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
    getMany({ filter = null, modelData, populate, query, }) {
        return __awaiter(this, void 0, void 0, function* () {
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
     *   exempt: 'field1 field2',
     * }
     */
    delete({ data, modelData, }) {
        return __awaiter(this, void 0, void 0, function* () {
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
    getOne({ data, modelData, populate, }) {
        return __awaiter(this, void 0, void 0, function* () {
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