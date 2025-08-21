import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import dotenv from 'dotenv';

dotenv.config();

const tokenAuth = (req, res, next) => {
  
  // TODO: remove this when deploying to production
  if(process.env.SKIP_AUTH == "true") {
    return next();
  }
  
  auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
    tokenSigningAlg: "RS256",
  })(req, res, (err) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized: Invalid or missing token",
        error: err.message,
      });
    }

    next();
  });
};

const scopeAuth = (scope) => (req, res, next) => {
  requiredScopes(scope)(req, res, (err) => {
    if (err) {
      return res.status(403).json({
        message: "Forbidden: Insufficient permissions",
        error: err.message,
      });
    }
    next();
  });
};

export { tokenAuth, scopeAuth };