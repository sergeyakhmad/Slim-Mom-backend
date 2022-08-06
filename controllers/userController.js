const {
  registration,
  verification,
  verify,
  login,
  logout,
  currentUser,
} = require("../services/authService");

const registrationController = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await registration({ name, email, password });
  res.status(201).json({ user: { name: user.name, email: user.email } });
};

const verificationController = async (req, res) => {
  const { verificationToken } = req.params;

  await verification(verificationToken);
  res.status(200).json({ message: "Verification successful" });
};

const verifyController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "missing required field email" });
  }

  await verify(email);
  res.status(200).json({ message: "Verification email sent" });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await login({ email, password });
  res.status(200).json({
    token: user.token,
    name: user.name,
    email: user.email,
    verify: user.verify,
    notAllowedProducts: user.notAllowedProducts,
    parameters: user.parameters,
  });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
  res.status(204).json();
};

const currentUserController = async (req, res) => {
  const { _id } = req.user;
  const user = await currentUser(_id);
  res.status(200).json({
    name: user.name,
    notAllowedProducts: user.notAllowedProducts,
    parameters: user.parameters,
  });
};

module.exports = {
  registrationController,
  verificationController,
  verifyController,
  loginController,
  logoutController,
  currentUserController,
};
