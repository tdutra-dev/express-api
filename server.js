import "dotenv/config";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import usersRoutes from "./src/routes/usersRoutes.js";
import { logger } from "./src/middleware/logger.js";
import { connectDB } from "./src/config/db.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

// connessione a MongoDB
connectDB();

const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(logger);
app.use(helmet());
app.use(cors({
  origin: "*", // per ora aperto a tutti, poi si può restringere
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 100, // massimo 100 richieste ogni 15 minuti per IP
});

app.use(limiter);

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
