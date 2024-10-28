import { query } from "express";
import productModel from "./models/product.model.js";

class ProductController {
  constructor() {}

  getProducts = async (limit = 10, page = 1, category, stock, sort) => {
    try {
      const options = { limit, page, lean: true };
      let query = {};
      if (sort) {
        options.sort = { price: sort };
      }
      if (category) {
        query = { category: category };
      }
      if (stock) {
        query = { stock: stock };
      }
      const products = query ? await productModel.paginate(query, options) : await productModel.paginate({}, options);

      if (!products) {
        throw new Error("Failed to fetch products");
      }

      return products;
    } catch (error) {
      throw error;
    }
  };

  getProduct = async (pid) => {
    try {
      const product = await productModel.findById(pid).lean();
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw error;
    }
  };

  addProduct = async (product) => {
    try {
      if (!product || Object.keys(product).length === 0) {
        throw new Error("Invalid product data");
      }

      const newProduct = await productModel.create(product);
      if (!newProduct) {
        throw new Error("Failed to create product");
      }
      return newProduct;
    } catch (error) {
      throw error;
    }
  };

  updateProduct = async (pid, product) => {
    try {
      if (!product || Object.keys(product).length === 0) {
        throw new Error("Invalid product data");
      }

      const existingProduct = await productModel.findById(pid);
      if (!existingProduct) {
        throw new Error("Product not found");
      }

      const updatedProduct = await productModel.findByIdAndUpdate(pid, product, { new: true });

      if (!updatedProduct) {
        throw new Error("Failed to update product");
      }

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  };

  deleteProduct = async (pid) => {
    try {
      const product = await productModel.findById(pid);
      if (!product) {
        throw new Error(`Product with ID ${pid} not found`);
      }

      const deletedProduct = await productModel.findByIdAndDelete(pid);
      if (!deletedProduct) {
        throw new Error("Error deleting product");
      }
      console.log(deletedProduct);
      return deletedProduct; // Return the deleted product for reference
    } catch (error) {
      throw error;
    }
  };

  get = async () => {
    try {
      const products = await productModel.find().lean();
      if (!products) {
        throw new Error("Failed to fetch products");
      }
      return products;
    } catch (error) {
      throw error;
    }
  };
}

export default ProductController;
