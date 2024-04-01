import { Document, Model, PopulateOptions } from "mongoose";

export interface CrudModelI<V> {
  Model: Model<any>;
  exempt: (keyof (V & Document) extends string
    ? string
    : never | `-${keyof (V & Document) extends string ? string : never}`)[];
}

export interface PopulateFieldI<V> {
  path?: keyof V;
  fields?: (keyof V extends string ? string : never)[];
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
