import { Router } from "express";

const router = Router();

const products = [];

router.get("/", (req, res) => {
  res.status(200).send({ error: null, data: products });
});

router.get("/:cid", (req, res) => {
  const product = products.find((element) => {
    element.id == req.params.pid;
  });
  if (product) {
    res.status(200).send({ error: null, data: product });
  } else {
    res.status(404).send({ error: "product not found", data: [] });
  }
});

router.post("/", (req, res) => {
  const maxIndex = Math.max(products.map((element) => element.id));
  const product = {
    id: maxIndex + 1,
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails,
  };
  if (
    req.body.title &&
    req.body.description &&
    req.body.code &&
    req.body.price &&
    req.body.status &&
    req.body.stock &&
    req.body.category &&
    req.body.thumbnails
  ) {
    products.push(product);
    res.status(200).send({ error: "null", data: product });
  } else {
    res.status(400).send({ error: "Bad Request", data: [product] });
  }
});

router.put("/:cid", (req, res) => {});

router.delete("/:cid", (req, res) => {});

export default router;
