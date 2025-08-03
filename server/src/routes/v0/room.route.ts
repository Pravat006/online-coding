import { Router } from "express";
import { createColaborationRoom, deleteColaborationRoom, joinColaborationRoom, leaveColaborationRoom } from "../../controllers/room.controller";
import { isAuthenticated } from "../../middleware/auth.middleware";
const router = Router();

// Apply authentication middleware to all room routes
router.use(isAuthenticated);

router.route("/create")
    .post(createColaborationRoom);
router.route("/join/:roomId")
    .post(joinColaborationRoom);
router.route("/leave/:roomId")
    .post(leaveColaborationRoom);
router.route("/delete/:roomId")
    .delete(deleteColaborationRoom);


export default router;

