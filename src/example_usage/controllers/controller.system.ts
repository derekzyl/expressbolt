import { Request, Response } from "express";
import httpStatus from "http-status";
import { CrudService } from "../..";
import catchAsync from "../catchAsync";
import { ISystem, ISystemDoc } from "../interfaces/interface.system";
import { SYSTEMS } from "../models/model.system";

export const createSystemController = catchAsync(
  async (req: Request, res: Response) => {
    const service = await CrudService.create<ISystem, ISystemDoc>(
      { exempt: "-_V", Model: SYSTEMS },
      { ...req.body },
      {}
    );
    res.status(httpStatus.CREATED).json(service);
  }
);
export const getSystemController = catchAsync(
  async (req: Request, res: Response) => {
    const service = await CrudService.getOne<ISystemDoc>(
      { exempt: "-_V", Model: SYSTEMS },
      { _id: req.params["id"] },
      {}
    );
    res.status(200).json(service);
  }
);
export const getSystemsController = catchAsync(
  async (req: Request, res: Response) => {
    const service = await CrudService.getMany<ISystemDoc>(
      { exempt: "-_V", Model: SYSTEMS },
      req.query,
      {}
    );
    res.status(200).json(service);
  }
);
export const updateSystemController = catchAsync(
  async (req: Request, res: Response) => {
    const service = await CrudService.update<ISystem, ISystemDoc>(
      { exempt: "-_V", Model: SYSTEMS },
      { ...req.body },
      { _id: req.params["id"] }
    );
    res.status(200).json(service);
  }
);

export const deleteSystemController = catchAsync(
  async (req: Request, res: Response) => {
    const service = await CrudService.delete<ISystemDoc>(
      { exempt: "-_V", Model: SYSTEMS },
      { _id: req.params["id"] }
    );
    res.status(200).json(service);
    return;
  }
);
