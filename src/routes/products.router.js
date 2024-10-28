import { Router } from "express";
import ProductController from "../dao/products.controller.js";

const router = Router();
const controller = new ProductController();

router.get("/", async (req, res) => {
  try {
    const { limit, page, query, sort } = req.query;
    const products = await controller.getProducts(limit, page, query, sort);
    res.status(200).send({ status: "success", data: products });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await controller.getProduct(pid);
    if (product) {
      res.status(200).send({ status: "success", data: product });
    } else {
      res.status(404).send({ status: "error", message: "Product not found" });
    }
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await controller.addProduct(req.body);
    res.status(200).send({ status: "success", message: "Product added successfully", data: product });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await controller.updateProduct(pid, req.body);
    if (product) {
      res.status(200).send({ status: "success", data: product });
    } else {
      res.status(404).send({ status: "error", message: "Product not found" });
    }
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await controller.deleteProduct(pid);
    if (product) {
      res.status(200).send({ status: "success", message: "Product deleted successfully", data: product });
    } else {
      res.status(404).send({ status: "error", message: "Product not found" });
    }
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

export default router;
