import { Router } from "express";
import { verifyId } from "../middleware/check.js";
import {
  deleteProduct,
  getProduct,
  getAllProductsByPage,
} from "../controllers/product.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.get("/product/:id", verifyId, getProduct);
router.get("/page/:page", getAllProductsByPage);
router.delete("/delete/:id", verifyId, verifyToken, deleteProduct);

export default router;
