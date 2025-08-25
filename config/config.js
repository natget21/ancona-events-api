import dotenv from "dotenv";

dotenv.config();

export default {
  APP_NAME: "Ancona Events",
  API_URL: "",
  BASE_URL: "",
  FRONTEND_URL: "http://localhost:3000",
  SERVER_PORT: process.env.PORT || 5000,
  HASH_ROUND: 5,
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_TIMEOUT: "7d",
  RESET_PASSWORD_TOKEN_TIMEOUT: 3600000, // 1 hour
  DATABASE: {
    URI: process.env.MONGO_URI
  },
  MAIL: {
    FROM: process.env.SMTP_FROM,
    HOST: process.env.SMTP_HOST || "smtp.gmail.com",
    PORT: process.env.SMTP_PORT || 587,
    AUTH: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  },
  CLOUDINARY: { 
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  }
};