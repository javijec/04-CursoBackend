import { Router } from "express";
import ProductController from "../dao/products.controller.js";

const router = Router();
const controller = new ProductController();

router.get("/", async (req, res) => {
  const products = await controller.get();
  res.status(200).render("home", { title: "PRODUCTOS", products: products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await controller.get();
  res.status(200).render("realtimeproducts", { title: "PRODUCTOS", products: products });
});

export default router;
