const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { getDBStatus } = require("../config/db");
const { demoUser } = require("../middleware/auth");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "noorlife_default_secret", {
    expiresIn: "30d",
  });
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide name, email, and password." });
    }

    if (getDBStatus()) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: "User already exists with this email." });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        passwordHash,
        avatar: name.charAt(0).toUpperCase(),
      });

      return res.status(201).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        token: generateToken(user._id),
      });
    }

    // Fallback demo response
    return res.status(201).json({
      success: true,
      user: {
        id: demoUser._id,
        name: name || demoUser.name,
        email: email || demoUser.email,
        avatar: (name || "N").charAt(0).toUpperCase(),
      },
      token: generateToken(demoUser._id),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password." });
    }

    if (getDBStatus()) {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            location: user.location,
            preferences: user.preferences,
          },
          token: generateToken(user._id),
        });
      } else {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
      }
    }

    // Fallback demo user login
    return res.json({
      success: true,
      user: demoUser,
      token: generateToken(demoUser._id),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/v1/auth/me
exports.getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user || demoUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update current user profile
// @route   PATCH /api/v1/auth/me
exports.updateMe = async (req, res) => {
  try {
    const { name, email, location, preferences } = req.body;

    if (getDBStatus() && req.user && req.user._id) {
      const user = await User.findById(req.user._id);
      if (user) {
        if (name) user.name = name;
        if (email) user.email = email;
        if (location) user.location = { ...user.location, ...location };
        if (preferences) user.preferences = { ...user.preferences, ...preferences };
        const updatedUser = await user.save();
        return res.json({ success: true, user: updatedUser });
      }
    }

    // Fallback response
    return res.json({
      success: true,
      user: {
        ...demoUser,
        name: name || demoUser.name,
        email: email || demoUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
