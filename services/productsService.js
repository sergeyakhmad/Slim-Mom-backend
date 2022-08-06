const { Product } = require("../models/productModel");
const { NotFound } = require("http-errors");
const { User } = require("../models/userModel");

const searchProducts = async (searchQuerry) => {
  const data = await Product.find().or(
    { "title.ru": { $regex: searchQuerry } },
    { "title.ua": { $regex: searchQuerry } }
  );

  if (!data.length) {
    throw new NotFound();
  }

  return data;
};

const getNotAllowedProducts = async (bloodType) => {
  const data = await Product.find(
    { ["groupBloodNotAllowed." + bloodType]: { $eq: true } },
    "-__v ",
    { limit: 50, sort: { calories: -1 } }
  );

  if (!data) {
    throw new NotFound();
  }

  return data;
};

const addNotAllowedProductsForUser = async ({
  _id,
  parameters,
  notAllowedProducts,
}) => {
  const updateUser = await User.findByIdAndUpdate(
    _id,
    { parameters, notAllowedProducts },
    { new: true }
  );

  if (!updateUser) {
    throw new NotFound();
  }

  return updateUser;
};

const getProductsListbyId = async (productListId = []) => {
  const result = await Product.find({ _id: { $in: productListId } });
  if (!result) {
    throw new NotFound();
  }
  return result;
};

module.exports = {
  searchProducts,
  getNotAllowedProducts,
  addNotAllowedProductsForUser,
  getProductsListbyId,
};
