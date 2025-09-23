import bcrypt from "bcryptjs";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

import { getDBInstance  } from '../db/dbSelector.js';

const userCollectionName = "User";
const notificationCollectionName = "Notification";


import {generateToken} from "../utils/utils.js";

import config from "../config/config.js";
import Email from "../services/mailService.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await getDBInstance().getOne(userCollectionName, { email: email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await getDBInstance().create(userCollectionName,{
      firstName,
      lastName,
      email,
      password,
      status: "active",
    });

    const token = generateToken(user._id, user.role); 

    res.status(201).json({
      "user":user,
      "token":token,
      "expiresIn": config.TOKEN_TIMEOUT,
      "message": "Registration successful"
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await getDBInstance().userAuthenticate(email, password);

    const token = generateToken(user._id, user.role);
    res.json({
      "user":user,
      "token":token,
      "expiresIn": config.TOKEN_TIMEOUT,
      "message": "login successful"
    });

  } catch (error) {
    return res.status(error.status).json({ message: error.message || "Invalid email or password" });
  }
};

export const getUserData = async (req, res) => {
  try {
    const user = await getDBInstance().getById(userCollectionName, req.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export const updateUserData = async (req, res) => {
try {
    const updates = { ...req.body };
    delete updates.password;
    delete updates.id;
    delete updates._id;

    const user = await getDBInstance().update(userCollectionName, req.id, updates);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export const forgetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getDBInstance().getOne(userCollectionName, { email });
    if (!user) return res.status(404).json({ message: "User not found" });


    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + config.RESET_PASSWORD_TOKEN_TIMEOUT;
    await user.save();

    const resetUrl = `${config.FRONTEND_URL}/reset-password/${resetToken}`;

    const subject = "Password Reset Request";
    const body = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;
    const bodyHtml = `<p>You requested a password reset.</p><p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`;

    await Email.sendMail(email, subject, body, bodyHtml);

    getDBInstance().create(notificationCollectionName,{
      userId: user._id,
      type: "system",
      title: "Password Reset Request",
      message: "A password reset request has been made",
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const forgetPasswordUpdate = async (req, res) => {
try {
    const { newPassword,token } = req.body;

    const user = await getDBInstance().getOne(userCollectionName, {resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() }});

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    getDBInstance().create(notificationCollectionName,{
      userId: user._id,
      type: "system",
      title: "Password Reset Success",
      message: "your password has been reset successfully",
    });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export const resetPassword = async (req, res) => {
try {
    const { currentPassword, newPassword } = req.body;

    const user = await getDBInstance().getById(userCollectionName, req.id,null,"+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    user.password = newPassword
    await user.save();

    getDBInstance().create(notificationCollectionName,{
      userId: user._id,
      type: "system",
      title: "Password update Success",
      message: "your password has been updated successfully",
    });
    
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export const signinWithProvider = async (req, res) => {
  const { provider } = req.params;
  const { token } = req.body;

  if (!provider || !token) {
    return res.status(400).json({ message: "Provider and token are required" });
  }

  try {
    let userInfo;
    if (provider === "auth0") {
      const response = await fetch(`https://${config.AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        return res.status(400).json({ message: "Invalid token" });
      }

      userInfo = await response.json();
    }else if(provider === "google"){
      // Google Client
      const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const { idToken } = req.body;
      try {
        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
          idToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        let user = await User.findOne({ email: payload.email });
        if (!user) {
          user = await User.create({
            firstName: payload.given_name,
            lastName: payload.family_name,
            email: payload.email,
            provider: "google",
          });
        }

        // Issue your own JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.json({ user, token });
      } catch (err) {
        res.status(401).json({ error: "Invalid Google token" });
      }
    }else if (provider === "facebook") {
      const { accessToken } = req.body;
      try {
        const fbRes = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
        );
        const fbData = await fbRes.json();

        let user = await User.findOne({ email: fbData.email });
        if (!user) {
          user = await User.create({
            firstName: fbData.name.split(" ")[0],
            lastName: fbData.name.split(" ")[1] || "",
            email: fbData.email,
            provider: "facebook",
          });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.json({ user, token });
      } catch (err) {
        res.status(401).json({ error: "Invalid Facebook token" });
      }
    }else if (provider === "apple") {
      const { idToken } = req.body;

      try {
        // Apple’s keys: https://appleid.apple.com/auth/keys
        // You’d verify the JWT with Apple’s public keys (e.g., using `jsonwebtoken` + `jwks-rsa`)

        const decoded = jwt.decode(idToken, { complete: true });

        let user = await User.findOne({ email: decoded.payload.email });
        if (!user) {
          user = await User.create({
            firstName: decoded.payload.name?.firstName || "",
            lastName: decoded.payload.name?.lastName || "",
            email: decoded.payload.email,
            provider: "apple",
          });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.json({ user, token });
      } catch (err) {
        res.status(401).json({ error: "Invalid Apple token" });
      }
    } else {
      return res.status(400).json({ message: "Unsupported provider" });
    }

    let user = await getDBInstance().getOne(userCollectionName, { email: userInfo.email });
    if (!user) {
      user = await getDBInstance().create(userCollectionName,{
        firstName: userInfo.given_name || '',
        lastName: userInfo.family_name || '',
        email: userInfo.email,
        password: crypto.randomBytes(16).toString("hex"),
        status: "active",
      });
    }

    const jwtToken = generateToken(user._id, user.role);
    res.json({
      "user":user,
      "token":jwtToken,
      "expiresIn": config.TOKEN_TIMEOUT,
      "message": "login successful"
    });

  } catch (error) {
    console.error("SSO Sign-in error:", error);
    res.status(500).json({ message: "Server error during SSO sign-in" });
  }
}

export const registerWithProvider = async (req, res) => {
  try {
    const { idToken } = req.body;

    // 1. Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    // 2. Check if user exists
    let user = await User.findOne({ email });

    // 3. If not exists → register (auto-registration)
    if (!user) {
      user = await User.create({
        email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        provider: "google",
        status: "active",
      });
    }

    // 4. Create your own JWT for session
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Google authentication failed" });
  }
}

export const authWithProvider = async (req, res) => {
  const {provider, token, email, name, photo } = req.body;

  if (!provider || !token) {
    return res.status(400).json({ message: "Provider and token are required" });
  }

  try {
    let verifiedEmail = email;
    let verifiedName = name;
    let verifiedPhoto = photo;

    // 🔹 Verify token with provider
    if (provider === "google") {
      const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      verifiedEmail = payload.email;
      verifiedName = payload.name;
      verifiedPhoto = payload.picture;
    }else if (provider === "apple") {
      const applePayload = await appleSignin.verifyIdToken(token, {
        audience: process.env.APPLE_CLIENT_ID,
        ignoreExpiration: false,
      });

       if(applePayload){
        verifiedEmail = applePayload.email;
       }

    }else if (provider === "facebook") {
      const fbResponse = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`
      );
      
      verifiedEmail = fbResponse.data.email;
      verifiedName = fbResponse.data.name;
      verifiedPhoto = fbResponse.data.picture?.data?.url;
    }

    if (!verifiedEmail) {
      return res.status(400).json({ message: "Unable to retrieve user email" });
    }

    try {
      const user = await getDBInstance().userSSOAuthenticate(verifiedEmail, provider);

      if (!user) {
        user = await getDBInstance().create(userCollectionName,{
          firstName: verifiedName.split(" ")[0],
          lastName: verifiedName.split(" ")[1],
          email: verifiedEmail,
          profilePicture: verifiedPhoto,
          provider,
          status: "active",
        });
        user = await User.create({
          email: verifiedEmail,
          name: verifiedName,
          photo: verifiedPhoto,
          provider,
        });
      }

      const token = generateToken(user._id, user.role);
      res.json({
        "user":user,
        "token":token,
        "expiresIn": config.TOKEN_TIMEOUT,
        "message": "login successful"
      });

    } catch (error) {
      return res.status(error.status).json({ message: error.message || "Invalid email or password" });
    }
  } catch (err) {
    console.error("SSO error:", err.message);
    return res.status(401).json({ message: "Invalid social login", error: err.message });
  }
};

authWithProvider