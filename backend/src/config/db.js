const prisma = require("./prisma");

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("[PostgreSQL] Conectado correctamente");
  } catch (error) {
    console.error("[PostgreSQL] Error de conexión:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
