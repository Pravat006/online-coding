import passport from "passport";
import { Router } from "express";
import "../passport/index.js"; // Ensure the Google strategy is registered before using it

const router = Router();


router.route("/google")
    .get(passport.authenticate("google", {
        scope: ["profile", "email"],
    }),

        (req, res) => {
            res.send("Redirecting to Google...");
        });


router.route("/google/callback")
    .get(passport.authenticate("google", {
        failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
        successRedirect: process.env.CLIENT_URL || "http://localhost:3000", // Redirect to the frontend's root on success
    }));

router.get("/user/data", (req, res) => {
    if (req.user) {
        res.status(200).json({
            message: "User data retrieved successfully",
            user: req.user
        });
    } else {
        res.status(401).json({
            message: "User not authenticated",
            user: null
        });
    }

})

export default router;




