import axios from 'axios';
import dotenv from 'dotenv';

import { getManagementApiToken } from '../utils/authUtils.js';

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const token = await getManagementApiToken();
        
    const userResponse = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
      {
        email: req.body.email,
        password: req.body.password,
        connection: "Username-Password-Authentication",
        given_name: req.body.firstName,
        family_name: req.body.lastName,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(userResponse.data);
  } catch (error) {
    res.status(400).json({ error: error.response?.data || "User registration failed" });
  }
};



export const hostedLogin = async (req, res) => {
  const REDIRECT_URI = 'http://localhost:3000';
  const authUrl = `https://${process.env.AUTH0_DOMAIN}/authorize?client_id=${process.env.AUTH0_CLIENT_ID}&audience=${process.env.AUTH0_AUDIENCE}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid profile email read:current_user update:current_user_metadata`;
  res.redirect(authUrl);
}

export const getToken = async (req, res) => {
  const REDIRECT_URI = 'http://localhost:3000';
  var code = req.body.code;

  try {
    const tokenResponse = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      }
    );

    res.json(tokenResponse.data);
  } catch (error) {
    res.status(400).json({ error: error.response?.data || 'Token exchange failed' });
  }
}

export const getUserData = async (req, res) => {
  try {
    const response = await axios.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
      headers: {
        Authorization: `Bearer ${req.auth.token}`, 
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get user data', message: error.response?.data || error });
  }
};

export const getUserWithMetaData = async (req, res) => {
  try {   
    const response = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${req.auth.payload.sub}`,
      {
        headers: {
          Authorization: `Bearer ${req.auth.token}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get user data',message: error.response?.data || error });
  }
};

export const updateUserData = async (req, res) => {
  try {
    const { name, nickname,picture } = req.body;

    const response = await axios.patch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${req.auth.payload.sub}`,
      { name, nickname,picture },
      {
        headers: {
          Authorization: `Bearer ${req.auth.token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user data',message: error.response?.data || error });
  }
};

export const updateUserMetadata = async (req, res) => {
  try {  
    const { theme, language } = req.body;
    const  newMetaData = { theme: theme, language: language };

    const response = await axios.patch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${req.auth.payload.sub}`,
      {user_metadata: newMetaData},
      {
        headers: {
          Authorization: `Bearer ${req.auth.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user metadata',message: error.response?.data || error });
  }
};

export const logout = async (req, res) => {
  const REDIRECT_URI = 'http://localhost:3000';
  const logoutUrl = `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${REDIRECT_URI}`;

  res.redirect(logoutUrl);
};