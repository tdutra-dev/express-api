import express from "express";
import usersRoutes from "./src/routes/usersRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json()); // per leggere JSON nel body
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`🚀 API Express in ascolto su http://localhost:${PORT}`);
});