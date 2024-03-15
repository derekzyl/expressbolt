import { NextFunction, Request, Response } from "express";
import {
  IPermissionsDoc,
  PermissionsType,
} from "../interfaces/interface.permissions";
import PERMISSIONS from "../models/models.permissions";

import { CrudController, CrudService } from "../..";

import catchAsync from "../catchAsync";

export const getAllPermissionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const getAllPermissions = new CrudController(req, res, next);
  await getAllPermissions.getMany(
    { exempt: "-_v", Model: PERMISSIONS },
    req.query,
    {},
    {}
  );
};

export const getOnePermissionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const getOnePermission = new CrudController(req, res, next);

  await getOnePermission.getOne(
    { exempt: "-_v", Model: PERMISSIONS },
    req.body,
    {}
  );
};

export const createManyPermissionsController = catchAsync(
  async (req: Request, res: Response) => {
    // logger.info(req.body);
    const createManyPermissions = await CrudService.createMany<
      PermissionsType,
      IPermissionsDoc
    >({ exempt: "-_V", Model: PERMISSIONS }, req.body, [{}]);
    res.send(createManyPermissions);
  }
);

export const updatePermissionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updatePermission = new CrudController(req, res, next);

  await updatePermission.update<PermissionsType, IPermissionsDoc>(
    { Model: PERMISSIONS, exempt: "-_v _id" },
    req.body,
    {}
  );
};
export const deletePermissionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deletePermission = new CrudController(req, res, next);

  await deletePermission.delete(
    { Model: PERMISSIONS, exempt: "-_v _id" },
    req.body
  );
};
