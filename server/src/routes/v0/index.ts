import { Router } from "express";
import roomRoutes from "./room.route";
import authRouter from "./auth.route";




const v0Routes = Router()


v0Routes.use("/room", roomRoutes);
v0Routes.use("/auth", authRouter)

export default v0Routes
