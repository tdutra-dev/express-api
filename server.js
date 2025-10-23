import express from "express";
import usersRoutes from "./src/routes/usersRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json()); // per leggere JSON nel body
app.use("/api/users", usersRoutes);

// Middleware di gestione errori globali
app.use((err, req, res, next) => {
  console.error("🔥 Errore non gestito:", err.message);
  res.status(500).json({ message: "Errore interno del server" });
});

app.listen(PORT, () => {
  console.log(`🚀 API Express in ascolto su http://localhost:${PORT}`);
});