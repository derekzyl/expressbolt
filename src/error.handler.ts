class ApiError extends Error {
  status: number;
  isOperational: boolean;

  constructor(status: number, message: string, isOperational = true) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export default ApiError;
