class Queries {
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
    constructor(model, request_query) {
        this.model = model;
        this.request_query = request_query;
    }
    /**
     * The filter function removes excluded fields from the query object and converts it into a string
     * that can be used to filter the model.
     * @returns The filter() method is returning the updated instance of the object.
     */
    filter() {
        const queryObj = Object.assign({}, this.request_query);
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.model = this.model.find(JSON.parse(queryStr));
        return this;
    }
    /**
     * The sort() function sorts the model based on the provided sort query parameter or defaults to
     * sorting by the created_at field in descending order.
     * @returns the updated object with the sorted model.
     */
    sort() {
        if (this.request_query.sort) {
            const sortBy = this.request_query.sort.split(",").join(" ");
            this.model = this.model.sort(sortBy);
        }
        else {
            this.model = this.model.sort("-createdAt");
        }
        return this;
    }
    /**
     * The `limitFields` function selects specific fields from a model based on the `fields` query
     * parameter, or selects all fields except `__v` if no `fields` parameter is provided.
     * @returns the updated object.
     */
    limitFields() {
        if (this.request_query.fields) {
            const fields = this.request_query.fields.split(",").join(" ");
            this.model = this.model.select(fields);
        }
        else {
            this.model = this.model.select("-__v");
        }
        return this;
    }
    /**
     * The `paginate` function is used to set the page and limit for pagination in a TypeScript
     * application.
     * @returns The paginate() function returns the modified object itself (this) after applying the skip
     * and limit operations on the model.
     */
    paginate() {
        const page = this.request_query.page * 1 || 1;
        const limit = this.request_query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.model = this.model.skip(skip).limit(limit);
        return this;
    }
}
/* `export default Queries;` is exporting the `Queries` class as the default export of the module. This
allows other modules to import the `Queries` class using the `import` statement. For example, in
another module, you can import the `Queries` class like this: */
export default Queries;
//# sourceMappingURL=query.js.map