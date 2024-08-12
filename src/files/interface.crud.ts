import { Document, Model, PopulateOptions } from "mongoose";

type PrefixedKeys<T> = { [K in keyof T]: `-${string & keyof T}` }[keyof T];

export interface CrudModelI<V> {
  Model: Model<any>;
  select: (
    | keyof (Pick<Document, "__v" | "id" | "_id"> & V)
    | PrefixedKeys<Pick<Document, "__v" | "id" | "_id"> & V>
  )[] /* (
    | keyof Document<V>
    | `-${keyof Document<V> extends string ? string : never}`
  )[]; */;
}

export interface PopulateFieldI<V> {
  path?: keyof V;
  fields?: string[];
  second_layer_populate?: PopulateOptions | string;
}
export interface CustomMessageI<V> {
  message: string;
  success: boolean;
  data?: V;
  stack?: any;
  error?: any;
  doc_length?: number;
}
