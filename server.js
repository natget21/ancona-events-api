import express from 'express';
import dotenv from 'dotenv';

import { initializeDB, shutdownDB } from './db/dbSelector.js';
import { setupStorage } from './utils/fileUploadUtils.js';

import authRoutes from './routes/authRoutes.js';
import folderRoutes from './routes/folderRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import promptRoutes from './routes/promptRoutes.js';
import promptCategoryRoutes from './routes/promptCategoryRoutes.js';
import productsRoutes from "./routes/productsRoutes.js";
import aiRoutes from './routes/aiRoutes.js';
import orderRoutes from './routes/ordersRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';

import {tokenAuth,scopeAuth} from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const router = express.Router();

app.use(express.json());

app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests, please try again later',
}));

app.use('/api/auth', authRoutes);
app.use('/api/folders', tokenAuth, folderRoutes);
app.use('/api/history',  tokenAuth, historyRoutes);
app.use('/api/messages', tokenAuth, messageRoutes);
app.use('/api/prompts', tokenAuth, promptRoutes);
app.use('/api/prompt-categories', tokenAuth, promptCategoryRoutes);
app.use('/api/ai', tokenAuth, aiRoutes);
app.use("/api/products", tokenAuth, productsRoutes);
app.use("/api/orders", tokenAuth, orderRoutes);
app.use('/api/resources', tokenAuth, resourceRoutes);

router.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'OK!' });
});

app.use(router);

app.use((req, res, next) => {
  res.status(404).json({
      message: "Resource not found",
  });
});

app.use(errorHandler);

let server;

initializeDB()
  .then(() => {
    setupStorage();
  })
  .then(() => {
    server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Server failed to start due to DB connection error', err);
    process.exit(1);
  });

const handleShutdown = async (signal) => {
  console.log(`Received ${signal}. Closing server...`);
  if (server) {
    server.close(() => {
      console.log('Express server closed.');
    });
  }
  await shutdownDB();
  process.exit(0);
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));