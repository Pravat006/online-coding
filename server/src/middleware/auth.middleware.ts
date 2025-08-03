import { Request, Response, NextFunction } from "express";
import prisma from "../db/client";
import { User } from "@/@types/interface";

export async function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    // First check if user is already authenticated via session
    if (req.isAuthenticated()) {
        return next();
    }

    // Then check custom headers as a fallback
    const authStatus = req.headers["x-auth-status"];
    const userId = req.headers["x-user-id"] as string;

    if (authStatus === "authenticated" && userId) {
        try {
            // Validate the user exists in the database
            const dbUser = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (dbUser) {
                // Convert to the expected User type for req.user
                const user: User = {
                    id: dbUser.id,
                    name: dbUser.name || undefined,
                    email: dbUser.email,
                    avatar: dbUser.avatar || undefined
                };

                // Attach the user to the request
                req.user = user;
                return next();
            }
        } catch (error) {
            console.error("Error validating user from headers:", error);
        }
    }

    res.status(401).json({ message: "Unauthorized" });
}
