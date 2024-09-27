import { Router } from "express";
import fs from "fs";

const CARTS_FILE = "./src/files/carts.json";
let carts;

if (fs.existsSync(CARTS_FILE)) {
  const cartsFile = fs.readFileSync(CARTS_FILE);
  carts = JSON.parse(cartsFile);
} else {
  try {
    fs.writeFileSync(CARTS_FILE, "[]");
    carts = [];
  } catch (error) {
    console.log(error);
  }
}

const router = Router();

router.post("/", (req, res) => {
  const maxIndex = carts.length > 0 ? Math.max(...carts.map((element) => element.id)) : 0;
  const cart = {
    id: maxIndex + 1,
    products: [],
  };
  carts.push(cart);

  try {
    fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2));
    res.status(200).send({ error: "null", data: cart });
  } catch (error) {
    res.status(500).send({ error: "Failed to save cart", data: [] });
  }
});

router.get("/:cid", (req, res) => {
  const cart = carts.find((element) => element.id == cid);
  if (cart) {
    res.status(200).send({ error: null, data: cart });
  } else {
    res.status(404).send({ error: "cart not found", data: [] });
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const cartIndex = carts.findIndex((element) => element.id == cid);
  if (cartIndex === -1) {
    return res.status(404).send({ error: "cart not found", data: [] });
  }

  const cart = carts[cartIndex];
  const indexProduct = cart.products.findIndex((element) => element.pid == pid);

  const qtyToAdd = quantity || 1;

  if (indexProduct > -1) {
    prodcart.products[indexProduct].quantity += qtyToAdd;
  } else {
    cart.products.push({
      pid,
      quantity: qtyToAdd,
    });
  }
  try {
    fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2));
    res.status(200).send({ error: "null", data: cart });
  } catch (error) {
    res.status(500).send({ error: "Failed to save cart", data: [] });
  }
});

export default router;
