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
import ApiError from "./error.handler";
import Queries from "./query";
import responseMessage from "./responseMessage";
class CrudService {
    /**
     * This function creates a new document in the database using the provided data and checks if the
     * document already exists based on the provided finder.
     * @param {CrudModelI} MyModel - A variable of type `CrudModelI`, which is an interface for a CRUD
     * model.
     * @param {T} data - The `data` parameter is the object containing the data that you want to create
     * in the database. It is of type `T`, which means it can be any type you specify when calling the
     * `create` function.
     * @param finder - The `finder` parameter is a filter query object used to find existing data in the
     * database. It is of type `FilterQuery<U>`, where `U` represents the type of the filter query.
     * @returns a Promise that resolves to an object with the following properties:
     * - success_status: a boolean indicating whether the operation was successful
     * - data: the created data object
     * - message: a success message
     */
    static create(MyModel, data, finder) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = Object.keys(finder).length !== 0
                ? yield MyModel.Model.findOne(finder)
                : undefined;
            if (find) {
                throw new ApiError(httpStatus.BAD_REQUEST, `the data ${JSON.stringify(Object.keys(finder).join(", "))} already exists in the database`);
            }
            const create = new MyModel.Model(data);
            const created = yield create.save();
            if (!created) {
                throw new ApiError(httpStatus.BAD_REQUEST, `${MyModel.Model.collection.collectionName} is not successfully created`);
            }
            const dat = yield MyModel.Model.findById(created._id).select(MyModel.exempt);
            return responseMessage({
                success_status: true,
                data: dat,
                message: "Successfully created",
            });
        });
    }
    /**
     * The `createMany` function is a static method that creates multiple documents in a MongoDB
     * collection, performs a check to ensure that the data does not already exist, and returns the
     * created documents.
     * @param {CrudModelI} MyModel - The `MyModel` parameter is an object that implements the
     * `CrudModelI` interface. It represents a model in a CRUD (Create, Read, Update, Delete) operation.
     * @param {T[]} data - An array of objects (T) that contains the data to be created in the database.
     * @param {FilterQuery<U>[]} finder - `finder` is an array of filter queries used to check if any
     * data already exists in the database. Each filter query is an object with key-value pairs
     * representing the fields and values to search for.
     * @returns a Promise that resolves to an object with the following properties:
     * - success_status: a boolean indicating whether the operation was successful or not
     * - data: an array of objects representing the created data, with only the selected properties
     * specified by MyModel.exempt
     * - message: a string message indicating the result of the operation, which is "Successfully
     * created" in this case.
     */
    static createMany(MyModel, data, finder) {
        return __awaiter(this, void 0, void 0, function* () {
            if (finder.length > 0)
                yield Promise.all(finder.map((findr) => __awaiter(this, void 0, void 0, function* () {
                    const find = Object.keys(findr).length !== 0
                        ? yield MyModel.Model.findOne(findr)
                        : undefined;
                    if (find)
                        throw new ApiError(httpStatus.BAD_REQUEST, `the data ${JSON.stringify(Object.keys(findr).join(", "))} already exists in the database`);
                })));
            const created = yield MyModel.Model.insertMany(data);
            if (!created) {
                throw new ApiError(httpStatus.BAD_REQUEST, `${MyModel.Model.collection.collectionName} is not successfully created`);
            }
            const exemptedData = created.map((item) => __awaiter(this, void 0, void 0, function* () {
                return yield MyModel.Model.findById(item._id).select(MyModel.exempt);
            }));
            const responseData = yield Promise.all(exemptedData);
            return responseMessage({
                success_status: true,
                data: responseData,
                message: "Successfully created",
            });
        });
    }
    /**
     * The function `update` updates a document in a MongoDB collection based on a filter and returns the
     * updated document.
     * @param {CrudModelI} MyModel - A CrudModelI object that represents the model to be updated.
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
    static update(MyModel, data, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataF = [];
            const findAndUpdate = yield MyModel.Model.findOneAndUpdate(filter, data).select(MyModel.exempt);
            if (!findAndUpdate) {
                throw new ApiError(httpStatus.BAD_REQUEST, `${data} not updated successfully`);
            }
            else {
                dataF.push(findAndUpdate);
            }
            return responseMessage({
                success_status: true,
                data: dataF[0],
                message: "Successfully updated",
            });
        });
    }
    /**
     * The above function is a static method that retrieves multiple documents from a database based on
     * specified criteria and returns them as a response message.
     * @param {CrudModelI} MyModels - The `MyModels` parameter is an object that implements the
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
    static getMany(MyModels, query, populate, category = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const all = [];
            const processModel = (model) => __awaiter(this, void 0, void 0, function* () {
                let modelFind = category
                    ? model.Model.find(category)
                    : model.Model.find();
                if (model.exempt) {
                    modelFind = modelFind.select(model.exempt);
                }
                if (populate) {
                    modelFind = CrudService.populateModel(modelFind, populate);
                }
                const queryf = new Queries(modelFind, query)
                    .filter()
                    .limitFields()
                    .paginate()
                    .sort();
                const queryG = yield queryf.model;
                if (!queryG) {
                    throw new ApiError(httpStatus.NOT_FOUND, `${model} is not fetched`);
                }
                all.push(queryG);
            });
            // if (Array.isArray(MyModels)) {
            //   await Promise.all(MyModels.map(processModel));
            // } else {
            yield processModel(MyModels);
            // }
            return responseMessage({
                success_status: true,
                message: "Data fetched successfully",
                data: all[0],
                doc_length: all.length,
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
        return populateArr.reduce((model, pop) => {
            if (!pop.model) {
                return model;
            }
            return model.populate({
                path: pop.model,
                select: pop.fields,
                populate: pop.second_layer_populate,
            });
        }, modelFind);
    }
    /**
     * The above function is a static method that deletes data from a model in a TypeScript application.
     * @param {CrudModelI} MyModel - The MyModel parameter is of type CrudModelI, which is a model
     * interface for CRUD operations.
     * @param data - The `data` parameter is a filter query object used to specify the criteria for
     * deleting documents from the database. It can be of any type (`T`) and is used to filter the
     * documents to be deleted.
     * @returns a Promise that resolves to an object with the following properties:
     * - success_status: a boolean indicating whether the deletion was successful or not
     * - message: a string message indicating the result of the deletion
     * - data: a string value indicating that the deletion was completed
     */
    static delete(MyModel, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (Array.isArray(MyModel)) {
            //   Promise.all(
            //     MyModel.map(async (model) => {
            //       const delet = await model.Model.deleteOne(data);
            //       if (!delet) {
            //         throw new ApiError(
            //           httpStatus.NOT_IMPLEMENTED,
            //           `${model} is not successfully deleted`
            //         );
            //       }
            //     })
            //   );
            // } else {
            const delet = yield MyModel.Model.deleteOne(data);
            if (!delet) {
                throw new ApiError(httpStatus.NOT_FOUND, `${MyModel} is not successfully deleted`);
                // }
            }
            return responseMessage({
                success_status: true,
                message: "Deleted successfully",
                data: "deleted",
            });
        });
    }
    /**
     * This function retrieves data from a database based on a given filter and optional population
     * fields.
     * @param {CrudModelI | CrudModelI[]} MyModel - The `MyModel` parameter is either a single
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
    static getOne(MyModel, data, populate) {
        return __awaiter(this, void 0, void 0, function* () {
            // const response = await CrudService.
            const getData = [];
            let getOne;
            getOne = MyModel.Model.findOne(data).select(MyModel.exempt);
            if (!getOne)
                throw new ApiError(httpStatus.NOT_FOUND, `${MyModel} is not successfully fetched`);
            if (populate && Array.isArray(populate))
                populate.forEach((pop) => {
                    if (pop.model)
                        getOne = getOne.populate({
                            path: pop.model,
                            select: pop.fields,
                            populate: pop.second_layer_populate,
                        });
                });
            else if (populate && !Array.isArray(populate))
                if (populate.model)
                    getOne = getOne.populate({
                        path: populate.model,
                        select: populate.fields,
                        populate: populate.second_layer_populate,
                    });
            const gotten = yield getOne.exec();
            getData.push(gotten);
            return responseMessage({
                success_status: true,
                message: " fetched successfully",
                data: getData[0],
            });
        });
    }
}
export default CrudService;
//# sourceMappingURL=crud.service.js.map