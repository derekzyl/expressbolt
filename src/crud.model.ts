import mongoose, { Document, Model, Schema, SchemaDefinition, SchemaDefinitionProperty, model } from 'mongoose';

// Interface for common Mongoose schema options
// interface MongooseSchemaOptions {
//   type?: Boolean | String | Number | any;
//   ref?: string;
//   required?: boolean;
//   unique?: boolean;
//   default?: any;
//   enum?: any[];
//   lowercase?: boolean;
//   uppercase?: boolean;
//   trim?: boolean;
//   min?: number | [number, string];
//   max?: number | [number, string];
//   validate?: Function;
//   get?: (value: any, doc?: SchemaTypeOptions<any> | undefined) => any;
//   set?: (value: any, priorVal?: any, doc?: SchemaTypeOptions<any> | undefined) => any;
//   select?: boolean;
// }

// Interface for dynamic field definition
type DynamicField<T> = {
  [key in keyof T]: SchemaDefinitionProperty<T>;
};

// Generic function to generate dynamic schema
const generateDynamicSchema = <T, U>({
  fields,
  modelName,
  plugins,
  schemaOptions,
}: {
  modelName: string;
  fields: DynamicField<T>;
  plugins?: any[];
  schemaOptions?: Record<string, any>;
}) => {
  type ITDoc = T & Document;
  type ITModel = Model<ITDoc> & U;
  const schemaDefinition: SchemaDefinition = {};

  // Iterate through the fields and define the schema
  // eslint-disable-next-line no-restricted-syntax
  for (const [keys, values] of Object.entries(fields)) {
    const fieldOptions = values;

    if (typeof fieldOptions === 'object') {
      schemaDefinition[keys] = fieldOptions as SchemaDefinitionProperty;
    } else if (Array.isArray(fieldOptions)) {
      switch (typeof fieldOptions[0]) {
        case 'string':
          schemaDefinition[keys] = {
            type: [String],
          };
          break;
        case 'number':
          schemaDefinition[keys] = {
            type: [Number],
          };
          break;
        case 'object':
          {
            Object.prototype.hasOwnProperty.call(fieldOptions[0], 'ref') &&
            Object.prototype.hasOwnProperty.call(fieldOptions[0], 'type') &&
            fieldOptions[0].type === mongoose.Schema.Types.ObjectId
              ? (schemaDefinition[keys] = fieldOptions)
              : (schemaDefinition[keys] = generateDynamicSchema({
                  modelName: '',
                  fields: fieldOptions[0],
                  schemaOptions: schemaOptions ?? {},
                }).schema);
          }
          break;
        case 'bigint':
          schemaDefinition[keys] = {
            type: [BigInt],
          };
          break;
        case 'boolean':
          schemaDefinition[keys] = {
            type: [Boolean],
          };
          break;
        case 'symbol':
          schemaDefinition[keys] = {
            type: [String],
          };
          break;
        default:
          break;
      }
    } else {
      schemaDefinition[keys] = {
        type: fieldOptions,
      };
    }
  }

  // Create and return the schema
  const schemaDef = new Schema<ITDoc, ITModel>(schemaDefinition, schemaOptions);
  plugins?.forEach((plugin) => schemaDef.plugin(plugin));
  return {
    model: model<ITDoc, ITModel>(modelName, schemaDef),
    schema: schemaDef,
  };
};

export default generateDynamicSchema;
