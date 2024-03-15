declare class Queries {
    model: any;
    request_query: any;
    /**
     * The constructor function takes in a model and request_query as parameters and assigns them to the
     * corresponding properties of the class.
     * @param {any} model - The `model` parameter is used to pass in the model object. This object
     * represents the data structure or schema of the entity that you are working with. It typically
     * includes properties and methods that define how the data is stored, retrieved, and manipulated.
     * @param {any} request_query - The `request_query` parameter is an object that contains the query
     * parameters from an HTTP request. These query parameters are typically used to filter or sort data
     * when querying a database or API.
     */
    constructor(model: any, request_query: any);
    /**
     * The filter function removes excluded fields from the query object and converts it into a string
     * that can be used to filter the model.
     * @returns The filter() method is returning the updated instance of the object.
     */
    filter(): this;
    /**
     * The sort() function sorts the model based on the provided sort query parameter or defaults to
     * sorting by the created_at field in descending order.
     * @returns the updated object with the sorted model.
     */
    sort(): this;
    /**
     * The `limitFields` function selects specific fields from a model based on the `fields` query
     * parameter, or selects all fields except `__v` if no `fields` parameter is provided.
     * @returns the updated object.
     */
    limitFields(): this;
    /**
     * The `paginate` function is used to set the page and limit for pagination in a TypeScript
     * application.
     * @returns The paginate() function returns the modified object itself (this) after applying the skip
     * and limit operations on the model.
     */
    paginate(): this;
}
export default Queries;
