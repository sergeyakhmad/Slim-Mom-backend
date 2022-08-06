const express = require("express");
const router = express.Router();

const {
  loginUserValidation,
  addUserValidation,
} = require("../../helpers/Joi/authSchema");
const { validate } = require("../../middlewares/validation");
const { catchErrors } = require("../../helpers/catch-errors");
const {
  registrationController,
  verificationController,
  verifyController,
  loginController,
  logoutController,
  currentUserController,
} = require("../../controllers/userController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.post(
  "/register",
  validate(addUserValidation),
  catchErrors(registrationController)
);
router.get("/verify/:verificationToken", catchErrors(verificationController));
router.post("/verify", catchErrors(verifyController));
router.post(
  "/login",
  validate(loginUserValidation),
  catchErrors(loginController)
);
router.get("/logout", authMiddleware, catchErrors(logoutController));
router.get("/current", authMiddleware, catchErrors(currentUserController));

module.exports = router;
