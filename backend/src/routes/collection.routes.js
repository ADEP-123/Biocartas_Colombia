const { Router } = require("express");
const collectionController = require("../controllers/collection.controller");
const requireAuth = require("../middlewares/auth.middleware");

const router = Router();

router.use(requireAuth);
router.get("/", collectionController.getCollection);
router.get("/progress", collectionController.getProgress);
router.get("/achievements", collectionController.getAchievements);

module.exports = router;
