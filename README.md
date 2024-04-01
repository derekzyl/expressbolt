### ExpressBolt

ExpressBolt is a project aimed at simplifying CRUD operations in Express.js applications. It provides a structured way to handle HTTP requests and responses for creating, reading, updating, and deleting resources in a MongoDB database using Mongoose.

### Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [License](#license)

---

## like and star

kindly  star this project on github [expressbolt](https://github.com/derekzyl/expressbolt) if you find it helpful

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

commons

   ```typescript
   const express = require('express');
   const expressBolt = require('expressbolt');

   ```

   es2016

   ```typescript
import express from 'express'
   import expressbolt from 'expressbolt'
   ```

3. Set up routes and controllers using ExpressBolt classes and functions.

---

## CrudModel

- the crud model creates an easier way to create models using mongoose with strict adherance to all fields that are compulsory using typings as guard

### Usage

### user interface

```typescript

interface UserI {
  name: string;
  email: string;
  password: string;
}

interface UserDocI extends mongoose.Document, UserI {}
interface ModelI {
  isEmailTaken(
    email: string,
    excludeUserId?: mongoose.Types.ObjectId
  ): Promise<boolean>;

  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<any>;
}

```

### user model

- the user model is just an abstract it is no compulsory you use it with the Crud functions
- you can create your own schema and use it as well

#### example usage

```typescript
import {
  CrudController,
  CrudService,
  generateDynamicSchema,
} from "expressbolt";
import mongoose from "mongoose";


const userModel = generateDynamicSchema<UserI, ModelI>({
  modelName: "USER",
  fields: {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  schemaOptions: {
    timeStamp: true,
  },
  plugins: [
    /* paginate */
  ],
});

```

- the model returns `const {model, schema}= userModel` the model is the `model` and the `schema` can be extended to suit your schema build ups

### Example Error Handling

- still in consideration to expose the error handler so you can easily catch all your errors

```typescript
impor {errorCenter} from 'expressbolt';

app.use((err, req, res, next) => {
  errorCenter({ error: err, response: res });
});
```

## CrudController

The `CrudController` class is a TypeScript class that provides CRUD operations (create, read, update, delete) for a given model. It takes in a request, response, and next function as parameters in its constructor. The class has methods for creating a new document, creating multiple documents, updating a model, fetching multiple documents, deleting data, and retrieving one document from a database.

- notable mentions:
  - the controller has `next,
    request: req,
    response: res,
    env: "production",
    useNext: false,` as its argument ill explain the one thats not popular here  the `env` option takes `development` and `production` as its argument it will return stack trace error response if its in development,  the `useNext` is for us that are lazy to catch our own errors it will return the error message, the response pattern is listed below

### Response Message

- the message returned is either any of the below

```typescript
function responseMessage<V>(
  msg: CustomMessageI<V>,
  config: "development" | "production" = "development"
) {
  switch (msg.success_status) {
    case true:
      return {
        message: msg.message,
        data: msg.data,
        success: msg.success_status,
        doc_length: msg.doc_length,
      };

    case false:
      return {
        message: msg.message,
        error: msg.error,
        success: msg.success_status,
        stack: config === "development" ? msg.stack : {},
      };
  }
}
```

## Example Usage

```typescript

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const crud = new CrudController({
    next,
    request: req,
    response: res,
    env: "production",
    useNext: false,
  });

  crud.getMany<UserI>({
    modelData: { Model: userModel.model, exempt: ["-password"] },
    filter: { name: req.body.name },
    populate: {},
    query: req.query,
  });
}

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
- `T` : data type


___

### Fields

- `request`: The request object represents the HTTP request made by the client.
- `response`: The response object represents the HTTP response that will be sent back to the client.
- `next`: The next function is used to pass control to the next middleware function in the request-response cycle.
- `useNext`: A boolean flag indicating whether to use the next middleware function.
- `env`: The environment (development or production) in which the class is being used.
- `modelData` : it contains the `model` and the `exempt` the exempt are fields you want or dont want to be returned adding `-` to the field will remove it when it returns `e.g exempt:'-password'` will remove the password field
- `check`: it checks for fileds you want to be sure its not there before you create
- `filter`: will filter the fields you want before you update or get,
- `data`: its the payload in `create` the search query in `getOne` and `delete`
- `populate`: the populate field takes this options `interface PopulateFieldI {
  model?: string;
  fields?: string;
  second_layer_populate?: PopulateOptions | string;
}` it takes the `model` you want to populate, it must be a key in your object and also it must be a referenced field it takes the fields tou want to retun in that referenced field `fields`, it takes also subdocument inside the referenced field example structure will now be:

```typescript

const prod = {
  name:"foo",
  subCategoryModel:{
    name:'foo'
    categoryModel:{
      name:"foo"
    }
  }
}
```

___

## CrudService

The `CrudService` class provides methods for performing CRUD (Create, Read, Update, Delete) operations on a MongoDB database. It includes functions for creating new documents, updating existing documents, fetching data from the database, and deleting documents. The class also includes a method for populating referenced fields in the fetched data.
the  crudservice is basically a function that you can reuse here you handle the response and data it returns the value and throws errors if not vali that you have to handle yourself

## Example Usage

```typescript
// Creating a new document

export async function createUser(user: UserI) {
  const userCreate = await CrudService.create<UserI>({
    check: { email: user.email },
    data: user,
    modelData: { Model: userModel.model, exempt: ["-password"] },
  });
  return userCreate;
}

export async function getUsers(id: mongoose.Types.ObjectId) {
  const user = await CrudService.getOne<UserI>({
    modelData: { Model: userModel.model, exempt: ["-password" ]},
    data: { _id: id },
    populate: {},
  });
  return user;
}
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
- `T` : data type


___

### Fields

- `modelData`: Represents the model(s) to be used for CRUD operations.
- `data`: Contains the data to be created or updated in the database.
- `check`: Specifies the filter query used to check if data already exists in the database.
- `filter`: Specifies the filter query used to fetch or update documents in the database.
- `populate`: the populate field takes this options `interface PopulateFieldI {
  model?: string;
  fields?: string;
  second_layer_populate?: PopulateOptions | string;
}` it takes the `model` you want to populate, it must be a key in your object and also it must be a referenced field it takes the fields tou want to retun in that referenced field `fields`, it takes also subdocument inside the referenced field example structure will now be:

```typescript

const prod = {
  name:"foo",
  subCategoryModel:{
    name:'foo'
    categoryModel:{
      name:"foo"
    }
  }
}
```

- `modelData` : it contains the `model` and the `exempt` the exempt are fields you want or dont want to be returned adding `-` to the field will remove it when it returns `e.g exempt:'-password'` will remove the password field
- `check`: it checks for fileds you want to be sure its not there before you create
- `filter`: will filter the fields you want before you update or get,
- `data`: its the payload in `create` the search query in `getOne` and `delete`

___

## Query

The `Queries` class is a TypeScript class that provides methods for filtering, sorting, selecting specific fields, and paginating data in a model object. its not exposed but this is how it looks like

## Example Usage

```typescript
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

```typescript


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
---

### More Examples

```typescript

interface BlogI {
  author: mongoose.Types.ObjectId;
  blog: string;
  likes: number;
  title: string;
}

interface BlogDocI extends mongoose.Document, BlogI {}
interface BlogModelI {
  isTitleTaken(
    title: string,
    excludeBlogId?: mongoose.Types.ObjectId
  ): Promise<boolean>;
}
const blogModel = generateDynamicSchema<BlogI, BlogModelI>({
  modelName: "BLOG",
  fields: {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "USER",
    },
    blog: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
    },
  },
  schemaOptions: {
    timeStamp: true,
  },
  plugins: [
    /* paginate */
  ],
});

function getManyBlog(req: Request, res: Response, next: NextFunction) {
  const crud = new CrudController({
    next,
    request: req,
    response: res,
    env: "production",
    useNext: false,
  });

  crud.getMany<BlogI>({
    modelData: { Model: blogModel.model, [exempt: "-_v" ]},
    filter: { author: req.user.id },
    populate: { model: "author", fields: ["name"] },
    query: req.query,
  });
}

async function deleteBlog(req: Request, res: Response, next: NextFunction) {
  const crud = new CrudController({
    next,
    request: req,
    response: res,
    env: "production",
    useNext: false,
  });

  await crud.delete<BlogI>({
    modelData: { Model: blogModel.model, [exempt: "-_v"] },
    data: { _id: req.body.id },
  });
}

const app: Express = express();

app.get("/blog", getManyBlog);



```

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
