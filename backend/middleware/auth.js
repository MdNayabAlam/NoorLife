const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { getDBStatus } = require("../config/db");

// Fallback in-memory demo user for offline/demo operations
const demoUser = {
  _id: "665000000000000000000001",
  name: "Md Nayab Alam",
  email: "alamnayab718@gmail.com",
  avatar: "N",
  location: { city: "New Delhi, India", calculationMethod: "Karachi (Hanafi)" },
  preferences: { theme: "light", notifications: true },
};

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    // If running in development demo mode and no token supplied, default to authenticated demo user
    req.user = demoUser;
    return next();
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "noorlife_default_secret"
    );

    if (getDBStatus()) {
      req.user = await User.findById(decoded.id).select("-passwordHash");
      if (!req.user) {
        req.user = demoUser;
      }
    } else {
      req.user = demoUser;
    }

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    // Allow demo user in fallback mode
    req.user = demoUser;
    next();
  }
};

module.exports = { protect, demoUser };
