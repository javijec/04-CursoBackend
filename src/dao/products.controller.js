import productModel from "./models/product.model.js";

class ProductController {
  constructor() {}
  getProducts = async (limit, page, query, sort) => {
    limit = limit || 10;
    page = page || 1;
    sort = sort || "asc";
    console.log(limit, page, query, sort);
    try {
      if (query) {
        return await productModel.paginate({ category: query }, { limit, page, sort: { stock: sort }, lean: true });
      } else {
        return await productModel.paginate({}, { limit, page, sort: { price: sort }, lean: true });
      }
    } catch (error) {
      return error.message;
    }
  };

  getProduct = async (pid) => {
    try {
      return await productModel.findById(pid);
    } catch (error) {
      return error.message;
    }
  };

  addProduct = async (product) => {
    try {
      console.log(product);
      return await productModel.create(product);
    } catch (error) {
      return error.message;
    }
  };

  updateProduct = async (pid, product) => {
    try {
      return await productModel.updateOne({ _id: pid }, product);
    } catch (error) {
      return error.message;
    }
  };

  deleteProduct = async (pid) => {
    try {
      return await productModel.deleteOne({ _id: pid });
    } catch (error) {
      return error.message;
    }
  };
}

export default ProductController;
