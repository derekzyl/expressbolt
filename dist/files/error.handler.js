class ApiError extends Error {
    constructor(status, message, isOperational = true) {
        super(message);
        this.status = status;
        this.isOperational = isOperational;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
export default ApiError;
//# sourceMappingURL=error.handler.js.map