import CustomError from "../files/error.handler";

describe("CustomError", () => {
  // CustomError can be instantiated with a status code, message and isOperational flag
  it("should instantiate CustomError with status code, message, and isOperational flag", () => {
    const status = 404;
    const message = "Not Found";
    const isOperational = true;

    const customError = new CustomError(status, message, isOperational);

    expect(customError.status).toBe(status);
    expect(customError.message).toBe(message);
    expect(customError.isOperational).toBe(isOperational);
  });

  // CustomError can be instantiated without passing an isOperational flag
  it("should instantiate CustomError without passing an isOperational flag", () => {
    const status = 500;
    const message = "Internal Server Error";

    const customError = new CustomError(status, message);

    expect(customError.status).toBe(status);
    expect(customError.message).toBe(message);
    expect(customError.isOperational).toBe(true);
  });
});
