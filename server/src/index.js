import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import { saveNewUserToDB } from './middleware/clerk.js';
import connectDB from './db/dbConnect.js';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({
  path: "./.env"
})

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))

// Connect to MongoDB
connectDB();

app.use(express.json());

// Apply middlewares
app.use(clerkMiddleware());
app.use(saveNewUserToDB);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});







