import connectDB from './db/dbConnect.js';
import { httpServer } from './app.js';
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });


// connectDB()
//   .then(() => {
//     app.on("error", (error) => {
//       console.log("ERROR", error);
//       throw new error;
//     })
//     app.listen(process.env.PORT || 8000, () => {
//       console.log(`server is running at port http://localhost:${process.env.PORT}`);
//     })
//   })

//   .catch((error) => {
//     console.log(" mongodb connection faild", error);
//   });



const startServer= ()=>{
  httpServer.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
}

connectDB().then(() => {
  console.log("MongoDB connected successfully");
  startServer();
}).catch((error) => {
  console.error("MongoDB connection failed:", error);
  process.exit(1); // Exit the process with failure
});

