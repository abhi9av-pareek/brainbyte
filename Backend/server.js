import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import quizRoutes from "./src/routes/quizRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();

// logging middleware
app.use((req, res, next) => {
  console.log("Request hit:", req.method, req.url);
  next();
});

// connect DB
connectDB();

// middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      const allowed = [
        "https://gyantra.netlify.app",
        "http://localhost:5173",
        "http://localhost:5174",
      ];
      if (allowed.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// routes
app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Server Error" });
});

// start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
