import { Router } from "express";
import fs from "fs";

const PRODUCTS_FILE = "../src/files/products.json";
let products;

if (fs.existsSync(PRODUCTS_FILE)) {
  const productsFile = fs.readFileSync(PRODUCTS_FILE);
  products = JSON.parse(productsFile);
} else {
  try {
    fs.writeFileSync(PRODUCTS_FILE, "[]");
    products = [];
  } catch (error) {
    console.log(error);
  }
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
  const maxIndex = products.length > 0 ? Math.max(...products.map((element) => element.id)) : 0;
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
  if (
    req.body.title &&
    req.body.description &&
    req.body.code &&
    req.body.price &&
    req.body.stock &&
    req.body.category
  ) {
    products.push(product);
    try {
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
      res.status(200).send({ error: "null", data: product });
    } catch (error) {
      res.status(500).send({ error: "Failed to save product", data: [] });
    }
  } else {
    res.status(400).send({ error: "Bad Request", data: [product] });
  }
});

/*- PUT /:pid: actualiza el producto con id pid, según los campos enviados en el body. NUNCA se cambia el id
original. */

router.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const productIndex = products.findIndex((element) => element.id == pid);
  if (productIndex === -1) {
    return res.status(404).send({ error: "product not found", data: [] });
  }
  const product = products[productIndex];
  if (title || description || code || price || status || stock || category || thumbnails) {
    product.title = title || product.title;
    product.description = description || product.description;
    product.code = code || product.code;
    product.price = price || product.price;
    product.status = status || product.status;
    product.stock = stock || product.stock;
    product.category = category || product.category;
    product.thumbnails = thumbnails || product.thumbnails;
    try {
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
      res.status(200).send({ error: "null", data: product });
    } catch (error) {
      res.status(500).send({ error: "Failed to save product", data: [] });
    }
  }
});

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
