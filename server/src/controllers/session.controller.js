import { getAuth } from "@clerk/express";
import asyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ColaborationSession from "../models/session.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import { isValidObjectId } from "mongoose";
import { emitSocketEvent } from "../socket/socket.js";
import { SessionEventEnum } from "../constants.js";
import { v4 as uuidv4 } from "uuid";

// const createAcolaborationSession = asyncHandler(async (req, res) => {

//     const { name } = req.body;
//     // Check authentication
//     const { userId } = getAuth(req)
//     if (!userId) {
//         throw new ApiError(401, "Unauthorized - Authentication required", []);
//     }

//     const dbUser = await User.findOne({ clerkId: userId });
//     if (!dbUser) {
//         throw new ApiError(404, "User not found", []);
//     }

//     if (!name) {
//         throw new ApiError(400, "Session name is required", []);
//     }

//     try {

//         // const newSession = await ColaborationSession.create({
//         //     name: name,
//         //     owner: dbUser._id
//         // });
//         // Emit socket event to notify about the new session creation
//         // console.log("Emitting socket event:", {
//         //     room: newSession._id,
//         //     event: "session-created",
//         //     payload: { session: newSession._id, user: dbUser }
//         // });
//         const roomId = uuidv4();
//         console.log("Creating new session with roomId:", roomId);
//         emitSocketEvent(req, roomId, SessionEventEnum.CREATED_EVENT, {
//             session: roomId,
//             user: dbUser
//         });

//         // console.log("new session created: ", newSession)

//         return res.status(201).json(
//             new ApiResponse(201,
//                 // newSession,
//                 "Collaboration session created successfully"
//             )
//         );
//     } catch (error) {

//         console.error("Error creating session:", error);
//         throw new ApiError(500, "Failed to create collaboration session", [error.message]);

//     }
// });

// const deleteAcolaborationSession = asyncHandler(async (req, res) => {
//     const { sessionId } = req.params;
//     // Check authentication
//     const { userId } = getAuth(req);
//     if (!userId) {
//         throw new ApiError(401, "Unauthorized - Authentication required", []);
//     }

//     if (!isValidObjectId(sessionId)) {
//         throw new ApiError(400, "Invalid session ID", []);
//     }
//     const session = await ColaborationSession.findById(sessionId);
//     if (!session) {
//         throw new ApiError(404, "Collaboration session not found", []);
//     }
//     if (session.owner.toString() !== userId) {
//         throw new ApiError(403, "Forbidden - You are not the owner of this session", []);
//     }
//     try {
//         await ColaborationSession.findByIdAndDelete(sessionId);


//         // TO BE IMPLEMENT LATER ----->>>
//         // after deleting the session, we want to also delete all participants associated with this session
//         // also automatically remove the participant associatd with this session from the websocket room


//         return res.status(200).json(
//             new ApiResponse(200, null, "Collaboration session deleted successfully")
//         );
//     } catch (error) {
//         console.error("Error deleting session:", error);
//         throw new ApiError(500, "Failed to delete collaboration session", [error.message]);
//     }
// });

// const joinSession = asyncHandler(async (req, res) => {
//     try {
//         const { sessionId } = req.params;
//         // Check authentication
//         const { userId } = getAuth(req);
//         if (!userId) {
//             throw new ApiError(401, "Unauthorized - Authentication required", []);
//         }
//         // if (!isValidObjectId(sessionId)) {
//         //     throw new ApiError(400, "Invalid session ID", []);
//         // }
//         // const session = await ColaborationSession.findById(sessionId);
//         // if (!session) {
//         //     throw new ApiError(404, "Collaboration session not found", []);
//         // }
//         const dbUser = await User.findOne({ clerkId: userId });
//         if (!dbUser) {
//             throw new ApiError(404, "User not found", []);
//         }
//         emitSocketEvent(req, sessionId, "join-room", {
//             user: dbUser,
//             sessionId: sessionId
//         });
//         return res.status(200).json(
//             new ApiResponse(200, null, "Joined collaboration session successfully")
//         );
//     } catch (error) {
//         console.error("Error joining session:", error);
//         throw new ApiError(500, "Failed to join collaboration session", [error.message]);
//     }
// });


// export {
//     createAcolaborationSession,
//     // deleteAcolaborationSession,
//     joinSession
// }