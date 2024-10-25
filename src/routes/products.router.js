import { Router } from "express";
import ProductController from "../dao/products.controller.js";

const router = Router();
const controller = new ProductController();

router.get("/", async (req, res) => {
  const { limit, page, query, sort } = req.query;
  const products = await controller.getProducts(limit, page, query, sort);
  res.status(200).send({ error: null, data: products });
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const products = await controller.getProduct(pid);
  if (products) {
    res.status(200).send({ error: null, data: products });
  } else {
    res.status(404).send({ error: "product not found", data: [] });
  }
});

router.post("/", async (req, res) => {
  const products = await controller.addProduct(req.body);
  if (products) {
    res.status(200).send({ error: "null", data: products });
  } else {
    res.status(400).send({ error: "Bad Request", data: [] });
  }
});

router.put("/:pid", async (req, res) => {
  const products = await controller.updateProduct(req.params.pid, req.body);
  if (products) {
    res.status(200).send({ error: "null", data: products });
  } else {
    res.status(404).send({ error: "product not found", data: [] });
  }
});

router.delete("/:pid", async (req, res) => {
  const products = await controller.deleteProduct(req.params.pid);
  if (products) {
    res.status(200).send({ error: "null", data: products });
  } else {
    res.status(404).send({ error: "product not found", data: [] });
  }
});

export default router;
