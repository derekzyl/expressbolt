import { ApiError } from '@modules/errors';
import { request } from 'express';
import httpStatus from 'http-status';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { CrudModelI, PopulateFieldI } from './interface.crud';
import Queries from './query';
import responseMessage from './responseMessage';

class CrudS {
  /**
   * This function creates a new document in the database using the provided data and checks if a
   * document with the same finder already exists.
   * @param {CrudModelI} MyModel - The `MyModel` parameter is an object that represents a CRUD model.
   * It should have a `Model` property that represents the Mongoose model for the data, and an `exempt`
   * property that represents the fields to be exempted from the response.
   * @param {T} data - The `data` parameter is the object containing the data that you want to create
   * in the database. It should be of type `T`, which represents the type of the data you are creating.
   * @param finder - The `finder` parameter is a filter query object used to find existing data in the
   * database. It is of type `FilterQuery<U>`, where `U` represents the type of the filter query.
   * @returns a Promise that resolves to an object with the following properties:
   * - success_status: a boolean indicating whether the creation was successful
   * - data: the created data object
   * - message: a success message
   */
  static async create<T, U>(MyModel: CrudModelI, data: T, finder: FilterQuery<U>): Promise<any> {
    const find = Object.keys(finder).length !== 0 ? await MyModel.Model.findOne(finder) : undefined;
    if (find) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `the data ${JSON.stringify(Object.keys(finder).join(', '))} already exists in the database`
      );
    }

    const create = new MyModel.Model(data);
    const created = await create.save();

    if (!created) {
      throw new ApiError(httpStatus.BAD_REQUEST, `${MyModel.Model.collection.collectionName} is not successfully created`);
    }

    const dat = await MyModel.Model.findById(created._id).select(MyModel.exempt);

    return responseMessage<U>({
      success_status: true,
      data: dat,
      message: 'Successfully created',
    });
  }

  /**
   * The function `createMany` creates multiple documents in a database collection, checks if any of
   * the documents already exist, and returns the created documents.
   * @param {CrudModelI} MyModel - A CrudModelI object that represents a model in a CRUD (Create, Read,
   * Update, Delete) operation.
   * @param {T[]} data - An array of objects (T[]) that contains the data to be created in the
   * database.
   * @param {FilterQuery<U>[]} finder - `finder` is an array of filter queries used to check if the
   * data already exists in the database. Each filter query is an object that specifies the conditions
   * to search for existing data.
   * @returns a Promise that resolves to an object with the following properties:
   * - success_status: a boolean indicating whether the operation was successful or not
   * - data: an array of objects representing the created data, with some properties exempted based on
   * the MyModel.exempt configuration
   * - message: a string message indicating the result of the operation, in this case, 'Successfully
   * created'
   */
  static async createMany<T, U>(MyModel: CrudModelI, data: T[], finder: FilterQuery<U>[]): Promise<any> {
    if (finder.length > 0)
      await Promise.all(
        finder.map(async (findr) => {
          const find = Object.keys(findr).length !== 0 ? await MyModel.Model.findOne(findr) : undefined;
          if (find)
            throw new ApiError(
              httpStatus.BAD_REQUEST,
              `the data ${JSON.stringify(Object.keys(findr).join(', '))} already exists in the database`
            );
        })
      );

    const created = await MyModel.Model.insertMany(data);

    if (!created) {
      throw new ApiError(httpStatus.BAD_REQUEST, `${MyModel.Model.collection.collectionName} is not successfully created`);
    }

    const exemptedData = created.map(async (item) => {
      const f = await MyModel.Model.findById(item._id).select(MyModel.exempt);
      return f;
    });

    const responseData = await Promise.all(exemptedData);

    return responseMessage<U[]>({
      success_status: true,
      data: responseData,
      message: 'Successfully created',
    });
  }

  /**
   * The function `update` is a static async function that updates one or multiple models based on a
   * given filter and data, and returns a response message indicating the success of the update
   * operation.
   * @param {CrudModelI | CrudModelI[]} MyModel - The `MyModel` parameter can be either a single
   * `CrudModelI` object or an array of `CrudModelI` objects.
   * @param data - The `data` parameter is an object that contains the fields and values to be updated
   * in the database. It represents the update query for the database operation.
   * @param filter - The `filter` parameter is used to specify the conditions that the documents must
   * meet in order to be updated. It is a query object that defines the criteria for selecting the
   * documents to update.
   * @returns a Promise that resolves to an object with the following properties:
   * - success_status: a boolean indicating whether the update was successful or not
   * - data: an array containing the updated data
   * - message: a string message indicating the success of the update
   */
  static async update<T, U>(MyModel: CrudModelI | CrudModelI[], data: UpdateQuery<T>, filter: FilterQuery<U>): Promise<any> {
    const dataF: Array<any> = [];

    if (Array.isArray(MyModel)) {
      await Promise.all(
        MyModel.map(async (model) => {
          const findAndUpdate = await model.Model.findOneAndUpdate(filter, data).select(model.exempt);
          if (!findAndUpdate) {
            throw new ApiError(httpStatus.NOT_IMPLEMENTED, `${data} not updated successfully`);
          } else {
            dataF.push(findAndUpdate);
          }
        })
      );
    } else {
      const findAndUpdate = await MyModel.Model.findOneAndUpdate(filter, data).select(MyModel.exempt);
      if (!findAndUpdate) {
        throw new ApiError(httpStatus.BAD_REQUEST, `${data} not updated successfully`);
      } else {
        dataF.push(findAndUpdate);
      }
    }

    return responseMessage<U[]>({
      success_status: true,
      data: dataF,
      message: 'Successfully updated',
    });
  }

  /**
   * The function `getMany` retrieves multiple documents from a database based on specified criteria
   * and returns them in a response message.
   * @param {CrudModelI | CrudModelI[]} MyModels - The `MyModels` parameter can be either a single
   * `CrudModelI` object or an array of `CrudModelI` objects.
   * @param query - The `query` parameter is of type `typeof request.query`, which means it represents
   * the query parameters of an HTTP request. It is used to filter the results of the database query.
   * @param {PopulateFieldI | PopulateFieldI[]} populate - The `populate` parameter is used to specify
   * which fields of the model should be populated with their referenced documents. It can be a single
   * field or an array of fields.
   * @param {FilterQuery<T> | null} [category=null] - A filter query to apply to the models. It can be
   * null if no filter is needed.
   * @returns a Promise that resolves to an object with the following properties:
   * - success_status: a boolean indicating whether the data was fetched successfully
   * - message: a string message indicating the status of the fetch operation
   * - data: an array containing the fetched data
   * - doc_length: a number indicating the length of the fetched data array
   */
  static async getMany<T>(
    MyModels: CrudModelI | CrudModelI[],
    query: typeof request.query,
    populate: PopulateFieldI | PopulateFieldI[],
    category: FilterQuery<T> | null = null
  ): Promise<any> {
    const all: any[] = [];
    const processModel = async (model: CrudModelI) => {
      let modelFind = category ? model.Model.find(category) : model.Model.find();
      if (model.exempt) {
        modelFind = modelFind.select(model.exempt);
      }
      if (populate) {
        modelFind = CrudS.populateModel(modelFind, populate);
      }
      const queryf = new Queries(modelFind, query).filter().limitFields().paginate().sort();
      const queryG = await queryf.model;
      if (!queryG) {
        throw new ApiError(httpStatus.NOT_FOUND, `${model} is not fetched`);
      }
      all.push(queryG);
    };

    if (Array.isArray(MyModels)) {
      await Promise.all(MyModels.map(processModel));
    } else {
      await processModel(MyModels);
    }

    return responseMessage<T[]>({
      success_status: true,
      message: 'Data fetched successfully',
      data: all,
      doc_length: all.length,
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
  private static populateModel(modelFind: any, populate: PopulateFieldI | PopulateFieldI[]): any {
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
   * The function `delete` is a static async function that deletes one or multiple documents from a
   * MongoDB collection based on the provided filter query.
   * @param {CrudModelI | CrudModelI[]} MyModel - The MyModel parameter is either a single CrudModelI
   * object or an array of CrudModelI objects.
   * @param data - The `data` parameter is a filter query object used to specify the criteria for
   * deleting documents from the database. It is of type `FilterQuery<T>`, where `T` represents the
   * type of the document being deleted. The filter query object is used to match documents in the
   * database that meet the
   * @returns a Promise that resolves to an object with the following properties:
   * - success_status: a boolean indicating whether the deletion was successful or not
   * - message: a string message indicating the result of the deletion
   * - data: a string indicating that the data has been deleted
   */
  static async delete<T>(MyModel: CrudModelI | CrudModelI[], data: FilterQuery<T>): Promise<any> {
    if (Array.isArray(MyModel)) {
      Promise.all(
        MyModel.map(async (model) => {
          const delet = await model.Model.deleteOne(data);
          if (!delet) {
            throw new ApiError(httpStatus.NOT_IMPLEMENTED, `${model} is not successfully deleted`);
          }
        })
      );
    } else {
      const delet = await MyModel.Model.deleteOne(data);
      if (!delet) {
        throw new ApiError(httpStatus.NOT_FOUND, `${MyModel} is not successfully deleted`);
      }
    }

    return responseMessage<string>({
      success_status: true,
      message: 'Deleted successfully',
      data: 'deleted',
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
  static async getOne<T>(
    MyModel: CrudModelI | CrudModelI[],
    data: FilterQuery<T>,
    populate: PopulateFieldI | PopulateFieldI[]
  ) {
    // const response = await CrudService.
    const getData = [];
    let getOne: any;
    if (Array.isArray(MyModel)) {
      MyModel.forEach(async (model: CrudModelI) => {
        getOne = model.Model.findOne(data).select(model.exempt);
        if (!getOne) throw new ApiError(httpStatus.NOT_FOUND, `${MyModel} is not successfully fetched`);

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
        // if (!getOne)
        //   throw new ApiError(
        //     `${model} is not successfully fetched`,
        //     httpStatus.NOT_IMPLEMENTED
        //   );
        const gotten = await getOne.exec();
        getData.push(gotten);
      });
    } else {
      getOne = MyModel.Model.findOne(data).select(MyModel.exempt);

      if (!getOne) throw new ApiError(httpStatus.NOT_FOUND, `${MyModel} is not successfully fetched`);
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
      const gotten = await getOne.exec();

      getData.push(gotten);
    }

    return responseMessage<T[]>({
      success_status: true,
      message: ' fetched successfully',
      data: getData,
    });
  }
}

export default CrudS;
