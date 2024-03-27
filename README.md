### ExpressBolt

ExpressBolt is a project aimed at simplifying CRUD operations in Express.js applications. It provides a structured way to handle HTTP requests and responses for creating, reading, updating, and deleting resources in a MongoDB database using Mongoose.

### Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [License](#license)

---

## Introduction

ExpressBolt is a middleware layer built on top of Express.js, a popular web framework for Node.js. It offers a set of utility classes and functions to streamline the development of RESTful APIs with Express and Mongoose.

Key features include:

- **CRUD Operations:** Provides easy-to-use methods for creating, reading, updating, and deleting resources.
- **Error Handling:** Implements error handling mechanisms to handle exceptions gracefully.
- **Middleware Integration:** Seamlessly integrates with Express middleware for request processing.
- **Dynamic Schema Generation:** Generates Mongoose schemas dynamically based on provided field definitions.
- **Query Filtering and Pagination:** Supports filtering, sorting, limiting, and pagination of query results.

---

## Installation

To use ExpressBolt in your project, follow these steps:

1. Install ExpressBolt via npm:

   ```bash
   npm install expressbolt
   ```

2. Import ExpressBolt into your Express application:

   ```javascript
   const express = require('express');
   const expressBolt = require('expressbolt');
   ```

3. Set up routes and controllers using ExpressBolt classes and functions.

---

## Usage

### Example Controller

```javascript
const express = require('express');
const { CrudController } = require('expressbolt');

const router = express.Router();
const crudController = new CrudController();

router.post('/create', async (req, res, next) => {
  try {
    // Example create operation
    await crudController.create({
      modelData: UserModel,
      data: req.body,
      check: { email: req.body.email }
    });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

### Example Model

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
```

### Example Error Handling

```javascript
const { errorCenter } = require('expressbolt');

app.use((err, req, res, next) => {
  errorCenter({ error: err, response: res });
});
```

---

## Contributing

Contributions to ExpressBolt are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a new Pull Request.

---

## License

ExpressBolt is licensed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## Summary

The `CrudController` class is a TypeScript class that provides CRUD operations (create, read, update, delete) for a given model. It takes in a request, response, and next function as parameters in its constructor. The class has methods for creating a new document, creating multiple documents, updating a model, fetching multiple documents, deleting data, and retrieving one document from a database.

## Example Usage

```javascript
// Create a new instance of the CrudController class
const crudController = new CrudController({
  request: req,
  response: res,
  next: next,
  useNext: true,
  env: "development",
});

// Create a new document
await crudController.create({
  modelData: model,
  data: newData,
  check: { field: value },
});

// Create multiple documents
await crudController.createMany({
  modelData: model,
  data: [data1, data2],
  check: [{ field: value1 }, { field: value2 }],
});

// Update a model
await crudController.update({
  modelData: model,
  data: { field: newValue },
  filter: { field: value },
});

// Fetch multiple documents
await crudController.getMany({
  modelData: model,
  query: req.query,
  populate: { model: "relatedModel", fields: "field1 field2" },
  filter: { field: value },
});

// Delete data
await crudController.delete({
  modelData: model,
  data: { field: value },
});

// Retrieve one document
await crudController.getOne({
  modelData: model,
  data: { field: value },
  populate: { model: "relatedModel", fields: "field1 field2" },
});
```

## Code Analysis

### Main functionalities

- Provides CRUD operations (create, read, update, delete) for a given model
- Handles HTTP requests and responses
- Supports error handling and next middleware function invocation

___

### Methods

- `create<T, U>({ modelData, data, check })`: Creates a new document in the database using a given model, data, and check query.
- `createMany<T, U>({ modelData, data, check })`: Creates multiple documents in the database using a given model, data, and check.
- `update<T, U>({ modelData, data, filter })`: Updates a model using the provided data and filter.
- `getMany<T>({ modelData, query, populate, filter })`: Fetches multiple documents from the database based on the provided query parameters.
- `delete<T>({ modelData, data })`: Deletes data from a model using a filter query.
- `getOne<T>({ modelData, data, populate })`: Retrieves one document from a database using a given model, data filter, and optional population fields.

___

### Fields

- `request`: The request object represents the HTTP request made by the client.
- `response`: The response object represents the HTTP response that will be sent back to the client.
- `next`: The next function is used to pass control to the next middleware function in the request-response cycle.
- `useNext`: A boolean flag indicating whether to use the next middleware function.
- `env`: The environment (development or production) in which the class is being used.

___

## Summary

The `CrudService` class provides methods for performing CRUD (Create, Read, Update, Delete) operations on a MongoDB database. It includes functions for creating new documents, updating existing documents, fetching data from the database, and deleting documents. The class also includes a method for populating referenced fields in the fetched data.

## Example Usage

```javascript
// Creating a new document
const createData = {
  name: "John Doe",
  age: 25,
  email: "johndoe@example.com"
};
const createResult = await CrudService.create({
  modelData: userModel, // CrudModelI object representing the user model
  data: createData,
  check: { email: createData.email } // Check if email already exists in the database
});
console.log(createResult);

// Updating a document
const updateData = { age: 26 };
const updateFilter = { name: "John Doe" };
const updateResult = await CrudService.update({
  modelData: userModel, // CrudModelI object representing the user model
  data: updateData,
  filter: updateFilter
});
console.log(updateResult);

// Fetching multiple documents
const fetchQuery = { age: { $gte: 25 } };
const fetchResult = await CrudService.getMany({
  modelData: userModel, // CrudModelI object representing the user model
  query: req.query, // Query parameters from HTTP request
  populate: "address" // Populate the 'address' field with referenced documents
});
console.log(fetchResult);

// Deleting a document
const deleteFilter = { name: "John Doe" };
const deleteResult = await CrudService.delete({
  modelData: userModel, // CrudModelI object representing the user model
  data: deleteFilter
});
console.log(deleteResult);
```

## Code Analysis

### Main functionalities

- Create new documents in the database
- Update existing documents in the database
- Fetch data from the database with filtering, pagination, and sorting options
- Delete documents from the database
- Populate referenced fields in the fetched data

___

### Methods

- `create`: Creates a new document in the database and checks if it already exists based on a provided filter query.
- `createMany`: Creates multiple documents in the database and performs checks to ensure that the data does not already exist.
- `update`: Updates a document in the database based on a filter query.
- `getMany`: Fetches multiple documents from the database based on specified criteria and optional population fields.
- `populateModel`: Populates fields in a model or query object with referenced documents.
- `delete`: Deletes documents from the database based on a filter query.
- `getOne`: Retrieves data from the database based on a filter query and optional population fields.

___

### Fields

- `modelData`: Represents the model(s) to be used for CRUD operations.
- `data`: Contains the data to be created or updated in the database.
- `check`: Specifies the filter query used to check if data already exists in the database.
- `filter`: Specifies the filter query used to fetch or update documents in the database.
- `populate`: Specifies the fields to be populated with referenced documents in the fetched data.

___

## Summary

The `Queries` class is a TypeScript class that provides methods for filtering, sorting, selecting specific fields, and paginating data in a model object.

## Example Usage

```javascript
// Create an instance of the Queries class
const queries = new Queries(model, request_query);

// Apply filtering to the model
queries.filter();

// Apply sorting to the model
queries.sort();

// Select specific fields from the model
queries.limitFields();

// Paginate the model
queries.paginate();
```

## Code Analysis

### Main functionalities

The main functionalities of the `Queries` class are:

- Filtering the model based on query parameters
- Sorting the model based on the provided sort query parameter
- Selecting specific fields from the model
- Paginating the model

___

### Methods

The `Queries` class has the following methods:

- `filter()`: Removes excluded fields from the query object and converts it into a string that can be used to filter the model.
- `sort()`: Sorts the model based on the provided sort query parameter or defaults to sorting by the created_at field in descending order.
- `limitFields()`: Selects specific fields from the model based on the `fields` query parameter, or selects all fields except `__v` if no `fields` parameter is provided.
- `paginate()`: Sets the page and limit for pagination in a TypeScript application.

___

### Fields

The `Queries` class has the following fields:

- `model`: Represents the data structure or schema of the entity that you are working with.
- `request_query`: Contains the query parameters from an HTTP request.

___

## Summary

This code defines a function called `responseMessage` that takes in a custom message object and a configuration option. It returns a response object based on the success status of the message.

## Example Usage

```javascript
import responseMessage from "./responseMessage";

const message = {
  message: "Success",
  success_status: true,
  data: { name: "John", age: 25 },
  doc_length: 10
};

const response = responseMessage(message);

console.log(response);
// Output: { message: "Success", data: { name: "John", age: 25 }, success: true, doc_length: 10 }
```

## Code Analysis

### Inputs

- `msg` (CustomMessageI): An object of type `CustomMessageI<V>` that contains the message, success status, data, and optional properties like stack, error, and doc_length.
- `config` (string, optional): A string that specifies the environment in which the function is being executed. It can have two possible values: "development" or "production". By default, it is set to "development".

___

### Flow

1. The function `responseMessage` takes in a custom message object `msg` and a configuration option `config`.
2. It checks the value of `msg.success_status` using a switch statement.
3. If `msg.success_status` is true, it returns an object with properties `message`, `data`, `success`, and `doc_length` from the `msg` object.
4. If `msg.success_status` is false, it returns an object with properties `message`, `error`, `success`, and `stack` (depending on the value of `config`) from the `msg` object.

___

### Outputs

- An object with different properties based on the value of `msg.success_status`. If `msg.success_status` is true, it includes `message`, `data`, `success`, and `doc_length` properties. If `msg.success_status` is false, it includes `message`, `error`, `success`, and `stack` (depending on the value of `config`) properties.

___
