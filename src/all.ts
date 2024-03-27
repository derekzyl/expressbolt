// import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status";
// import mongoose, {
//   Document,
//   FilterQuery,
//   Model,
//   Schema,
//   SchemaDefinition,
//   SchemaDefinitionProperty,
//   UpdateQuery,
//   model,
// } from "mongoose";
// import CrudService from "./crud.service";
// import { errorCenter } from "./error.handler";
// import { CrudModelI, PopulateFieldI } from "./interface.crud";

// class CrudController {
//   request: Request;

//   response: Response;

//   next: NextFunction;

//   useNext: boolean;

//   env: "development" | "production";
//   constructor({
//     request,
//     response,
//     next,
//     useNext = true,
//     env = "development",
//   }: {
//     request: Request;
//     response: Response;
//     next: NextFunction;
//     useNext?: boolean;
//     env?: "development" | "production";
//   }) {
//     this.request = request;
//     this.response = response;
//     this.next = next;
//     this.useNext = useNext;
//     this.env = env;
//   }

//   async create<T, U>({
//     modelData,
//     data,
//     check,
//   }: {
//     modelData: CrudModelI;
//     data: T;
//     check: FilterQuery<U>;
//   }): Promise<Response | NextFunction | void> {
//     try {
//       const response = await CrudService.create({ modelData, data, check });

//       return this.response.status(httpStatus.CREATED).json(response);
//     } catch (error) {
//       return this.useNext
//         ? this.next(error)
//         : errorCenter({ env: this.env, error: error, response: this.response });
//     }
//   }

//   async createMany<T, U>({
//     check,
//     modelData,
//     data,
//   }: {
//     modelData: CrudModelI;
//     data: T[];
//     check: FilterQuery<U>[];
//   }): Promise<Response | NextFunction | void> {
//     try {
//       const response = await CrudService.createMany({ modelData, data, check });
//       return this.response.status(httpStatus.CREATED).json(response);
//     } catch (error) {
//       return this.useNext
//         ? this.next(error)
//         : errorCenter({ env: this.env, error: error, response: this.response });
//     }
//   }

//   async update<T, U>({
//     data,
//     modelData,
//     filter,
//   }: {
//     modelData: CrudModelI;
//     data: UpdateQuery<T>;
//     filter: FilterQuery<U>;
//   }) {
//     try {
//       const response = await CrudService.update({ modelData, data, filter });

//       return this.response.status(httpStatus.OK).json(response);
//     } catch (error) {
//       return this.useNext
//         ? this.next(error)
//         : errorCenter({ env: this.env, error: error, response: this.response });
//     }
//   }

//   async getMany<T>({
//     filter = null,
//     modelData,
//     populate,
//     query,
//   }: {
//     modelData: CrudModelI;
//     query: any;
//     populate: PopulateFieldI | PopulateFieldI[];
//     filter: FilterQuery<T> | null;
//   }) {
//     try {
//       const response = await CrudService.getMany({
//         modelData,
//         query,
//         populate,
//         filter,
//       });

//       this.response.status(httpStatus.OK).json(response);
//     } catch (error) {
//       return this.useNext
//         ? this.next(error)
//         : errorCenter({ env: this.env, error: error, response: this.response });
//     }
//   }

//   async delete<T>({
//     data,
//     modelData,
//   }: {
//     modelData: CrudModelI;
//     data: FilterQuery<T>;
//   }) {
//     try {
//       const response = await CrudService.delete({ modelData, data });

//       this.response.status(httpStatus.OK).json(response);
//     } catch (error) {
//       return this.useNext
//         ? this.next(error)
//         : errorCenter({ env: this.env, error: error, response: this.response });
//     }
//   }

//   async getOne<T>({
//     data,
//     modelData,
//     populate,
//   }: {
//     modelData: CrudModelI;
//     data: FilterQuery<T>;
//     populate: PopulateFieldI | PopulateFieldI[];
//   }) {
//     try {
//       const response = await CrudService.getOne({ modelData, data, populate });

//       this.response.status(httpStatus.OK).json(response);
//     } catch (error) {
//       this.next(error);
//     }
//   }
// }

// export default CrudController;

// // Interface for dynamic field definition
// type DynamicField<T> = {
//   [key in keyof T]: SchemaDefinitionProperty<T>;
// };

// const generateDynamicSchema = <T, U>({
//   fields,
//   modelName,
//   plugins,
//   schemaOptions,
// }: {
//   modelName: string;
//   fields: DynamicField<T>;
//   plugins?: any[];
//   schemaOptions?: Record<string, any>;
// }) => {
//   type ITDoc = T & Document;
//   type ITModel = Model<ITDoc> & U;
//   const schemaDefinition: SchemaDefinition = {};

//   for (const [keys, values] of Object.entries(fields)) {
//     const fieldOptions = values;

//     if (typeof fieldOptions === "object") {
//       schemaDefinition[keys] = fieldOptions as SchemaDefinitionProperty;
//     } else if (Array.isArray(fieldOptions)) {
//       switch (typeof fieldOptions[0]) {
//         case "string":
//           schemaDefinition[keys] = {
//             type: [String],
//           };
//           break;
//         case "number":
//           schemaDefinition[keys] = {
//             type: [Number],
//           };
//           break;
//         case "object":
//           {
//             Object.prototype.hasOwnProperty.call(fieldOptions[0], "ref") &&
//             Object.prototype.hasOwnProperty.call(fieldOptions[0], "type") &&
//             fieldOptions[0].type === mongoose.Schema.Types.ObjectId
//               ? (schemaDefinition[keys] = fieldOptions)
//               : (schemaDefinition[keys] = generateDynamicSchema({
//                   modelName: "",
//                   fields: fieldOptions[0],
//                   schemaOptions: schemaOptions ?? {},
//                 }).schema);
//           }
//           break;
//         case "bigint":
//           schemaDefinition[keys] = {
//             type: [BigInt],
//           };
//           break;
//         case "boolean":
//           schemaDefinition[keys] = {
//             type: [Boolean],
//           };
//           break;
//         case "symbol":
//           schemaDefinition[keys] = {
//             type: [String],
//           };
//           break;
//         default:
//           break;
//       }
//     } else {
//       schemaDefinition[keys] = {
//         type: fieldOptions,
//       };
//     }
//   }

//   // Create and return the schema
//   const schemaDef = new Schema<ITDoc, ITModel>(schemaDefinition, schemaOptions);
//   plugins?.forEach((plugin) => schemaDef.plugin(plugin));
//   return {
//     model: model<ITDoc, ITModel>(modelName, schemaDef),
//     schema: schemaDef,
//   };
// };

// export default generateDynamicSchema;

// import { request } from "express";
// import CustomError from "./error.handler";
// import { CustomMessageI } from "./interface.crud";
// import Queries from "./query";
// import responseMessage from "./responseMessage";

// class CrudService {
//   static async create<T, U>({
//     check,
//     modelData,
//     data,
//   }: {
//     modelData: CrudModelI;
//     data: T;
//     check: FilterQuery<U>;
//   }): Promise<any> {
//     const find =
//       Object.keys(check).length !== 0
//         ? await modelData.Model.findOne(check)
//         : null;
//     if (find) {
//       throw new CustomError(
//         httpStatus.BAD_REQUEST,
//         `the data ${JSON.stringify(
//           Object.keys(check).join(", ")
//         )} already exists in the database`
//       );
//     }

//     const create = new modelData.Model(data);
//     const created = await create.save();

//     if (!created) {
//       throw new CustomError(
//         httpStatus.BAD_REQUEST,
//         `${modelData.Model.collection.collectionName} is not successfully created`
//       );
//     }

//     const dat = await modelData.Model.findById(created._id).select(
//       modelData.exempt
//     );

//     return responseMessage<U>({
//       success_status: true,
//       data: dat,
//       message: "Successfully created",
//     });
//   }

//   static async createMany<T, U>({
//     check,
//     data,
//     modelData,
//   }: {
//     modelData: CrudModelI;
//     data: T[];
//     check: FilterQuery<U>[];
//   }): Promise<any> {
//     const checks = check.map((findr) => {
//       return Object.keys(findr).length !== 0
//         ? modelData.Model.findOne(findr)
//         : null;
//     });

//     const finds = await Promise.all(checks);

//     finds.forEach((find, index) => {
//       if (find) {
//         throw new CustomError(
//           httpStatus.BAD_REQUEST,
//           `the data ${JSON.stringify(
//             Object.keys(check[index]).join(", ")
//           )} already exists in the database`
//         );
//       }
//     });

//     const created = await modelData.Model.insertMany(data);

//     if (!created) {
//       throw new CustomError(
//         httpStatus.BAD_REQUEST,
//         `${modelData.Model.collection.collectionName} is not successfully created`
//       );
//     }

//     const exemptedData = await Promise.all(
//       created.map((item) =>
//         modelData.Model.findById(item._id).select(modelData.exempt)
//       )
//     );

//     return responseMessage<U[]>({
//       success_status: true,
//       data: exemptedData,
//       message: "Successfully created",
//     });
//   }

//   static async update<T, U>({
//     data,
//     filter,
//     modelData,
//   }: {
//     modelData: CrudModelI;
//     data: UpdateQuery<T>;
//     filter: FilterQuery<U>;
//   }): Promise<any> {
//     const dataF: Array<any> = [];

//     const findAndUpdate = await modelData.Model.findOneAndUpdate(
//       filter,
//       data
//     ).select(modelData.exempt);
//     if (!findAndUpdate) {
//       throw new CustomError(
//         httpStatus.BAD_REQUEST,
//         `${data} not updated successfully`
//       );
//     } else {
//       dataF.push(findAndUpdate);
//     }

//     return responseMessage<U>({
//       success_status: true,
//       data: dataF[0],
//       message: "Successfully updated",
//     });
//   }

//   static async getMany<T>({
//     filter,
//     modelData,
//     populate,
//     query,
//   }: {
//     modelData: CrudModelI;
//     query: typeof request.query;
//     populate: PopulateFieldI | PopulateFieldI[];
//     filter: FilterQuery<T> | null;
//   }): Promise<any> {
//     const all: any[] = [];
//     const processModel = async (model: CrudModelI) => {
//       let modelFind = filter ? model.Model.find(filter) : model.Model.find();
//       if (model.exempt) {
//         modelFind = modelFind.select(model.exempt);
//       }
//       if (populate) {
//         modelFind = CrudService.populateModel(modelFind, populate);
//       }
//       const queryf = new Queries(modelFind, query)
//         .filter()
//         .limitFields()
//         .paginate()
//         .sort();
//       const queryG = await queryf.model;
//       if (!queryG) {
//         throw new CustomError(httpStatus.NOT_FOUND, `${model} is not fetched`);
//       }
//       all.push(queryG);
//     };

//     // if (Array.isArray(modelData)) {
//     //   await Promise.all(modelData.map(processModel));
//     // } else {
//     await processModel(modelData);
//     // }

//     return responseMessage<T[]>({
//       success_status: true,
//       message: "Data fetched successfully",
//       data: all[0],
//       doc_length: all.length,
//     });
//   }

//   private static populateModel(
//     modelFind: any,
//     populate: PopulateFieldI | PopulateFieldI[]
//   ): any {
//     if (!populate) {
//       return modelFind;
//     }

//     const populateArr = Array.isArray(populate) ? populate : [populate];

//     return populateArr.reduce((model, pop) => {
//       if (!pop.model) {
//         return model;
//       }

//       return model.populate({
//         path: pop.model,
//         select: pop.fields,
//         populate: pop.second_layer_populate,
//       });
//     }, modelFind);
//   }

//   static async delete<T>({
//     data,
//     modelData,
//   }: {
//     modelData: CrudModelI;
//     data: FilterQuery<T>;
//   }): Promise<any> {
//     // if (Array.isArray(modelData)) {
//     //   Promise.all(
//     //     modelData.map(async (model) => {
//     //       const delet = await model.Model.deleteOne(data);
//     //       if (!delet) {
//     //         throw new CustomError (
//     //           httpStatus.NOT_IMPLEMENTED,
//     //           `${model} is not successfully deleted`
//     //         );
//     //       }
//     //     })
//     //   );
//     // } else {
//     const delet = await modelData.Model.deleteOne(data);
//     if (!delet) {
//       throw new CustomError(
//         httpStatus.NOT_FOUND,
//         `${modelData} is not successfully deleted`
//       );
//       // }
//     }

//     return responseMessage<string>({
//       success_status: true,
//       message: "Deleted successfully",
//       data: "deleted",
//     });
//   }

//   static async getOne<T>({
//     modelData,
//     data,
//     populate,
//   }: {
//     modelData: CrudModelI;
//     data: FilterQuery<T>;
//     populate: PopulateFieldI | PopulateFieldI[];
//   }) {
//     // const response = await CrudService.
//     const getData = [];
//     let getOne: any;

//     getOne = modelData.Model.findOne(data).select(modelData.exempt);

//     if (!getOne)
//       throw new CustomError(
//         httpStatus.NOT_FOUND,
//         `${modelData} is not successfully fetched`
//       );
//     if (populate && Array.isArray(populate))
//       populate.forEach((pop) => {
//         if (pop.model)
//           getOne = getOne.populate({
//             path: pop.model,
//             select: pop.fields,
//             populate: pop.second_layer_populate,
//           });
//       });
//     else if (populate && !Array.isArray(populate))
//       if (populate.model)
//         getOne = getOne.populate({
//           path: populate.model,
//           select: populate.fields,
//           populate: populate.second_layer_populate,
//         });
//     const gotten = await getOne.exec();

//     getData.push(gotten);

//     return responseMessage<T>({
//       success_status: true,
//       message: " fetched successfully",
//       data: getData[0],
//     });
//   }
// }

// export default CrudService;

// class CustomError extends Error {
//   status: number;
//   isOperational: boolean;

//   constructor(status: number, message: string, isOperational = true) {
//     super(message);
//     this.status = status;
//     this.isOperational = isOperational;

//     // Set the prototype explicitly.
//     Object.setPrototypeOf(this, CustomError.prototype);
//   }
// }

// export const errorCenter = ({
//   error,
//   response,
//   env = "development",
// }: {
//   error: any;

//   response: Response;

//   env: "production" | "development";
// }) => {
//   const error_status = error.statusCode ?? 500;

//   let error_message: string = error.message;

//   //mongodb error
//   if (error_message.includes("E11000")) {
//     error_message = "data already exist in the database";
//   }

//   const error_info = error.information;

//   response.status(error_status).json(
//     responseMessage(
//       {
//         message: error_info,
//         success_status: false,
//         data: error_message,
//         stack: error.stack,
//       },
//       env
//     )
//   );
// };
// export default CustomError;

// function responseMessage<V>(
//   msg: CustomMessageI<V>,
//   config: "development" | "production" = "development"
// ) {
//   switch (msg.success_status) {
//     case true:
//       return {
//         message: msg.message,
//         data: msg.data,
//         success: msg.success_status,
//         doc_length: msg.doc_length,
//       };

//     case false:
//       return {
//         message: msg.message,
//         error: msg.error,
//         success: msg.success_status,
//         stack: config === "development" ? msg.stack : {},
//       };
//   }
// }
// export default responseMessage;
// class Queries {
//   model: any;

//   request_query: any;

//   constructor(model: any, request_query: any) {
//     this.model = model;
//     this.request_query = request_query;
//   }

//   /**
//    * The filter function removes excluded fields from the query object and converts it into a string
//    * that can be used to filter the model.
//    * @returns The filter() method is returning the updated instance of the object.
//    */
//   filter() {
//     const queryObj = { ...this.request_query };
//     const excludedFields = ["page", "sort", "limit", "fields"];
//     excludedFields.forEach((el) => delete queryObj[el]);

//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//     this.model = this.model.find(JSON.parse(queryStr));

//     return this;
//   }

//   sort() {
//     if (this.request_query.sort) {
//       const sortBy = this.request_query.sort.split(",").join(" ");
//       this.model = this.model.sort(sortBy);
//     } else {
//       this.model = this.model.sort("-created_at");
//     }

//     return this;
//   }

//   limitFields() {
//     if (this.request_query.fields) {
//       const fields = this.request_query.fields.split(",").join(" ");
//       this.model = this.model.select(fields);
//     } else {
//       this.model = this.model.select("-__v");
//     }

//     return this;
//   }

//   paginate() {
//     const page = this.request_query.page * 1 || 1;
//     const limit = this.request_query.limit * 1 || 100;
//     const skip = (page - 1) * limit;

//     this.model = this.model.skip(skip).limit(limit);

//     return this;
//   }
// }

// export default Queries;
