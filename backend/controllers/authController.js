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

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long." });
    }

    if (getDBStatus()) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: "An account already exists with this email." });
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
        message: "Account created successfully! Welcome to NoorLife.",
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
    const newUser = {
      id: "u-" + Date.now(),
      name,
      displayName: name.split(" ")[0],
      email,
      avatarLetter: name.charAt(0).toUpperCase(),
    };

    return res.status(201).json({
      success: true,
      message: "Account created successfully! Welcome to NoorLife.",
      user: newUser,
      token: generateToken(newUser.id),
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
          message: "Signed in successfully!",
          user: {
            id: user._id,
            name: user.name,
            displayName: user.name.split(" ")[0],
            email: user.email,
            avatarLetter: user.avatar || user.name.charAt(0).toUpperCase(),
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
      message: "Signed in successfully!",
      user: {
        id: demoUser._id,
        name: demoUser.name,
        displayName: "Nayab",
        email: email || demoUser.email,
        avatarLetter: "N",
        location: demoUser.location,
        preferences: demoUser.preferences,
      },
      token: generateToken(demoUser._id),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Logout user
// @route   POST /api/v1/auth/logout
exports.logout = (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully from NoorLife.",
  });
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

    return res.json({
      success: true,
      user: {
        ...demoUser,
        name: name || demoUser.name,
        displayName: (name || demoUser.name).split(" ")[0],
        email: email || demoUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Change password
// @route   POST /api/v1/auth/change-password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter both current and new passwords.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters.",
      });
    }

    if (getDBStatus() && req.user && req.user._id) {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Current password does not match." });
      }

      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(newPassword, salt);
      await user.save();

      return res.json({
        success: true,
        message: "Password changed successfully! Keep it safe.",
      });
    }

    // In-memory fallback
    return res.json({
      success: true,
      message: "Password changed successfully! (Demo Mode)",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Account deletion flow
// @route   POST /api/v1/auth/delete-account
exports.deleteAccount = async (req, res) => {
  try {
    const { confirmation } = req.body;
    if (confirmation !== "DELETE") {
      return res.status(400).json({
        success: false,
        message: "Please type DELETE to confirm account deletion.",
      });
    }

    if (getDBStatus() && req.user && req.user._id) {
      await User.findByIdAndDelete(req.user._id);
      return res.json({
        success: true,
        message: "Account and associated data deleted successfully.",
      });
    }

    return res.json({
      success: true,
      message: "Account and associated data deleted successfully. (Demo Mode)",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
