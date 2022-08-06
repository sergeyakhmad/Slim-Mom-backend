const express = require("express");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  getDiaryInfoController,
  addProductController,
  deleteProductController,
} = require("../../controllers/diaryController");
const {
  deleteDairyValidation,
  addDairyValidation,
} = require("../../helpers/Joi/dairySchema");
const { validate } = require("../../middlewares/validation");
const { catchErrors } = require("../../helpers/catch-errors");

const router = express.Router();

router.get("/:date", authMiddleware, catchErrors(getDiaryInfoController));

router.patch(
  "/add",
  authMiddleware,
  validate(addDairyValidation),
  catchErrors(addProductController)
);

router.patch(
  "/delete",
  authMiddleware,
  validate(deleteDairyValidation),
  catchErrors(deleteProductController)
);

module.exports = router;
