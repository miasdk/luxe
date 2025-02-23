import express from "express";
import CategoryController from "../controllers/CategoryController.js";

const router = express.Router();

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);

export default router;
