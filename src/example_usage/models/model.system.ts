/* import { paginate } from '@modules/paginate'; */
import generateDynamicSchema from "../../files/crud.model";
import { ISystem, ISystemModel } from "../interfaces/interface.system";

const dynamicModel = generateDynamicSchema<ISystem, ISystemModel>({
  modelName: "SYSTEMS",
  fields: {
    canRegisterOnAdminPanel: { type: String },
    frontendLogo: {
      type: String,
    },
    frontendUrl: { type: String },
    sendSms: { type: Boolean },
  },
  schemaOptions: { timestamps: true },
  plugins: [
    /* paginate */
  ],
});

dynamicModel.schema.pre("save", async function (next) {
  const existingDocument = await SYSTEMS.findOne();
  if (existingDocument) {
    const error = new Error("Only one document of SYSTEMS model is allowed.");
    return next(error);
  }
  next();
});
export const SYSTEMS = dynamicModel.model;
