import { Schema, Types, model } from "mongoose";
import {
  IPermissionsDoc,
  IPermissionsModel,
} from "../interfaces/interface.permissions";

const permissionsSchema = new Schema<IPermissionsDoc, IPermissionsModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const PERMISSIONS = model<IPermissionsDoc, IPermissionsModel>(
  "PERMISSIONS",
  permissionsSchema
);
export default PERMISSIONS;
