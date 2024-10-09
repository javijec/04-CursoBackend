import { Router } from 'express';
import fs from "fs";

const PRODUCTS_FILE = "./src/files/products.json";
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


router.get('/', (req, res) => {
   
    res.status(200).render('home', {title: 'PRODUCTOS', products: products});
});

router.get('/realtimeproducts', (req, res) => {
    const data = {};
    
    res.status(200).render('realtimeproducts', data);
});


export default router;