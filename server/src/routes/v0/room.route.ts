import { Router } from "express";
import * as roomController from "../../controllers/room.controller";
// import { isAuthenticated } from "../middleware/auth.middleware.js";
const router = Router();

// router.use(isAuthenticated);

router.route("/create")
    .post(roomController.createColaborationRoom);
router.route("/join/:roomId")
    .post(roomController.joinColaborationRoom);
router.route("/leave/:roomId")
    .post(roomController.leaveColaborationRoom);
router.route("/delete/:roomId")
    .delete(roomController.deleteColaborationRoom);


export default router

