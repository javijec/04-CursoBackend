import { Router } from "express";
import CartController from "../dao/carts.controller.js";

const router = Router();
const controller = new CartController();

router.post("/", async (req, res) => {
  const cart = await controller.addCart({ products: [] });
  try {
    res.status(200).send({ error: "null", data: cart });
  } catch (error) {
    res.status(500).send({ error: "Failed to save cart", data: [] });
  }
});

router.get("/:cid", async (req, res) => {
  const cart = await controller.getCart(req.params.cid);
  if (cart) {
    res.status(200).send({ error: null, data: cart });
  } else {
    res.status(404).send({ error: "cart not found", data: [] });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cart = await controller.addProduct(req.params.cid, req.params.pid);
  try {
    res.status(200).send({ error: "null", data: cart });
  } catch (error) {
    res.status(500).send({ error: "Failed to save cart", data: [] });
  }
});

export default router;
