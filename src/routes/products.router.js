import { Router } from "express";
import fs from "fs";


const PRODUCTS_FILE = "./products.json";
let products;

if (fs.existsSync(PRODUCTS_FILE)) {
  const productsFile = fs.readFileSync(PRODUCTS_FILE);
  products = JSON.parse(productsFile);
} else {
  fs.writeFileSync(PRODUCTS_FILE, "[]");
  products = [];
}

const router = Router();

router.get("/", (req, res) => {
  if (req.query.limit) {
    const productLimit = products.filter((element) => element.id <= req.query.limit);
    res.status(200).send({ error: null, data: productLimit });
  } else {
    res.status(200).send({ error: null, data: products });
  }
});

router.get("/:pid", (req, res) => {
  const product = products.find((element) => element.id == req.params.pid);
  if (product) {
    res.status(200).send({ error: null, data: product });
  } else {
    res.status(404).send({ error: "product not found", data: [] });
  }
});

router.post("/", (req, res) => {
  const maxIndex = products.length > 0 ? Math.max(...products.map((element) => element.id)): 0;
  let img;
  if (!req.body.thumbnails) {
     img = [];
  } else {
     img = req.body.thumbnails;
  }
  const product = {
    id: maxIndex + 1,
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: img,
  };
  if (req.body.title && req.body.description && req.body.code && req.body.price && req.body.stock && req.body.category) {
    products.push(product);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products));
    console.log("File saved");
    res.status(200).send({ error: "null", data: product });
  } else {
    res.status(400).send({ error: "Bad Request", data: [product] });
  }
});

/*- PUT /:pid: actualiza el producto con id pid, según los campos enviados en el body. NUNCA se cambia el id
original. */

router.put("/:pid", (req, res) => {});

router.delete("/:pid", (req, res) => {
  if (products.find((element) => element.id == req.params.pid)) {
    const index = products.findIndex((element) => element.id == req.params.pid);
    console.log(index);
    products.splice(index, 1);
    res.status(200).send({ error: "null", data: products });
  } else {
    res.status(404).send({ error: "product not found", data: [] });
  }
});

export default router;
