import { Router } from "express";
import ProductController from "../dao/products.controller.js";
import CartController from "../dao/carts.controller.js";

const router = Router();
const controllerprod = new ProductController();
const controllercart = new CartController();

router.get("/products", async (req, res) => {
  const { limit, page, query, sort } = req.query;

  const products = await controllerprod.getProducts(limit, page, query, sort);
  const { docs, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = products;
  res.status(200).render("home", { title: "PRODUCTOS", products: docs, totalPages, page, hasNextPage, hasPrevPage, prevPage, nextPage });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await controllerprod.get();
  res.status(200).render("realtimeproducts", { title: "PRODUCTOS", products: products });
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await controllercart.getCart(cid);
  res.status(200).render("carts", { title: "CARRITO", cart: cart });
});

export default router;
