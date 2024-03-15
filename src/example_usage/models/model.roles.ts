import { Schema, Types, model } from "mongoose";
import { IRolesDoc, IRolesModel } from "../interfaces/interface.roles";

const rolesSchema = new Schema<IRolesDoc, IRolesModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    permissions: { type: Schema.Types.Mixed },
    details: { type: String },
  },
  { timestamps: true }
);

rolesSchema.static(
  "isExist",
  async function (name: string, exclude: Types.ObjectId): Promise<boolean> {
    const role = await this.findOne({ name, _id: { $ne: exclude } });
    return !!role;
  }
);
rolesSchema.pre("save", async function () {
  this.permissions = Array.from(new Set(this.permissions));
  this.name = this.name.toLowerCase();
});
const ROLES = model<IRolesDoc, IRolesModel>("ROLES", rolesSchema);
export default ROLES;
