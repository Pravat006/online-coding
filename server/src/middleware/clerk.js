import { getAuth} from "@clerk/express"
import asyncHandler from "../utils/AsyncHandler.js"
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const saveNewUserToDB= asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    // Logic to save the new user to the database
    // check if userId exists in the database
    // If not, create a new user entry
    if(!userId) {
        return res.status(400).json({ error: "UnAuthorized" });
    }

    
    // Check if userId exists in the database
    let existingUser = await User.findOne( { clerkId: userId } );
    if (existingUser) {
        return res.status(200).json(new ApiResponse(200, existingUser, "User already exists"));
    }else{
        // fetch user details from Clerk api
        const response = await fetch(`${process.env.CLERK_API_ENDPOINT}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`
            }
        }).then(res => res.json());
        if (!response || !response.id) {
            throw new ApiError(500, "Failed to fetch user details from Clerk", [], response.errors);
        }
    }
    existingUser = User.create({
        clerkId: userId,
        email: response?.email_addresses[0]?.email_address,
        firstName: response?.first_name,
        lastName: response?.last_name,
        profileImageUrl: response?.profile_image_url,
    });
    await User.save(existingUser);
    return res.status(201).json(new ApiResponse(201, existingUser, "User created successfully"));
    
});


export { saveNewUserToDB };