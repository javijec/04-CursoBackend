import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import config from "../../config.js";

mongoose.pluralize(null);

const collection = config.CARTS_COLLECTION;

const schema = new mongoose.Schema({
  products: { type: Array, default: [] },
});

schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
