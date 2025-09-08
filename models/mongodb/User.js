import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import config from "../../config/config.js";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true },
  profilePicture: { type: String },
  metaData: {
    deviceId: { type: String },
    preferredLang: {
      type: String,
      enum: ["en", "it"],
      default: "en"
    },
    selectedTheme: {
      type: String,
      enum: ["light", "dark"],
      default: "light"
    }
  },
  gender: { type: String },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['delegate', 'organizer', 'admin', 'partner'], default: 'delegate' },
  provider: { type: String, enum: ['local', 'google', 'facebook', 'auth0'], default: 'local' },
  status: {
    type: String,
    enum: ["pending", "active", "rejected", "blocked"],
    default: "pending",
  },
  resetPasswordToken: {
    type: String,
    select: false
  },
  resetPasswordExpire: {
    type: Date,
    select: false
  },
}, {
  timestamps: true,
  versionKey: false
});


userSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, config.HASH_ROUND, function (err, hash) {
    if (err) {
      console.log("error: 500 unable to hash password!");
    } else {
      user.password = hash;
      next();
    }
  });
});

userSchema.statics.authenticate = async function (username, password) {
  try {
    const user = await this.findOne({ email: username }).select('+password');

    if (!user) {
      const error = new Error("User not found.");
      error.status = 401;
      throw error;
    }

    if (user.status !== "active") {
      const error = new Error("User is not active.");
      error.status = 401;
      throw error;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const error = new Error("Incorrect password.");
      error.status = 401;
      throw error;
    }

    return user;

  } catch (err) {
    throw err;
  }
};

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
});


export default mongoose.model('User', userSchema);
