import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import bodyParser from "body-parser";

import morganMiddleware from "./logger/morgan.js";
import { saveNewUserToDB } from "./middleware/clerk.js";
import sessionRouter from "./routes/session.route.js";

// Load environment variables
dotenv.config();

const app = express();

// CORS config
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
}));

// Body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body); // ✅ Should log your JSON
  next();
});

// Static files (if any)
app.use(express.static("public"));

// Log parsed body (for debugging form submissions)
app.use((req, res, next) => {
    if (req.method === "POST") {
        console.log("PARSED BODY:", JSON.stringify(req.body));
    }
    next();
});

// Logger
app.use(morganMiddleware);

// Clerk middleware
app.use(clerkMiddleware());
app.use(saveNewUserToDB);

// Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Collaboration App API" });
});

app.use("/session", sessionRouter);

// Postman body test route
app.post("/test", (req, res) => {
  res.status(200).json({
    message: "JSON received successfully",
    data: req.body
  });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR:", err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });
});

export default app;
