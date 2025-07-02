import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/client.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

try {

    passport.serializeUser((user, next) => {
        next(null, user.id);
    });

    passport.deserializeUser(async (id, next) => {
        try {
            const dbUser = await prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            if (dbUser) {
                next(null, dbUser);
            } else {
                next(new ApiError(404, "User does not exist", null));
            }
        } catch (error) {
            next(new ApiError(
                500,
                "something went wrong while deserializing user. Error: " + error,
            ),
                null);
        }
    })

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            async (_, __, profile, next) => {
                // Check if user already exists in the database
                console.log("profile: ", profile);

                const dbUser = await prisma.user.findUnique({
                    where: {
                        email: profile._json.email
                    }
                });
                if (dbUser) {
                    // If user exists, we will send the saved user
                    next(null, dbUser);
                }
                // If user with email does not exists, means the user is coming for the first time
                else {
                    const newUser = await prisma.user.create({
                        data: {
                            id: profile.id,
                            email: profile._json.email,
                            name: profile._json.name || null,
                            avatar: profile._json.picture || null,
                        }
                    });
                    if (newUser) {
                        // If user is created successfully, we will send the saved user
                        next(null, newUser);
                    } else {
                        next(new ApiError(500, "Error while registering the user"), null);
                    }
                }
            }
        )
    )

} catch (error) {
    console.error("PASSPORT ERROR: ", error);
}