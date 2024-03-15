import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";
import { CrudController } from "../..";

import ApiError from "../../files/error.handler";
import { IRolesDoc, RoleTypes } from "../interfaces/interface.roles";
import ROLES from "../models/model.roles";

export const createRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rolesBody: RoleTypes = req.body;
  const createRole = new CrudController(req, res, next);
  await createRole.create<RoleTypes, IRolesDoc>(
    { exempt: "-_v", Model: ROLES },
    rolesBody,
    {
      name: rolesBody.name,
    }
  );
};

export const getAllRolesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const getAllRoles = new CrudController(req, res, next);
  await getAllRoles.getMany<IRolesDoc>(
    { exempt: "-_v", Model: ROLES },
    req.query,
    {},
    {}
  );
};

export const updateRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rolesBody: Partial<RoleTypes> = req.body;
  const id = new Types.ObjectId(req.params["roleId"]);
  if (rolesBody.permissions) {
    const findRole = await ROLES.findById(id);
    if (!findRole) throw new ApiError(httpStatus.NOT_FOUND, "role not found");
    rolesBody.permissions = Array.from(new Set(rolesBody.permissions));
  }

  const updateRole = new CrudController(req, res, next);
  await updateRole.update<RoleTypes, IRolesDoc>(
    { exempt: "-_v", Model: ROLES },
    rolesBody,
    { _id: id }
  );
};

export const getRoleControllerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = new Types.ObjectId(req.params["roleId"]);
  const getRole = new CrudController(req, res, next);
  await getRole.getOne<IRolesDoc>(
    { exempt: "-_v", Model: ROLES },
    { _id: id },
    {}
  );
};

export const getRoleControllerByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const getRole = new CrudController(req, res, next);
  await getRole.getOne<IRolesDoc>(
    { exempt: "-_v", Model: ROLES },
    { name },
    {}
  );
};
