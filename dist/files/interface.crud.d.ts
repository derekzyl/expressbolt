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
import { Document, Model, PopulateOptions } from "mongoose";
type PrefixedKeys<T> = {
    [K in keyof T]: `-${string & keyof T}`;
}[keyof T];
export interface CrudModelI<V> {
    Model: Model<any>;
    select: (keyof (Pick<Document, "__v" | "id" | "_id"> & V) | PrefixedKeys<Pick<Document, "__v" | "id" | "_id"> & V>)[];
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
export {};
