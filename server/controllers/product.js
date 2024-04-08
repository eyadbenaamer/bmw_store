import { Types } from "mongoose";
import Category from "../models/category.js";
import Product from "../models/product.js";

/*CREATE*/

export const addProduct = async (req, res) => {
  const uploadsFolder = `${process.env.API_URL}/storage/`;
  try {
    let {
      name,
      description,
      price,
      discount,
      stock,
      category: categoryName,
    } = req.body;
    const { media } = req.files;
    let filesPaths = [];
    if (media) {
      media.map((file, index) => {
        if (file.mimetype.startsWith("image")) {
          filesPaths.push({
            path: `${uploadsFolder}${file.filename}`,
            order: index,
            fileType: "photo",
          });
        } else if (file.mimetype.startsWith("video")) {
          filesPaths.push({
            path: `${uploadsFolder}${file.filename}`,
            order: index,
            fileType: "video",
          });
        }
      });
    }
    const category = await Category.findOne({ name: categoryName });
    const newproduct = new Product({
      name: name.trim(),
      category: category
        ? { _id: new Types.ObjectId(category.id), name: category.name }
        : null,
      description: description?.trim(),
      files: media ? filesPaths : null,
      stock,
      price,
      discount: discount ? discount : 0,
    });
    await newproduct.save();
    if (category) {
      category.products.addToSet(newproduct);
      await category.save();
    }
    return res.status(201).json(newproduct);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "حدث خطأ ما. الرجاء المحاولة في وقت لاحق." });
  }
};
// let productsList = await Product.aggregate([
//   {
//     $match: { discount: { $gt: 0, $lt: 10 } },
//   },
//   {
//     $sample: { size: 10 },
//   },
// ]).then((result) => result.reverse());

/*READ*/
export const getAllProductsByPage = async (req, res) => {
  try {
    const { page } = req.params;
    let productsList = await Product.find().then((result) => result.reverse());
    if (productsList.length === 0) {
      return res.status(200).json([]);
    }
    const statingProduct = (page - 1) * 12;
    const endingProduct = page * 12;
    if (!productsList[statingProduct]) {
      return res.status(404).json({ message: "هذه الصفحة غير موجودة." });
    }
    return res.status(200).json({
      products: productsList.slice(statingProduct, endingProduct),
      pagesCount:
        productsList.length > 12 ? Math.ceil(productsList.length / 12) : 0,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ ما. الرجاء المحاولة في وقت لاحق." });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "لم يتم العثور على المنتج." });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ ما. الرجاء المحاولة في وقت لاحق." });
  }
};

/*UPDATE*/

export const editProduct = async (req, res) => {
  const uploadsFolder = `${process.env.API_URL}/storage/`;
  try {
    const { id } = req.params;
    const { name, description, price, discount, stock, categoryId } = req.body;
    const { media } = req.files;
    let filesPaths = [];
    if (media) {
      media.map((file, index) => {
        if (file.mimetype.startsWith("image")) {
          filesPaths.push({
            path: `${uploadsFolder}${file.filename}`,
            order: index,
            fileType: "photo",
          });
        } else if (file.mimetype.startsWith("video")) {
          filesPaths.push({
            path: `${uploadsFolder}${file.filename}`,
            order: index,
            fileType: "video",
          });
        }
      });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "لم يتم العثور على المنتج." });
    }
    if (categoryId !== product.category?.id) {
      const newCategory = await Category.findById(categoryId);
      if (newCategory) {
        if (product.category) {
          const oldCategory = await Category.findById(product.category.id);
          oldCategory.products.id(product.id).deleteOne();
          await oldCategory.save();
        }
        newCategory.products.addToSet(product.id);
        await newCategory.save();
        product.category = {
          _id: new Types.ObjectId(newCategory.id),
          name: newCategory.name,
        };
      } else {
        return res.status(400).send("bad request");
      }
    }
    name ? (product.name = name.trim()) : null;
    description ? (product.description = description.trim()) : null;
    media ? (product.files = filesPaths) : null;
    stock ? (product.stock = stock) : null;
    price ? (product.price = price) : null;
    discount ? (product.discount = discount) : null;
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ ما. الرجاء المحاولة في وقت لاحق." });
  }
};

/*DELETE*/

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "المنتج غير موجود" });
    }
    if (product.category) {
      const category = await Category.findById(product.category.id);
      category.products.id(product.id).deleteOne();
      await category.save();
    }
    product.deleteOne();
    return res.status(200).json({ message: "تم حذف المنتج." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "حدث خطأ ما. الرجاء المحاولة في وقت لاحق." });
  }
};
