import { Router } from "express";

const router = Router();

const carts = [];

router.post("/", (req, res) => {
  const maxIndex = Math.max(carts.map((element) => element.id));
  const cart = {
    id: maxIndex + 1,
    products: req.body.products,
  };
  if (req.body.products) {
    carts.push(cart);
    res.status(200).send({ error: "null", data: cart });
  } else {
    res.status(400).send({ error: "Bad Request", data: [] });
  }
});

router.get("/:cid", (req, res) => {
  const cart = carts.find((element) => element.id == req.params.cid);
  if (cart) {
    res.status(200).send({ error: null, data: cart });
  } else {
    res.status(404).send({ error: "cart not found", data: [] });
  }
});

router.put("/:cid/product/:pid", (req, res) => {});

router.delete("/:cid", (req, res) => {});


export default router;
