const { Router } = require("express");
const healthRoutes = require("./health.routes");
const speciesRoutes = require("./species.routes");
const authRoutes = require("./auth.routes");

const router = Router();

router.use("/health", healthRoutes);
router.use("/species", speciesRoutes);
router.use("/auth", authRoutes);

// Próximamente: router.use('/cards', cardsRoutes);

module.exports = router;
