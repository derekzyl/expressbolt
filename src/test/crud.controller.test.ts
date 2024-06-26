import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Model } from "mongoose";
import CrudController from "../files/crud.controller";
import CrudService from "../files/crud.service";
import CustomError from "../files/error.handler";
import { MyModelInterface } from "./model";

describe("CrudController", () => {
  // should successfully create a new document when create method is called with valid data
  it("should create a new document when create method is called with valid data", async () => {
    // Initialize the necessary variables and objects
    const request = {} as Request;
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    const crudController = new CrudController({
      request,
      response,
      next,
      useNext: true,
      env: "development",
    });

    const modelData = {
      Model: Model,
      select: ["-name", "age"],
    };

    const data = {
      name: "john",
      age: 30,
    };

    const check = {
      // filter query to check if data already exists
    };

    // Mock the CrudService.create method to return a successful response
    CrudService.create = jest.fn().mockResolvedValue({
      success_status: true,
      data: {},
      message: "Successfully created",
    });

    // Invoke the create method
    await crudController.create<MyModelInterface>({
      modelData: { Model, select: ["-age"] },
      data,
      check,
    });

    // Assert that the response status is 201 and the json method is called with the correct response
    expect(response.status).toHaveBeenCalledWith(httpStatus.CREATED);
    expect(response.json).toHaveBeenCalledWith({
      success_status: true,
      data: {},
      message: "Successfully created",
    });
  });

  // should return an error response when create method is called with existing data
  it("should return an error response when create method is called with existing data", async () => {
    // Initialize the necessary variables and objects
    const request = {} as Request;
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;

    const crudController = new CrudController({
      request,
      response,
      next,
      useNext: true,
      env: "development",
    });

    const data = {
      age: 34,
      name: "john",
    };

    const check = {
      // filter query to check if data already exists
    };

    // Mock the CrudService.create method to throw an error
    CrudService.create = jest
      .fn()
      .mockRejectedValue(
        new CustomError(httpStatus.BAD_REQUEST, "Data already exists")
      );

    // Invoke the create method
    await crudController.create<MyModelInterface>({
      modelData: { Model, select: ["-__v", "-_id", "-age"] },
      data,
      check,
    });

    // Assert that the next function is called with the correct error
    expect(next).toHaveBeenCalledWith(
      new CustomError(httpStatus.BAD_REQUEST, "Data already exists")
    );
  });
});
