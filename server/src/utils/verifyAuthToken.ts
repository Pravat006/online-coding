import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface VerifyAuthToken {
  (token: string): Promise<string>;
}

const verifyAuthToken: VerifyAuthToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload ? (payload["sub"] as string) : "";
  } catch (error) {
    console.error("Error verifying auth token:", error);
    throw new Error("Invalid authentication token");
  }
};

export default verifyAuthToken;
