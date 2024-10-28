import { Router } from "express";
import CartController from "../dao/carts.controller.js";

const router = Router();
const controller = new CartController();

router.post("/", async (req, res) => {
  try {
    const cart = await controller.addCart();
    res.status(200).send({ status: "success", message: "Cart created successfully", data: cart });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cart = await controller.getCart(req.params.cid);
    res.status(200).send({ status: "success", data: cart });
  } catch (error) {
    res.status(404).send({ status: "error", message: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { quantity } = req.body;

    const productData = { product: req.params.pid, quantity: quantity || 1 };

    const updatedCart = await controller.addProduct(cid, productData);
    res.status(200).send({ status: "success", data: updatedCart });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await controller.deleteProduct(cid, pid);
    res.status(200).send({ status: "success", message: "Product removed from cart", data: updatedCart });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const updatedCart = await controller.updateCartWithProducts(cid, products);
    res.status(200).send({ status: "success", data: updatedCart });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await controller.updateProduct(cid, pid, quantity);
    res.status(200).send({ status: "success", data: updatedCart });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const deletedCart = await controller.deleteCart(cid);
    res.status(200).send({ status: "success", message: "Cart deleted successfully", data: deletedCart });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

export default router;
