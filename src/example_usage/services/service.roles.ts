import { Types } from "mongoose";

import { CrudService } from "../..";
import { IRolesDoc, RoleTypes } from "../interfaces/interface.roles";
import ROLES from "../models/model.roles";

export const createRoleService = async (req: RoleTypes) => {
  const data = await CrudService.create<RoleTypes, IRolesDoc>(
    { exempt: "-_v", Model: ROLES },
    { ...req },
    { name: req.name.toLowerCase() }
  );
  return data;
};

export const getRolesService = async (
  req: Partial<RoleTypes & { _id: Types.ObjectId }>
) => {
  const data = await CrudService.getOne<IRolesDoc>(
    { exempt: "-_v", Model: ROLES },
    { ...req },
    {}
  );
  return data;
};
