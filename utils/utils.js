import jwt from "jsonwebtoken";

import config from "../config/config.js";

const generateToken = (id,role) => {
  return jwt.sign({ id,role }, config.JWT_SECRET, {
    expiresIn: config.TOKEN_TIMEOUT,
  });
};

const generateRandomPassword = () => {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

export { generateToken, generateRandomPassword };
