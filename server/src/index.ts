
import dotenv from 'dotenv';
import httpServer from "./app";
import * as process from "node:process";


dotenv.config({ path: "./.env" });


httpServer.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
})

