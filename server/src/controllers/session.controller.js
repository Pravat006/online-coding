import { getAuth } from "@clerk/express";
import asyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ColaborationSession from "../models/session.model.js";
import { v4 as uuid } from "uuid"
import { ApiResponse } from "../utils/ApiResponse.js";

const createAcolaborationSession = asyncHandler(async (req, res) => {
    
    // Check authentication
    const { userId } = getAuth(req)
    if (!userId) {
        throw new ApiError(401, "Unauthorized - Authentication required", []);
    }
    
    // Validate request body
    if (!req.body) {
        throw new ApiError(400, "Request body is missing or not properly formatted", []);
    }
    
    const { name } = req.body;
    console.log("name: ", name)
    
    if (!name) {
        throw new ApiError(400, "Session name is required", []);
    }

    try {
        const randId = uuid()
        console.log("random room id : ", randId)
        
        const newSession = await ColaborationSession.create({
            colaborationSessionId: randId,
            name: name,
            owner: userId
        });
        
        console.log("new session created: ", newSession)
        
        return res.status(201).json(
            new ApiResponse(201,
                newSession,
                "Collaboration session created successfully"
            )
        );
    } catch (error) {
        // Database errors
        if (error.name === 'ValidationError') {
            // MongoDB validation error
            throw new ApiError(400, "Invalid session data", Object.values(error.errors).map(err => err.message));
        } else if (error.name === 'MongoServerError' && error.code === 11000) {
            // Duplicate key error
            throw new ApiError(409, "Session with this ID already exists", []);
        } else {
            // Generic database or server error
            console.error("Error creating session:", error);
            throw new ApiError(500, "Failed to create collaboration session", [error.message]);
        }
    }
});




















export {
    createAcolaborationSession
}