var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import httpStatus from "http-status";
import { Model } from "mongoose";
import CrudController from "../files/crud.controller";
import CrudService from "../files/crud.service";
import CustomError from "../files/error.handler";
describe("CrudController", () => {
    // should successfully create a new document when create method is called with valid data
    it("should create a new document when create method is called with valid data", () => __awaiter(void 0, void 0, void 0, function* () {
        // Initialize the necessary variables and objects
        const request = {};
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
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
        yield crudController.create({
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
    }));
    // should return an error response when create method is called with existing data
    it("should return an error response when create method is called with existing data", () => __awaiter(void 0, void 0, void 0, function* () {
        // Initialize the necessary variables and objects
        const request = {};
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
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
            .mockRejectedValue(new CustomError(httpStatus.BAD_REQUEST, "Data already exists"));
        // Invoke the create method
        yield crudController.create({
            modelData: { Model, select: ["-__v", "-_id", "-age"] },
            data,
            check,
        });
        // Assert that the next function is called with the correct error
        expect(next).toHaveBeenCalledWith(new CustomError(httpStatus.BAD_REQUEST, "Data already exists"));
    }));
});
//# sourceMappingURL=crud.controller.test.js.map