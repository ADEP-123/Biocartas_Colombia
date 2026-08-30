const { Router } = require("express");
const healthRoutes = require("./health.routes");
const speciesRoutes = require("./species.routes");

const router = Router();

router.use("/health", healthRoutes);
router.use("/species", speciesRoutes);

// Próximamente:
// router.use('/auth', authRoutes);
// router.use('/cards', cardsRoutes);

module.exports = router;
