import "dotenv/config";
import express from "express";
import usersRoutes from "./src/routes/usersRoutes.js";
import { logger } from "./src/middleware/logger.js";
import { connectDB } from "./src/config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// connessione a MongoDB
connectDB();

app.use(express.json());
app.use(logger);
app.use("/api/users", usersRoutes);

// Middleware gestione errori
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Errore interno del server" });
});

app.listen(PORT, () => console.log(`🚀 Server in ascolto su http://localhost:${PORT}`));


// import express from "express";
// import usersRoutes from "./src/routes/usersRoutes.js";
// import { logger } from "./src/middleware/logger.js";
// import fs from "fs";
// import path from "path";
// import morgan from "morgan";

// app.use(morgan("dev"));

// const logStream = fs.createWriteStream(path.join("access.log"), { flags: "a" });
// app.use(morgan("combined", { stream: logStream }));


// const app = express();
// app.use(express.json());

// // 🧭 Logga tutte le richieste
// app.use(logger);

// // Rotte principali
// app.use("/api/users", usersRoutes);

// // Middleware errori globali (già fatto)
// app.use((err, req, res, next) => {
//   console.error("🔥 Errore non gestito:", err.message);
//   res.status(500).json({ message: "Errore interno del server" });
// });

// app.listen(3000, () => console.log("🚀 Server in ascolto su http://localhost:3000"));
