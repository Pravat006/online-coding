import { Router } from "express";
import { createAcolaborationSession } from "../controllers/session.controller.js";
import { getAuth, requireAuth } from "@clerk/express";


const router = Router();


router.use(requireAuth())

router.route("/create").post(createAcolaborationSession);

export default router

