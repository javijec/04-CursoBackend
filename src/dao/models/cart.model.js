import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import config from "../../config.js";

mongoose.pluralize(null);

const collection = config.CARTS_COLLECTION;

const schema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
});

schema.pre("find", function () {
  this.populate("products.product");
});

schema.pre("findOne", function () {
  this.populate("products.product");
});

schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
