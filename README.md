# Project Documentation

## Project Overview

This project provides a TypeScript-based framework for implementing CRUD (Create, Read, Update, Delete) operations on MongoDB databases using Express.js and Mongoose. It consists of three main components: `CrudController`, `CrudService`, and `CrudModel`. The project aims to simplify the implementation of common CRUD operations by providing a reusable and modular structure.

## Components

### 1. **CrudController**

The `CrudController` class is designed to handle incoming HTTP requests and invoke corresponding CRUD operations from the `CrudService`. It uses the `express` library for routing and interacts with the `CrudService` to perform CRUD operations on MongoDB.

#### Controller  Usage

```typescript
import { CrudController } from 'your-crud-package';

const crudController = new CrudController(request, response, next);

// Example: Create operation
await crudController.create(MyModel, data, finder);

// Example: Update operation
await crudController.update(MyModel, data, filter);

// Example: Fetch multiple documents
await crudController.getMany(MyModel, query, populate, category);

// Example: Delete operation
await crudController.delete(MyModel, data);

// Example: Fetch a single document
await crudController.getOne(MyModel, data, populate);
```

### 2. **CrudService**

The `CrudService` class contains static methods for performing CRUD operations on MongoDB. It acts as an intermediary between the controller and the database. The class ensures data integrity, handles errors, and provides a clean interface for CRUD operations.

#### Service Usage

```typescript
import { CrudService } from 'your-crud-package';

// Example: Create operation
await CrudService.create(MyModel, data, finder);

// Example: Create multiple documents
await CrudService.createMany(MyModel, data, finder);

// Example: Update operation
await CrudService.update(MyModel, data, filter);

// Example: Fetch multiple documents
await CrudService.getMany(MyModels, query, populate, category);

// Example: Delete operation
await CrudService.delete(MyModel, data);

// Example: Fetch a single document
await CrudService.getOne(MyModel, data, populate);
```

### 3. **CrudModel**

The `CrudModel` module provides a utility function for generating dynamic Mongoose schemas based on a specified set of fields. This allows you to define your data models flexibly and dynamically.

#### Model Usage

```typescript
import { generateDynamicSchema } from 'your-crud-package';

// Example: Generate a dynamic schema
const dynamicSchema = generateDynamicSchema({
  modelName: 'YourModel',
  fields: {
    name: String,
    age: Number,
    // ... other fields
  },
});

// Example: Use the generated model
const YourModel = dynamicSchema.model;
const instance = new YourModel({ name: 'John', age: 25 });
await instance.save();
```

## Installation

To install the package, run:

```bash
npm install crud-exmon
```

## Configuration

Make sure to configure your MongoDB connection in your application. You can set the connection URL in your environment variables or directly in your application.

```typescript
import mongoose from 'mongoose';

mongoose.connect('your-mongodb-connection-url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

## Example

For a detailed example of how to use this CRUD framework, refer to the provided example files in the project.

- `example-controller.ts`
- `example-model.ts`
- `example-service.ts`

## Contributing

If you encounter any issues or have suggestions for improvements, feel free to open an issue on the GitHub repository. Contributions are welcome!

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code in your projects.
