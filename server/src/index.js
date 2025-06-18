import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import { saveNewUserToDB } from './middleware/clerk';
import { dbInstance } from './db/dbConnect.js';

const app = express();
const PORT =  process.env.PORT || 3000;

dotenv.config({
  path: "./.env"
})


app.use(express.json());

// apply clerk auth middleware globally
app.use(clerkMiddleware()) 
app.use(saveNewUserToDB())

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


dbInstance.then(() => {
  console.log('Database connected successfully');
}
).catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1); // Exit the process with failure
}
);






app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
