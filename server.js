import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

import { initializeDB, shutdownDB } from './db/dbSelector.js';
import { setupStorage } from './utils/fileUploadUtils.js';

import authRoutes from './routes/authRoutes.js';
// import resourceRoutes from './routes/resourceRoutes.js';

import accommodationRoutes from './routes/accommodationRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import programRoutes from './routes/programRoutes.js';
import socialRoutes from './routes/socialRoutes.js';
import transportationRoutes from './routes/transportationRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import userRoutes from './routes/userRoutes.js';
import venueRoutes from './routes/venueRoutes.js';


import {tokenAuth,scopeAuth} from './middleware/auth0.js';
import { errorHandler } from './middleware/errorHandler.js';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: 'Too many requests, please try again later',
}));

app.use('/api/auth', authRoutes);
// app.use('/api/resource', resourceRoutes);
app.use('/api/accommodation', accommodationRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/program', programRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/transportation', transportationRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/user', userRoutes);
app.use('/api/venue', venueRoutes);

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