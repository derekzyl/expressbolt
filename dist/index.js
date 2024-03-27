"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CrudController: () => crud_controller_default,
  CrudService: () => crud_service_default,
  generateDynamicSchema: () => crud_model_default
});
module.exports = __toCommonJS(src_exports);

// src/files/crud.controller.ts
var import_http_status2 = __toESM(require("http-status"));

// src/files/crud.service.ts
var import_http_status = __toESM(require("http-status"));

// src/files/responseMessage.ts
function responseMessage(msg, config = "development") {
  switch (msg.success_status) {
    case true:
      return {
        message: msg.message,
        data: msg.data,
        success: msg.success_status,
        doc_length: msg.doc_length
      };
    case false:
      return {
        message: msg.message,
        error: msg.error,
        success: msg.success_status,
        stack: config === "development" ? msg.stack : {}
      };
  }
}
var responseMessage_default = responseMessage;

// src/files/error.handler.ts
var CustomError = class _CustomError extends Error {
  constructor(status, message, isOperational = true) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, _CustomError.prototype);
  }
};
var errorCenter = ({
  error,
  response,
  env = "development"
}) => {
  var _a;
  const error_status = (_a = error.statusCode) != null ? _a : 500;
  let error_message = error.message;
  if (error_message.includes("E11000")) {
    error_message = "data already exist in the database";
  }
  const error_info = error.information;
  response.status(error_status).json(
    responseMessage_default(
      {
        message: error_info,
        success_status: false,
        data: error_message,
        stack: error.stack
      },
      env
    )
  );
};
var error_handler_default = CustomError;

// src/files/query.ts
var Queries = class {
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
  constructor(model2, request_query) {
    this.model = model2;
    this.request_query = request_query;
  }
  /**
   * The filter function removes excluded fields from the query object and converts it into a string
   * that can be used to filter the model.
   * @returns The filter() method is returning the updated instance of the object.
   */
  filter() {
    const queryObj = __spreadValues({}, this.request_query);
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.model = this.model.find(JSON.parse(queryStr));
    return this;
  }
  /**
   * The sort() function sorts the model based on the provided sort query parameter or defaults to
   * sorting by the created_at field in descending order.
   * @returns the updated object with the sorted model.
   */
  sort() {
    if (this.request_query.sort) {
      const sortBy = this.request_query.sort.split(",").join(" ");
      this.model = this.model.sort(sortBy);
    } else {
      this.model = this.model.sort("-created_at");
    }
    return this;
  }
  /**
   * The `limitFields` function selects specific fields from a model based on the `fields` query
   * parameter, or selects all fields except `__v` if no `fields` parameter is provided.
   * @returns the updated object.
   */
  limitFields() {
    if (this.request_query.fields) {
      const fields = this.request_query.fields.split(",").join(" ");
      this.model = this.model.select(fields);
    } else {
      this.model = this.model.select("-__v");
    }
    return this;
  }
  /**
   * The `paginate` function is used to set the page and limit for pagination in a TypeScript
   * application.
   * @returns The paginate() function returns the modified object itself (this) after applying the skip
   * and limit operations on the model.
   */
  paginate() {
    const page = this.request_query.page * 1 || 1;
    const limit = this.request_query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.model = this.model.skip(skip).limit(limit);
    return this;
  }
};
var query_default = Queries;

// src/files/crud.service.ts
var CrudService = class _CrudService {
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
  static create(_0) {
    return __async(this, arguments, function* ({
      check,
      modelData,
      data
    }) {
      const find = Object.keys(check).length !== 0 ? yield modelData.Model.findOne(check) : null;
      if (find) {
        throw new error_handler_default(
          import_http_status.default.BAD_REQUEST,
          `the data ${JSON.stringify(
            Object.keys(check).join(", ")
          )} already exists in the database`
        );
      }
      const create = new modelData.Model(data);
      const created = yield create.save();
      if (!created) {
        throw new error_handler_default(
          import_http_status.default.BAD_REQUEST,
          `${modelData.Model.collection.collectionName} is not successfully created`
        );
      }
      const dat = yield modelData.Model.findById(created._id).select(
        modelData.exempt
      );
      return responseMessage_default({
        success_status: true,
        data: dat,
        message: "Successfully created"
      });
    });
  }
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
  static createMany(_0) {
    return __async(this, arguments, function* ({
      check,
      data,
      modelData
    }) {
      const checks = check.map((findr) => {
        return Object.keys(findr).length !== 0 ? modelData.Model.findOne(findr) : null;
      });
      const finds = yield Promise.all(checks);
      finds.forEach((find, index) => {
        if (find) {
          throw new error_handler_default(
            import_http_status.default.BAD_REQUEST,
            `the data ${JSON.stringify(
              Object.keys(check[index]).join(", ")
            )} already exists in the database`
          );
        }
      });
      const created = yield modelData.Model.insertMany(data);
      if (!created) {
        throw new error_handler_default(
          import_http_status.default.BAD_REQUEST,
          `${modelData.Model.collection.collectionName} is not successfully created`
        );
      }
      const exemptedData = yield Promise.all(
        created.map(
          (item) => modelData.Model.findById(item._id).select(modelData.exempt)
        )
      );
      return responseMessage_default({
        success_status: true,
        data: exemptedData,
        message: "Successfully created"
      });
    });
  }
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
  static update(_0) {
    return __async(this, arguments, function* ({
      data,
      filter,
      modelData
    }) {
      const dataF = [];
      const findAndUpdate = yield modelData.Model.findOneAndUpdate(
        filter,
        data
      ).select(modelData.exempt);
      if (!findAndUpdate) {
        throw new error_handler_default(
          import_http_status.default.BAD_REQUEST,
          `${data} not updated successfully`
        );
      } else {
        dataF.push(findAndUpdate);
      }
      return responseMessage_default({
        success_status: true,
        data: dataF[0],
        message: "Successfully updated"
      });
    });
  }
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
  static getMany(_0) {
    return __async(this, arguments, function* ({
      filter,
      modelData,
      populate,
      query
    }) {
      const all = [];
      const processModel = (model2) => __async(this, null, function* () {
        let modelFind = filter ? model2.Model.find(filter) : model2.Model.find();
        if (model2.exempt) {
          modelFind = modelFind.select(model2.exempt);
        }
        if (populate) {
          modelFind = _CrudService.populateModel(modelFind, populate);
        }
        const queryf = new query_default(modelFind, query).filter().limitFields().paginate().sort();
        const queryG = yield queryf.model;
        if (!queryG) {
          throw new error_handler_default(import_http_status.default.NOT_FOUND, `${model2} is not fetched`);
        }
        all.push(queryG);
      });
      yield processModel(modelData);
      return responseMessage_default({
        success_status: true,
        message: "Data fetched successfully",
        data: all[0],
        doc_length: all.length
      });
    });
  }
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
  static populateModel(modelFind, populate) {
    if (!populate) {
      return modelFind;
    }
    const populateArr = Array.isArray(populate) ? populate : [populate];
    return populateArr.reduce((model2, pop) => {
      if (!pop.model) {
        return model2;
      }
      return model2.populate({
        path: pop.model,
        select: pop.fields,
        populate: pop.second_layer_populate
      });
    }, modelFind);
  }
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
  static delete(_0) {
    return __async(this, arguments, function* ({
      data,
      modelData
    }) {
      const delet = yield modelData.Model.deleteOne(data);
      if (!delet) {
        throw new error_handler_default(
          import_http_status.default.NOT_FOUND,
          `${modelData} is not successfully deleted`
        );
      }
      return responseMessage_default({
        success_status: true,
        message: "Deleted successfully",
        data: "deleted"
      });
    });
  }
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
  static getOne(_0) {
    return __async(this, arguments, function* ({
      modelData,
      data,
      populate
    }) {
      const getData = [];
      let getOne;
      getOne = modelData.Model.findOne(data).select(modelData.exempt);
      if (!getOne)
        throw new error_handler_default(
          import_http_status.default.NOT_FOUND,
          `${modelData} is not successfully fetched`
        );
      if (populate && Array.isArray(populate))
        populate.forEach((pop) => {
          if (pop.model)
            getOne = getOne.populate({
              path: pop.model,
              select: pop.fields,
              populate: pop.second_layer_populate
            });
        });
      else if (populate && !Array.isArray(populate)) {
        if (populate.model)
          getOne = getOne.populate({
            path: populate.model,
            select: populate.fields,
            populate: populate.second_layer_populate
          });
      }
      const gotten = yield getOne.exec();
      getData.push(gotten);
      return responseMessage_default({
        success_status: true,
        message: " fetched successfully",
        data: getData[0]
      });
    });
  }
};
var crud_service_default = CrudService;

// src/files/crud.controller.ts
var CrudController = class {
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
    env = "development"
  }) {
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
  create(_0) {
    return __async(this, arguments, function* ({
      modelData,
      data,
      check
    }) {
      try {
        const response = yield crud_service_default.create({ modelData, data, check });
        return this.response.status(import_http_status2.default.CREATED).json(response);
      } catch (error) {
        return this.useNext ? this.next(error) : errorCenter({ env: this.env, error, response: this.response });
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
  createMany(_0) {
    return __async(this, arguments, function* ({
      check,
      modelData,
      data
    }) {
      try {
        const response = yield crud_service_default.createMany({ modelData, data, check });
        return this.response.status(import_http_status2.default.CREATED).json(response);
      } catch (error) {
        return this.useNext ? this.next(error) : errorCenter({ env: this.env, error, response: this.response });
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
  update(_0) {
    return __async(this, arguments, function* ({
      data,
      modelData,
      filter
    }) {
      try {
        const response = yield crud_service_default.update({ modelData, data, filter });
        return this.response.status(import_http_status2.default.OK).json(response);
      } catch (error) {
        return this.useNext ? this.next(error) : errorCenter({ env: this.env, error, response: this.response });
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
  getMany(_0) {
    return __async(this, arguments, function* ({
      filter = null,
      modelData,
      populate,
      query
    }) {
      try {
        const response = yield crud_service_default.getMany({
          modelData,
          query,
          populate,
          filter
        });
        this.response.status(import_http_status2.default.OK).json(response);
      } catch (error) {
        return this.useNext ? this.next(error) : errorCenter({ env: this.env, error, response: this.response });
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
  delete(_0) {
    return __async(this, arguments, function* ({
      data,
      modelData
    }) {
      try {
        const response = yield crud_service_default.delete({ modelData, data });
        this.response.status(import_http_status2.default.OK).json(response);
      } catch (error) {
        return this.useNext ? this.next(error) : errorCenter({ env: this.env, error, response: this.response });
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
  getOne(_0) {
    return __async(this, arguments, function* ({
      data,
      modelData,
      populate
    }) {
      try {
        const response = yield crud_service_default.getOne({ modelData, data, populate });
        this.response.status(import_http_status2.default.OK).json(response);
      } catch (error) {
        this.next(error);
      }
    });
  }
};
var crud_controller_default = CrudController;

// src/files/crud.model.ts
var import_mongoose = __toESM(require("mongoose"));
var generateDynamicSchema = ({
  fields,
  modelName,
  plugins,
  schemaOptions
}) => {
  const schemaDefinition = {};
  for (const [keys, values] of Object.entries(fields)) {
    const fieldOptions = values;
    if (typeof fieldOptions === "object") {
      schemaDefinition[keys] = fieldOptions;
    } else if (Array.isArray(fieldOptions)) {
      switch (typeof fieldOptions[0]) {
        case "string":
          schemaDefinition[keys] = {
            type: [String]
          };
          break;
        case "number":
          schemaDefinition[keys] = {
            type: [Number]
          };
          break;
        case "object":
          {
            Object.prototype.hasOwnProperty.call(fieldOptions[0], "ref") && Object.prototype.hasOwnProperty.call(fieldOptions[0], "type") && fieldOptions[0].type === import_mongoose.default.Schema.Types.ObjectId ? schemaDefinition[keys] = fieldOptions : schemaDefinition[keys] = generateDynamicSchema({
              modelName: "",
              fields: fieldOptions[0],
              schemaOptions: schemaOptions != null ? schemaOptions : {}
            }).schema;
          }
          break;
        case "bigint":
          schemaDefinition[keys] = {
            type: [BigInt]
          };
          break;
        case "boolean":
          schemaDefinition[keys] = {
            type: [Boolean]
          };
          break;
        case "symbol":
          schemaDefinition[keys] = {
            type: [String]
          };
          break;
        default:
          break;
      }
    } else {
      schemaDefinition[keys] = {
        type: fieldOptions
      };
    }
  }
  const schemaDef = new import_mongoose.Schema(schemaDefinition, schemaOptions);
  plugins == null ? void 0 : plugins.forEach((plugin) => schemaDef.plugin(plugin));
  return {
    model: (0, import_mongoose.model)(modelName, schemaDef),
    schema: schemaDef
  };
};
var crud_model_default = generateDynamicSchema;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CrudController,
  CrudService,
  generateDynamicSchema
});
