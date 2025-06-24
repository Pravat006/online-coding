import { getAuth} from "@clerk/express"
import asyncHandler from "../utils/AsyncHandler.js"
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const saveNewUserToDB = asyncHandler(async (req, res, next) => {
    const { userId } = getAuth(req);

    // Check if userId is present in the request
    if (!userId) {
        return next(); // Continue to next middleware if no user
    }

    // Check if userId exists in the database
    let existingUser = await User.findOne({ clerkId: userId });
    if (existingUser) {
        
        return next(); // User exists, continue to next middleware
    }
    
    // Fetch user details from Clerk API
    const response = await fetch(`${process.env.CLERK_API_ENDPOINT}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`
        }
    }).then(res => res.json());
    
    if (!response || !response.id) {
        throw new ApiError(500, "Failed to fetch user details from Clerk", [], response.errors);
    }
    
    // Create new user
     await User.create({
        clerkId: userId,
        email: response?.email_addresses[0]?.email_address,
        firstName: response?.first_name,
        lastName: response?.last_name,
        profileImageUrl: response?.profile_image_url,
    });
    next(); // Continue to next middleware
});

export { saveNewUserToDB };