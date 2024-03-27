import { NextFunction, Request, Response } from "express";

const catchAsync =
  /* This code defines a higher-order function named `catchAsync`. This function takes another function
  `fn` as a parameter and returns a new function that handles asynchronous errors. */
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
