const { calculateCalories } = require("../helpers/calculateCalories");
const {
  searchProducts,
  getNotAllowedProducts,
  addNotAllowedProductsForUser,
} = require("../services/productsService");

const searchProductsController = async (req, res) => {
  const searchQuerry = new RegExp(req.params.searchQuerry, "gi");

  const data = await searchProducts(searchQuerry);
  res.json(data);
};

const getNotAllowedProductsController = async (req, res) => {
  const { bloodType } = req.body;

  const notAllowedProducts = await getNotAllowedProducts(bloodType);
  const calories = calculateCalories(req.body);
  const response = {
    products: [...notAllowedProducts],
    calories,
  };
  res.json(response);
};

const addNotAllowedProductsController = async (req, res) => {
  const { bloodType } = req.body;
  const { _id } = req.user;
  const notAllowedProducts = await getNotAllowedProducts(bloodType);
  const calories = calculateCalories(req.body);
  const parameters = {
    ...req.body,
    calories,
  };

  await addNotAllowedProductsForUser({ _id, parameters, notAllowedProducts });
  const response = {
    products: [...notAllowedProducts],
    calories,
  };
  res.json(response);
};

module.exports = {
  searchProductsController,
  getNotAllowedProductsController,
  addNotAllowedProductsController,
};
