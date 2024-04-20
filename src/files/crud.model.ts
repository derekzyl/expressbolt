import mongoose, {
  Document,
  Model,
  Schema,
  SchemaDefinition,
  SchemaDefinitionProperty,
  model,
} from "mongoose";

// Interface for dynamic field definition
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

    /* The `if (typeof fieldOptions === "object") {` condition in the code snippet is checking if the
    `fieldOptions` variable is of type "object". If the `fieldOptions` is an object, it means that
    the field definition for a specific key in the dynamic schema is an object with additional
    properties defining the field type and options. In this case, the code processes the field
    options accordingly to define the schema property for that key in the Mongoose schema being
    generated... */
    if (typeof fieldOptions === "object") {
      schemaDefinition[keys] = fieldOptions as SchemaDefinitionProperty;
    } else if (Array.isArray(fieldOptions)) {
      switch (typeof fieldOptions[0]) {
        case "string":
          schemaDefinition[keys] = {
            type: [String],
          };
          break;
        case "number":
          schemaDefinition[keys] = {
            type: [Number],
          };
          break;
        case "object":
          {
            Object.prototype.hasOwnProperty.call(fieldOptions[0], "ref") &&
            Object.prototype.hasOwnProperty.call(fieldOptions[0], "type") &&
            fieldOptions[0].type === mongoose.Schema.Types.ObjectId
              ? (schemaDefinition[keys] = fieldOptions)
              : (schemaDefinition[keys] = generateDynamicSchema({
                  modelName: "",
                  fields: fieldOptions[0],
                  schemaOptions: schemaOptions ?? {},
                }).schema);
          }
          break;
        case "bigint":
          schemaDefinition[keys] = {
            type: [BigInt],
          };
          break;
        case "boolean":
          schemaDefinition[keys] = {
            type: [Boolean],
          };
          break;
        case "symbol":
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






