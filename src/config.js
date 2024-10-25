import * as url from "url";
import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT,
  DIRNAME: url.fileURLToPath(new URL(".", import.meta.url)),
  /**
   * Función tipo getter
   * Configuramos dinámicamente UPLOAD_DIR() de acuerdo al valor de DIRNAME
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
   */
  get UPLOAD_DIR() {
    return `${this.DIRNAME}/public/uploads`;
  },
  MONGODB_URI: process.env.MONGODB_URI,
  CARTS_COLLECTION: "carts",
  PRODUCTS_COLLECTION: "products",
};

export default config;
