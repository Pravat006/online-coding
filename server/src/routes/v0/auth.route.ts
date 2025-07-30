import passport from "passport";
import { Request, Response, Router } from "express";
import "../../passport/index";
import prisma from "@/db/client";
// import { User } from "@/@types/interface";

const router = Router();


router.route("/google")
    .get(passport.authenticate("google", {
        scope: ["profile", "email"],
    }),

        (_, res: Response) => {
            res.send("Redirecting to Google...");
        });


router.route("/google/callback")
    .get(passport.authenticate("google", {
        failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
        successRedirect: process.env.CLIENT_URL || "http://localhost:3000",
    }
    )
    );

router.get("/user/data", (req: Request, res: Response) => {

    console.log("user : ", req)
    if (req.user) {
        // console.log("user : ", req.user)
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

router.post("/logout", (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({
                success: false,
                message: "Error during logout"
            });
        }

        // Clear the session cookie
        res.clearCookie('connect.sid');

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    });
});

//
if (process.env.NODE_ENV !== 'production') {
    // Test-only authentication endpoint (Development only!)
    router.post("/test-login", async (req: Request, res: Response) => {
        try {
            // Find a test user in database
            const user = await prisma.user.findFirst();

            if (!user) {
                return res.status(404).json({ success: false, message: "No test user found" });
            }


            // Log the user in programmatically
            req.login({
                id: user.id,
                name: user.name || undefined
            }, (err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: err.message });
                }
                return res.status(200).json({ success: true, message: "Test login successful", user });
            });
        } catch (error) {
            console.error("Test login error:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(500).json({ success: false, message: errorMessage });
        }
    });
}

export default router;
