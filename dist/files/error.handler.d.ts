import { Response } from "express";
declare class CustomError extends Error {
    status: number;
    isOperational: boolean;
    constructor(status: number, message: string, isOperational?: boolean);
}
export declare const errorCenter: ({ error, response, env, }: {
    error: any;
    response: Response;
    env: "production" | "development";
}) => void;
export default CustomError;
