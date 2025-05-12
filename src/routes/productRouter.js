import { Router } from "express";

import {
  listProducts,
  showProduct,
  createProduct,
  editProduct,
  deleteProduct,
} from "../controllers/productController.js";


const router = Router();
router.get("/", listProducts);
router.get("/:_id", showProduct);
router.post("/", createProduct);
router.put("/:_id", editProduct);
router.delete("/:_id", deleteProduct);

export default router;
