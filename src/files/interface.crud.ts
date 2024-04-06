import { Document, Model, PopulateOptions } from "mongoose";

type PrefixedKeys<T> = { [K in keyof T]: `-${string & keyof T}` }[keyof T];

export interface CrudModelI<V> {
  Model: Model<any>;
  exempt: (keyof (Document & V) | PrefixedKeys<Document & V>)[] /* (
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
  success_status: boolean;
  data: V;
  stack?: any;
  error?: any;
  doc_length?: number;
}
