import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import productRoute from "./routes/product.js";
import categoryRoute from "./routes/category.js";
import { renameFile } from "./utils/renameFile.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
} from "./controllers/product.js";
import { login } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import cookieParser from "cookie-parser";
import { verifyId } from "./middleware/check.js";

/*CONFIGURATIONS*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("short"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/storage", express.static(path.join(__dirname, "public/storage")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(cookieParser(process.env.JWT_SECRET));
/*FILE STORAGE*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/storage");
  },
  filename: function (req, file, cb) {
    cb(null, renameFile(file.originalname));
  },
});
const upload = multer({ storage });
/*ROUTES WITH FILES*/

app.post(
  "/products/add",
  verifyToken,
  upload.fields([{ name: "media", maxCount: 50 }]),
  addProduct
);
app.post(
  "/products/edit/:id",
  verifyId,
  verifyToken,
  upload.fields([{ name: "media", maxCount: 50 }]),
  editProduct
);

/*ROUTES*/
app.use("/products/", productRoute);
app.use("/category/", categoryRoute);
app.post("/login", cookieParser(process.env.COOKIE_SECRET), login);
/*MONGOOSE SETUP*/
const PORT = process.env.PORT;
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

try {
  app.listen(PORT, () => console.log(`Server Connected on Port: ${PORT}`));
} catch (error) {
  console.error(error);
}
