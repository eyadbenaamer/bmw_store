import Category from "../models/category.js";
import Product from "../models/product.js";
// create
export const addCategory = async (req, res) => {
  try {
    let { name } = req.body;
    if (!name) {
      return res.status(400).send("bad request");
    }
    name = name.trim();
    if (name.length < 3) {
      return res.status(400).json({ message: "الإسم قصير جدًا." });
    }
    const category = await Category.findOne({ name });
    if (category) {
      return res.status(409).json({ message: "هناك قسم بهذا الإسم." });
    }
    const newCategory = new Category({ name });
    await newCategory.save();
    return res.status(201).json(newCategory);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ ما. الرجاء المحاولة في وقت لاحق." });
  }
};
// read
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ ما. الرجاء المحاولة في وقت لاحق." });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { name, page } = req.body;
    const category = await Category.findOne({ name });
    if (!category) {
      return res.status(404).json({ message: "لا يوجد قسم بهذا الأسم." });
    }
    const statingProduct = (page - 1) * 12;
    const endingProduct = page * 12;
    const productsListIds = category.products
      .reverse()
      .slice(statingProduct, endingProduct);
    if (!productsListIds[0]) {
      return res.status(404).json({ message: "هذه الصفحة غير موجودة." });
    }
    let productsList = [];
    for (let i = 0; i < productsListIds.length; i++) {
      let product = await Product.findById(productsListIds[i]._id);
      productsList.push(product);
    }
    return res.status(200).json(productsList);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "حدث خطأ ما. الرجاء المحاولة في وقت لاحق." });
  }
};

// update
export const editCategory = async (req, res) => {
  try {
    let { name } = req.body;
    const { id } = req.params;
    if (!name) {
      return res.status(400).send("bad request");
    }
    name = name.trim();
    if (name.length < 3) {
      return res.status(400).json({ message: "الإسم قصير جدًا." });
    }
    if (await Category.findOne({ name })) {
      return res.status(409).json({ message: "هناك قسم بهذا الإسم." });
    }
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "لم يتم العثور على القسم." });
    }
    for (let i = 0; i < category.products.length; i++) {
      const product = await Product.findById(category.products[i]._id);
      product.category.name = name;
      await product.save();
    }
    category.name = name;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ ما. الرجاء المحاولة في وقت لاحق." });
  }
};
// delete
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "لم يتم العثور على القسم." });
    }
    for (let i = 0; i < category.products.length; i++) {
      const product = await Product.findById(category.products[i]._id);
      product.category = null;
      await product.save();
    }
    await category.deleteOne();
    res.status(200).json({ message: "تم الحذف." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "حدث خطأ ما. الرجاء المحاولة في وقت لاحق." });
  }
};
