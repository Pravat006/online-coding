import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import morganMiddleware from "./logger/morgan";
import { initializeSocketIo } from "./socket/socket";
import router from "./routes/index";
import { errorConvertor, errorHandler } from "./handler/ErrorHandler";
// import { apiLimiter } from  "@/config/rate-limiter.ts";

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
initializeSocketIo(io)

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET || "fallback-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 72 * 60 * 60 * 1000,//3day
      secure: false,
      httpOnly: true
    }
  }))
// app.use(apiLimiter)
app.use(passport.initialize());
app.use(passport.session());

// Body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Static files (if any)
app.use(express.static("public"));
app.use(morganMiddleware);
app.use(router)
app.use(errorConvertor)
app.use(errorHandler)



export default httpServer;