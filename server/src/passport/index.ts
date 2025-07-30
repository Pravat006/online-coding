import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ApiError } from "../utils/ApiError";
import prisma from "../db/client";
import { UserModel } from "@/@types/passport";
// import { DeserializedUser, User } from "@/@types/interface";


try {
  // Serialize user into session
  passport.serializeUser((user: any, done) => {
    const userId: String = user?.id || user.id;
    done(null, userId);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id }
      }) as UserModel | null;

      if (!user) {
        return done(new ApiError(404, "User not found"), null);
      }
      // Convert null values to undefined to satisfy User type
      const userWithoutNull = {
        ...user,
        name: user.name || undefined
      };
      done(null, userWithoutNull);
    } catch (error) {
      done(new ApiError(500, `Error deserializing user: ${error}`), null);
    }
  });

  // Set up Google OAuth strategy
  passport.use(<passport.Strategy>new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  }, async (_, __, profile: Profile, done: any) => {
    try {
      // Check for existing user
      let user = await prisma.user.findUnique({
        where: { id: profile.id }
      }) as UserModel | null;

      // Create new user if not found
      if (!user) {
        user = await prisma.user.create({
          data: {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value || "",
            avatar: profile.photos?.[0]?.value,
          }
        }) as UserModel;
      }

      return done(null, user);
    } catch (error: any) {
      console.error("Authentication error:", error);
      return done(error);
    }
  }));

} catch (error) {
  console.error("PASSPORT INITIALIZATION ERROR:", error);
}