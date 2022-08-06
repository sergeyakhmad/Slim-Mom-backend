const { Schema, model } = require("mongoose");

const productSchema = Schema({
  _id: { type: Schema.Types.ObjectId, ref: "products" },
  weight: {
    type: Number,
    default: 100,
  },
  title: {
    type: String,
  },
  calories: {
    type: Number,
    default: 100,
  },
});

const diarySchema = Schema({
  productList: [productSchema],
  date: {
    type: String,
    require: [true, "Date is required"],
  },
  caloriesReceived: {
    type: Number,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const Diary = model("diary", diarySchema);

module.exports = { Diary };
