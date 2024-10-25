import cartModel from "./models/cart.model.js";

class CartController {
  constructor() {}

  addCart = async (cart) => {
    try {
      return await cartModel.create(cart);
    } catch (error) {
      return error.message;
    }
  };

  getCart = async (cid) => {
    try {
      return await cartModel.findById(cid);
    } catch (error) {
      return error.message;
    }
  };

  updateCart = async (cid) => {
    try {
      return await cartModel.findByIdAndUpdate(cid, { $set: { products: [] } });
    } catch (error) {
      return error.message;
    }
  };

  updateProduct = async (cid, pid) => {
    try {
      return await cartModel.findByIdAndUpdate(cid, { $push: { products: pid } });
    } catch (error) {}
  };

  addProduct = async (cid, pid) => {
    try {
      return await cartModel.findByIdAndUpdate(cid, { $push: { products: pid } });
    } catch (error) {
      return error.message;
    }
  };

  deleteCart = async (cid) => {
    try {
      return await cartModel.findByIdAndDelete(cid);
    } catch (error) {
      return error.message;
    }
  };

  deleteProduct = async (cid, pid) => {
    try {
      return await cartModel.findByIdAndUpdate(cid, { $pull: { products: pid } });
    } catch (error) {
      return error.message;
    }
  };
}

export default CartController;
