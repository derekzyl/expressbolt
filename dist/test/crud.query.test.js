import Queries from "../files/query";
describe("Queries", () => {
    // The constructor function should correctly assign the model and request_query parameters to the corresponding properties of the class.
    it("should correctly assign the model and request_query parameters", () => {
        const model = {};
        const request_query = {};
        const queries = new Queries(model, request_query);
        expect(queries.model).toBe(model);
        expect(queries.request_query).toBe(request_query);
    });
    // The constructor function should throw an error if the model or request_query parameters are not provided.
    it("should throw an error if the model or request_query parameters are not provided", () => {
        expect(() => new Queries(null, null)).toThrow();
        expect(() => new Queries({}, {})).toThrow();
        expect(() => new Queries(null, {})).toThrow();
    });
});
//# sourceMappingURL=crud.query.test.js.map