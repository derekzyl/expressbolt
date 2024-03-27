import mongoose from "mongoose";
const modelSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

export const MyModel = mongoose.model("MyModel", modelSchema);
