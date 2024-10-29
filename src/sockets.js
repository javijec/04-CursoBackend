import { Server } from "socket.io";
import ProductController from "./dao/products.controller.js";

const initSocket = (httpServer) => {
  const io = new Server(httpServer);
  const productController = new ProductController();

  console.log("Servicio socket.io activo");

  io.on("connection", async (socket) => {
    console.log(`Cliente conectado, id ${socket.id} desde ${socket.handshake.address}`);

    try {
      // Enviar lista inicial de productos
      const products = await productController.get();
      socket.emit("products", products);

      // Escuchar eliminación de producto
      socket.on("delete_product", async (pid) => {
        try {
          const deletedProduct = await productController.deleteProduct(pid);
          io.emit("delete_product", { id: deletedProduct._id, title: deletedProduct.title });
          const updatedProducts = await productController.get();
          io.emit("products", updatedProducts);
        } catch (error) {
          socket.emit("error", { message: "Error al eliminar producto", details: error.message });
        }
      });

      socket.on("new_product", async (productData) => {
        try {
          const newProduct = await productController.addProduct(productData);
          const updatedProducts = await productController.get();

          socket.emit("products", updatedProducts);
          io.emit("add_product", { id: newProduct._id, title: newProduct.title });
        } catch (error) {}
      });

      socket.on("disconnect", (reason) => {
        console.log(`Cliente ${socket.id} desconectado: ${reason}`);
      });
    } catch (error) {
      console.error("Error en la conexión:", error);
      socket.emit("error", { message: "Error en la conexión" });
    }
  });

  return io;
};

export default initSocket;
