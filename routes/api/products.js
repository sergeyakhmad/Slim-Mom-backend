const express = require("express");
const router = express.Router();

const { getDataForBMRValidation } = require("../../helpers/Joi/productsSchema");
const { validate } = require("../../middlewares/validation");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  searchProductsController,
  getNotAllowedProductsController,
  addNotAllowedProductsController,
} = require("../../controllers/productsController");
const { catchErrors } = require("../../helpers/catch-errors");

router.get("/search/:searchQuerry", catchErrors(searchProductsController));
router.post(
  "/bloodtype",
  validate(getDataForBMRValidation),
  catchErrors(getNotAllowedProductsController)
);
router.post(
  "/user/bloodtype",
  authMiddleware,
  validate(getDataForBMRValidation),
  addNotAllowedProductsController
);

module.exports = router;
