import serverless from "serverless-http";
import express from "express";
import dotenv from "dotenv";

import { initializeDB, shutdownDB } from "./db/dbSelector.js";

import authRoutes from "./routes/authRoutes.js";
import folderRoutes from "./routes/folderRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import promptRoutes from "./routes/promptRoutes.js";
import promptCategoryRoutes from "./routes/promptCategoryRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";

import { errorHandler } from "./middleware/errorHandler.js";

import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const router = express.Router();

app.use(express.json());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later",
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/prompt-categories", promptCategoryRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", orderRoutes);

router.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'OK!' });
});

app.use(router);

app.use(errorHandler);

initializeDB()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => {
    console.error("❌ Failed to initialize DB:", err);
    process.exit(1);
  });

export const api = serverless(app);

const handleShutdown = async (signal) => {
  console.log(`Received ${signal}. Closing server...`);
  await shutdownDB();
  process.exit(0);
};

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
