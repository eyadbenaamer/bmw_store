import { Schema, model } from "mongoose";

export const productSchema = new Schema({
  name: { type: String, required: true },
  category: new Schema({
    name: String,
  }),
  description: { type: String, default: "" },
  files: [
    {
      path: String,
      fileType: String,
    },
  ],
  stock: { type: Number, default: 0, required: true },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },
});

const Product = model("products", productSchema);
export default Product;
