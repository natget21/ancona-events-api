import mongoose from 'mongoose';
import AWS from 'aws-sdk';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import { MongoDbDatabase } from './mongoDb.js';

dotenv.config();

let sequelizeInstance = null;
let dynamoDb = null;
let dbInstance = null;

const connectMongoDB = async () => {
  try {
    if(dbInstance){
      return dbInstance
    }else{
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected');
      dbInstance = new MongoDbDatabase();
      return dbInstance;
    }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

const connectDynamoDB = () => {
  if(dynamoDb){
    return dynamoDb
  }else{
    AWS.config.update({
      region: process.env.DYNAMODB_REGION,
    });
    dynamoDb = new AWS.DynamoDB.DocumentClient();
    console.log('DynamoDB connected');
    return dynamoDb;
  }
};

const connectPostgres = async () => {
  if(sequelizeInstance){
    return sequelizeInstance
  }else{
    sequelizeInstance = new Sequelize(
      process.env.POSTGRES_DB,
      process.env.POSTGRES_USER,
      process.env.POSTGRES_PASSWORD,
      {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        logging: false,
      }
    );
  
    try {
      await sequelizeInstance.authenticate();
      console.log('PostgreSQL connected');
    } catch (err) {
      console.error('Error connecting to PostgreSQL:', err.message);
      process.exit(1);
    }
  
    return sequelizeInstance;
  }
};

const connectToDB = async (dbType = 'mongodb') => {
  switch (dbType) {
    case 'mongodb':
      return await connectMongoDB();
    case 'dynamodb':
      return connectDynamoDB();
    case 'postgres':
      return await connectPostgres();
    default:
      console.error('Unsupported database type');
      process.exit(1);
  }
};

const gracefulShutdown = async (dbType) => {
  console.log(`Shutting down database connection: ${dbType}`);
  
  try {
    if (dbType === 'mongodb' && mongoose.connection.readyState) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    } 
    else if (dbType === 'postgres' && sequelizeInstance) {
      await sequelizeInstance.close();
      console.log('PostgreSQL connection closed');
    } 
    else if (dbType === 'dynamodb') {
      console.log('DynamoDB does not require explicit shutdown');
    } 
    else {
      console.warn('Unknown database type or connection not established.');
    }
  } catch (err) {
    console.error(`Error during shutdown: ${err.message}`);
  } finally {
    process.exit(0);
  }
};

export { connectToDB, gracefulShutdown,sequelizeInstance,dynamoDb  };
