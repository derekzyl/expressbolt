const catchAsync = 
/* This code defines a higher-order function named `catchAsync`. This function takes another function
`fn` as a parameter and returns a new function that handles asynchronous errors. */
(fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};
export {};
//# sourceMappingURL=utils.js.map