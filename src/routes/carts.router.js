import { Router } from "express";
import fs from "fs";

const CARTS_FILE = "./carts.json";
let carts;

if (fs.existsSync(CARTS_FILE)) {
  const cartsFile = fs.readFileSync(CARTS_FILE);
  carts = JSON.parse(cartsFile);
} else {
  fs.writeFileSync(CARTS_FILE, "[]");
  carts = [];
}

const router = Router();

router.post("/", (req, res) => {
  const maxIndex = Math.max(carts.map((element) => element.id));
  const cart = {
    id: maxIndex + 1,
    products: [],
  };
    carts.push(cart);
    fs.writeFileSync(CARTS_FILE, JSON.stringify(carts));
    res.status(200).send({ error: "null", data: cart });

});

router.get("/:cid", (req, res) => {
  const cart = carts.find((element) => element.id == req.params.cid);
  if (cart) {
    res.status(200).send({ error: null, data: cart });
  } else {
    res.status(404).send({ error: "cart not found", data: [] });
  }
});

router.post("/:cid/product/:pid", (req, res) => {});



export default router;
