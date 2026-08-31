const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const requireAuth = require("../middlewares/auth.middleware");
const userService = require("../services/user.service");

const router = Router();

router.post(
  "/register",
  authController.validateCredentials,
  authController.register,
);
router.post("/login", authController.validateCredentials, authController.login);

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
