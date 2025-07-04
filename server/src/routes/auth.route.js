import passport from "passport";
import { Router } from "express";
import "../passport/index.js"; // Ensure the Google strategy is registered before using it
import prisma from "../db/client.js";

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


if (process.env.NODE_ENV !== 'production') {
    router.post('/test-login', async (req, res) => {
        try {
            const user = await prisma.user.findFirst();

            if (!user) {
                return res.status(404).json({ success: false, message: "No test user found" });
            }


            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: err.message });
                }
                return res.status(200).json({ success: true, user });
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
}

export default router;




