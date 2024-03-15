declare class ApiError extends Error {
    status: number;
    isOperational: boolean;
    constructor(status: number, message: string, isOperational?: boolean);
}
export default ApiError;
