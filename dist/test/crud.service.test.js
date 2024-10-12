var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CrudService from "../files/crud.service";
import CustomError from "../files/error.handler";
import { MyModel } from "./model";
describe("CrudService", () => {
    // Successfully create a new document and return it
    it("should create a new document and return it when the document does not already exist", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const modelData = {
            Model: MyModel,
            select: [],
        };
        const data = {
            name: "John Doe",
            age: 30,
        };
        const check = {
            name: "John Doe",
        };
        // Act
        const result = yield CrudService.create({
            modelData: { Model: MyModel, select: ["-age"] },
            data,
            check,
        });
        // Assert
        expect(result.success).toBe(true);
        // expect(result.data.name).toBe("John Doe");
        // expect(result.data.age).toBe(30);
        expect(result.message).toBe("Successfully created");
    }));
    // Throw an error if the document to be created already exists
    it("should throw an error when the document already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const modelData = {
            Model: MyModel,
            select: ["-password"],
        };
        const data = {
            name: "John Doe",
            age: 30,
        };
        const check = {
            name: "John Doe",
        };
        // Act & Assert
        yield expect(CrudService.create({
            modelData: { Model: MyModel, select: ["age"] },
            data,
            check,
        })).rejects.toThrowError(CustomError);
    }));
});
//# sourceMappingURL=crud.service.test.js.map