const mongoose = require("mongoose");

//SCHEMA FOR REVIEW
const reviewsSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      require: true,
    },
    Comment: {
      type: String,
    },
    rating: {
      type: Number,
      require: true,
    },
  },
  {
    timeStamps: true,
  }
);

//SCHEMA FOR PRODUCT

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    countInStock: {
      type: Number,
      require: true,
    },
    rating: {
      type: String,
      require: true,
      default: 0,
    },
    reviews: [reviewsSchema],
  },
  {
    timeStamps: true,
  }
);
const Product = mongoose.model("products", productSchema);
module.exports = Product;
