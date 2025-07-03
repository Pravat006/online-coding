import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";

import morganMiddleware from "./logger/morgan.js";

import { initializeSocketIo } from "./socket/socket.js";


const app = express();
const httpServer = createServer(app)

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


app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 72 * 60 * 60 * 1000,//3day
      secure: false,
      httpOnly: true
    }
  }))

app.use(passport.initialize());
app.use(passport.session());

// Body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Static files (if any)
app.use(express.static("public"));


// Logger
app.use(morganMiddleware);


// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Collaboration App API" });
});




import roomRouter from "./routes/room.route.js";
import authRouter from "./routes/auth.route.js";

app.use("/api/v0/session", roomRouter);
app.use("/api/v0/auth", authRouter);


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
