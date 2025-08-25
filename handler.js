import serverless from "serverless-http";
import express from "express";
import dotenv from "dotenv";

import { initializeDB, shutdownDB } from "./db/dbSelector.js";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import accomodationRoutes from "./routes/accommodationRoutes.js";
import transportationsRoutes from "./routes/transportationRoutes.js";
import tripsRoutes from "./routes/tripRoutes.js";

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
app.use("/api/events", eventRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/accomodations", accomodationRoutes);
app.use("/api/transportations", transportationsRoutes);
app.use("/api/trips", tripsRoutes);

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
