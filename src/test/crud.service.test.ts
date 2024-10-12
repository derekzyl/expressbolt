import CrudService from "../files/crud.service";
import CustomError from "../files/error.handler";
import { MyModel, MyModelInterface } from "./model";

describe("CrudService", () => {
  // Successfully create a new document and return it
  it("should create a new document and return it when the document does not already exist", async () => {
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
    const result = await CrudService.create<MyModelInterface>({
      modelData: { Model: MyModel, select: ["-age"] },
      data,
      check,
    });

    // Assert
    expect(result.success).toBe(true);
    // expect(result.data.name).toBe("John Doe");
    // expect(result.data.age).toBe(30);
    expect(result.message).toBe("Successfully created");
  });

  // Throw an error if the document to be created already exists
  it("should throw an error when the document already exists", async () => {
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
    await expect(
      CrudService.create({
        modelData: { Model: MyModel, select: ["age"] },
        data,
        check,
      })
    ).rejects.toThrowError(CustomError);
  });
});
