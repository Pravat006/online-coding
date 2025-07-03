import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyAuthToken = async (token) => {
    try {
        const ticket = client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        return userid;
    } catch (error) {
        console.error("Error verifying auth token:", error);
        throw new Error("Invalid authentication token");
    }

}

export default verifyAuthToken;

