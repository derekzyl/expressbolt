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
import mongoose, { CompileModelOptions, Document, Model, Schema, SchemaDefinitionProperty } from "mongoose";
type DynamicField<T> = {
    [key in keyof T]: SchemaDefinitionProperty<T>;
};
type modelT<T, U> = (name: string, schema?: Schema<T, any, any> | Schema<T & Document, any, any>, collection?: string, options?: CompileModelOptions) => Model<T>;
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
declare const generateDynamicSchema: <T, U>({ fields, modelName, plugins, schemaOptions, model }: {
    modelName: string;
    fields: DynamicField<T>;
    plugins?: any[] | undefined;
    schemaOptions?: Record<string, any> | undefined;
    model: modelT<T & Document, Model<T & Document> & U>;
}) => {
    model: mongoose.Model<T & mongoose.Document<any, any, any>, {}, {}, {}, mongoose.IfAny<T & mongoose.Document<any, any, any>, any, mongoose.Document<unknown, {}, T & mongoose.Document<any, any, any>> & mongoose.Require_id<T & mongoose.Document<any, any, any>>>, any>;
    schema: mongoose.Schema<T & mongoose.Document<any, any, any>, mongoose.Model<T & mongoose.Document<any, any, any>, {}, {}, {}, mongoose.IfAny<T & mongoose.Document<any, any, any>, any, mongoose.Document<unknown, {}, T & mongoose.Document<any, any, any>> & mongoose.Require_id<T & mongoose.Document<any, any, any>>>, any> & U, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, mongoose.ObtainDocumentType<any, T & mongoose.Document<any, any, any>, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>>, mongoose.IfAny<mongoose.FlatRecord<mongoose.ObtainDocumentType<any, T & mongoose.Document<any, any, any>, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>>>, any, mongoose.Document<unknown, {}, mongoose.FlatRecord<mongoose.ObtainDocumentType<any, T & mongoose.Document<any, any, any>, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>>>> & mongoose.Require_id<mongoose.FlatRecord<mongoose.ObtainDocumentType<any, T & mongoose.Document<any, any, any>, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>>>>>>;
};
export default generateDynamicSchema;
