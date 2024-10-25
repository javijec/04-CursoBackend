import express from "express";
import handlebars from "express-handlebars";

import config from "./config.js";

import initSocket from "./sockets.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import mongoose from "mongoose";

const app = express();
const httpServer = app.listen(config.PORT, async () => {
  console.log(`Escuchando puesto ${config.PORT}`);

  await mongoose.connect(config.MONGODB_URI);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //WebSockets
  const socketServer = initSocket(httpServer);
  app.set("socketServer", socketServer);

  //Handlebars
  app.engine("handlebars", handlebars.engine());
  app.set("views", `${config.DIRNAME}/views`);
  app.set("view engine", "handlebars");
  app.use("/", viewsRouter);

  //Routes API
  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartsRouter);
  app.use("/static", express.static(`${config.DIRNAME}/public`));
});
