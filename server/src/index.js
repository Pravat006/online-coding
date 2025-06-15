import express from 'express';
import dotenv from 'dotenv';
const app = express();
const PORT =  process.env.PORT || 3000;

dotenv.config({
  path: "./.env"
})


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});






app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
