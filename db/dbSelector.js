import dotenv from 'dotenv';
import { connectToDB, gracefulShutdown } from './dbUtils.js';

dotenv.config();

const DB_TYPE = process.env.DB_TYPE || 'mongodb';

let dbInstance = null; 

const initializeDB = async () => {
  try {
    if (dbInstance == null) {
      dbInstance = await connectToDB(DB_TYPE);
      console.log(`Database initialized: ${DB_TYPE}`);
    }
    return dbInstance;
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

const getDBInstance = () => {
  if (!dbInstance) {
    throw new Error("Database not initialized. Call initializeDB() first.");
  }
  return dbInstance;
};

const shutdownDB = async () => {
  console.log('Shutting down database connection...');
  await gracefulShutdown(DB_TYPE);
};

export { initializeDB,getDBInstance, shutdownDB, DB_TYPE };

