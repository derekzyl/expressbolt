import mongoose, { SchemaDefinitionProperty } from "mongoose";
type DynamicField<T> = {
    [key in keyof T]: SchemaDefinitionProperty<T>;
};
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
export default generateDynamicSchema;
