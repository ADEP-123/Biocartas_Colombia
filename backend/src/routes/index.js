const { Router } = require("express");
const healthRoutes = require("./health.routes");

const router = Router();

router.use("/health", healthRoutes);

// Aquí se montarán las rutas de cada módulo:
// router.use('/auth', authRoutes);
// router.use('/species', speciesRoutes);
// router.use('/cards', cardsRoutes);

module.exports = router;
