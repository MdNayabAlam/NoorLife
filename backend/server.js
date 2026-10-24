const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB Database
connectDB();

// Welcome Root Endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NoorLife REST API is running! 🌿",
    version: "1.0.0",
    docs: "/api/v1/health",
  });
});

// Mount Versioned API Routes (/api/v1)
app.use("/api/v1", apiRoutes);

// Central 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found on this server.`,
  });
});

// Central Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 NoorLife server running smoothly on port ${PORT}`);
  console.log(`📡 API Endpoints available at http://localhost:${PORT}/api/v1`);
});
