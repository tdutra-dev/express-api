import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Use environment variable if available, otherwise fallback to localhost
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/expressapi";
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connesso: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ Errore connessione MongoDB:", err.message);
    process.exit(1); // ferma il server se non riesce a connettersi
  }
};
