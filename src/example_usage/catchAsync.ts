import { NextFunction, Request, Response } from 'express';

/**
 * The catchAsync function is a TypeScript middleware that wraps an asynchronous function and catches
 * any errors that occur during its execution.
 *
 * @param fn The `fn` parameter is a function that will be executed asynchronously. It can be any
 * function that returns a promise or uses async/await syntax. This function will be called with the
 * `req`, `res`, and `next` parameters, which are the request, response, and next middleware function
 */
const catchAsync = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsync;
