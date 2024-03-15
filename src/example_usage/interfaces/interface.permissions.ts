import mongoose, { Model, } from "mongoose";

interface IPermissions {
  name: string;
  details: string;
}

export interface IPermissionsDoc extends IPermissions, Document {}
export interface IPermissionsModel extends Model<IPermissionsDoc> {
  isExists(
    reference: string,
    excludeBillId?: mongoose.Types.ObjectId
  ): Promise<boolean>;
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<any>;
}

export type PermissionsType = Pick<IPermissions, "details" | "name">;
