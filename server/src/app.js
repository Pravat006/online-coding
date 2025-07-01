import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";

import morganMiddleware from "./logger/morgan.js";
import { saveNewUserToDB } from "./middleware/clerk.js";
import sessionRouter from "./routes/session.route.js";
import { initializeSocketIo } from "./socket/socket.js";


const app = express();
const httpServer= createServer(app)

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
  }
})

app.set("io", io);

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));

// Load environment variables
dotenv.config();


// Body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Static files (if any)
app.use(express.static("public"));


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




initializeSocketIo(io);



// Global error handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || []
  });
});



export {
  httpServer
}
