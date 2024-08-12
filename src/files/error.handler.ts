import { Response } from "express";
import responseMessage from "./responseMessage";

class CustomError extends Error {
  status: number;
  isOperational: boolean;

  constructor(status: number, message: string, isOperational = true) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

// const handleMongooseError = (error: any): string => {
//   let errorMessage = "An error occurred";

//   if (
//     error instanceof mongoose.Error.ValidationError &&
//     (error.code === 11000 || error.code === 11001)
//   ) {
//     // Duplicate key error (unique constraint violation)
//     errorMessage = "Duplicate key error. This record already exists.";
//   } else if (
//     error instanceof mongoose.Error &&
//     error.name === "ValidationError"
//   ) {
//     // Mongoose validation error
//     const errors = Object.values(error.errors).map(
//       (error: any) => error.message
//     );
//     errorMessage = `Validation error: ${errors.join(", ")}`;
//   } else {
//     // Other types of errors
//     errorMessage = error.message || errorMessage;
//   }

//   return errorMessage;
// };

export const errorCenter = ({
  error,
  response,
  env = "development",
}: {
  error: any;

  response: Response;

  env: "production" | "development";
}) => {
  const error_status = error.statusCode ?? 500;

  let error_message: string = error.message;

  //mongodb error
  if (error_message.includes("E11000")) {
    error_message = "data already exist in the database";
  }

  const error_info = error.information;

  response.status(error_status).json(
    responseMessage(
      {
        message: error_info,
        success: false,
        data: error_message,
        stack: error.stack,
      },
      env
    )
  );
};
export default CustomError;
