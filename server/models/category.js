import { Schema, model, Types } from "mongoose";
const { ObjectId } = Types;
export const categorySchema = new Schema({
  name: { type: String, required: true },
  products: [{ id: ObjectId }],
});

const Category = model("Categories", categorySchema);
export default Category;
