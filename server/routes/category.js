import { Router } from "express";
import {
  addCategory,
  editCategory,
  deleteCategory,
  getProductsByCategory,
  getCategories,
} from "../controllers/category.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.get("/", getCategories);
router.post("/add", verifyToken, addCategory);
router.patch("/edit/:id", verifyToken, editCategory);
router.delete("/delete/:id", verifyToken, deleteCategory);
router.post("/products", getProductsByCategory);

export default router;
