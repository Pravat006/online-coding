import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ApiError } from "../utils/ApiError";
import prisma from "../db/client";
import { UserModel, AuthenticatedUser } from "@/@types/passport";
// import { DeserializedUser, User } from "@/@types/interface";


try {
  // Serialize user into session
  passport.serializeUser((user: any, done) => {
    // Handle both direct user objects and our wrapped AuthenticatedUser objects
    const userId: String = user.user?.id || user.id;
    done(null, userId);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: string, done) => {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    try {
      const user = await prisma.user.findUnique({
        where: { id }
      });

      if (!user) {
        return done(new ApiError(404, "User not found"), null);
      }
      const deserializedUser = {
        id: id,
      }
      done(null, deserializedUser);
    } catch (error) {
      done(new ApiError(500, `Error deserializing user: ${error}`), null);
    }
  });

  // Set up Google OAuth strategy
  passport.use(<passport.Strategy>new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  }, async (accessToken: string, _, profile: Profile, done: any) => {
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


      // Return authenticated user with token
      const authenticatedUser: AuthenticatedUser = {
        user,
        token: accessToken,
      };
      return done(null, authenticatedUser);
    } catch (error: any) {
      console.error("Authentication error:", error);
      return done(error);
    }
  }));

} catch (error) {
  console.error("PASSPORT INITIALIZATION ERROR:", error);
}