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

      // Escuchar nuevo producto
      socket.on("add_product", async (productData) => {
        try {
          const newProduct = await productController.addProduct(productData);
          io.emit("new_product", newProduct);

          // Actualizar lista de productos
          const updatedProducts = await productController.get();
          io.emit("products", updatedProducts);
        } catch (error) {
          console.error("Error al agregar producto:", error);
          socket.emit("error", { message: "Error al agregar producto" });
        }
      });

      // Escuchar eliminación de producto
      socket.on("delete_product", async (pid) => {
        try {
          await productController.deleteProduct(pid);
          io.emit("delete_product", pid);

          // Actualizar lista de productos
          const updatedProducts = await productController.get();
          io.emit("products", updatedProducts);
        } catch (error) {
          console.error("Error al eliminar producto:", error);
          socket.emit("error", { message: "Error al eliminar producto" });
        }
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
