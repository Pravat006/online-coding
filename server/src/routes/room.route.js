import { Router } from "express";
import { createAcolaborationRoom, joinColaborationRoom, leaveColaborationRoom, deleteColaborationRoom } from "../controllers/room.controller.js";
import isAuthenticated from "../middleware/auth.middleware.js";
const router = Router();

router.use(isAuthenticated);

router.route("/create")
    .post(createAcolaborationRoom);
router.route("/join/:roomId")
    .post(joinColaborationRoom);
router.route("/leave/:roomId")
    .post(leaveColaborationRoom);
router.route("/delete/:roomId")
    .delete(deleteColaborationRoom);


export default router

