const mongoose = require("mongoose");
const env = require("./env");

async function connectDB() {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("[MongoDB] Conectado correctamente");
  } catch (error) {
    console.error("[MongoDB] Error de conexión:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
