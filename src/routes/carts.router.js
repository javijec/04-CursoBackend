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

/*FALTA POST /:cid/product/:pid: agrega el producto con id pid al array products del carrito con id cid.
Objeto que se agrega al array: id (correspondiente a un producto), quanƟty: Number, la canƟdad.
Si ya existe el pid en Products, se aumenta canƟdad, no se agrega otro elemento con mismo pid.*/
/*La primer captura te pide que agregues un producto al carrito, cid es id del carrito, pid es id del proucto, si te envían, quantity por body se pone ese si no se pone 1*/
router.post("/:cid/product/:pid", (req, res) => {
  if (carts.find((element) => element.id == req.params.cid)) {
    res.status(200).send({ error: null, data: carts });
  } else {
    res.status(404).send({ error: "cart not found", data: [] });
  };
})



export default router;
