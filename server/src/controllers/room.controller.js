
import asyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/client.js";
import { emitSocketEvent } from "../socket/socket.js";
import { RoomEventEnum } from "../constants/constants.js";


const createAcolaborationRoom = asyncHandler(async (req, res) => {
    const { roomName } = req.body;
    const userId = req.user.id;
    console.log("userId in controller : ", userId);
    if (!req.user) {
        throw new ApiError(401, "Unauthorized - Authentication required", []);
    }
    if (!roomName || roomName.trim() === "") {
        throw new ApiError(400, "Room name is required", []);
    }

    // Check authentication

    if (!userId) {
        throw new ApiError(401, "Unauthorized - Authentication required", []);
    }
    const createdRoom = await prisma.room.create({
        data: {
            name: roomName,
            hostId: userId,
        },
        include: {
            participants: true,
            host: true
        }
    })
    if (!createdRoom) {
        throw new ApiError(500, "Failed to create collaboration room", []);
    }
    const roomId = createdRoom.id;
    emitSocketEvent(req, roomId, RoomEventEnum.CREATED_EVENT, {
        roomId: roomId,
    }
    );
    return res.status(201).json(
        new ApiResponse(201, createdRoom, "Collaboration room created successfully")
    );

});

const joinColaborationRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    if (!roomId) {
        throw new ApiError(400, "Room ID is required", []);
    }
    const userId = req.user.id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized - Authentication required", []);
    }
    const room = await prisma.room.findUnique({
        where: { id: roomId },
        include: {
            participants: true,
            host: true
        }
    });
    if (!room) {
        throw new ApiError(404, "Room not found", []);
    }
    if (room.participants.some(participant => participant.id === userId)) {
        throw new ApiError(400, "You are already a participant in this room", []);
    }
    const updatedRoom = await prisma.room.update({
        where: { id: roomId },
        data: {
            participants: {
                connect: { id: userId }
            }
        },
        include: {
            participants: true,
            host: true
        }
    });
    if (!updatedRoom) {
        throw new ApiError(500, "Failed to join collaboration room", []);
    }
    emitSocketEvent(req, roomId, RoomEventEnum.USER_JOINED_EVENT, {
        roomId: roomId,
        user: {
            id: userId,
            name: req.user.name || "Anonymous"
        }
    });
    return res.status(200).json(
        new ApiResponse(200, updatedRoom, "Joined collaboration room successfully")
    );
});

const leaveColaborationRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    if (!roomId) {
        throw new ApiError(400, "Room ID is required", []);
    }
    const userId = req.user.id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized - Authentication required", []);
    }
    const room = await prisma.room.findUnique({
        where: { id: roomId },
        include: {
            participants: true,
            host: true
        }
    });
    if (!room) {
        throw new ApiError(404, "Room not found", []);
    }
    if (!room.participants.some(participant => participant.id === userId)) {
        throw new ApiError(400, "You are not a participant in this room", []);
    }
    const updatedRoom = await prisma.room.update({
        where: { id: roomId },
        data: {
            participants: {
                disconnect: { id: userId }
            }
        },
        include: {
            participants: true,
            host: true
        }
    });
    emitSocketEvent(req, roomId, RoomEventEnum.USER_LEFT_EVENT, {
        roomId: roomId,
        user: {
            id: userId,
            name: req.user.name || "Anonymous"
        }
    });
    return res.status(200).json(
        new ApiResponse(200, updatedRoom, "Left collaboration room successfully")
    );
});


const deleteColaborationRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    if (!roomId) {
        throw new ApiError(400, "Room ID is required", []);
    }
    const userId = req.user.id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized - Authentication required", []);
    }
    const room = await prisma.room.findUnique({
        where: { id: roomId },
    });
    if (!room) {
        throw new ApiError(404, "Room not found", []);
    }
    if (room.hostId !== userId) {
        throw new ApiError(403, "Forbidden - Only the host can delete the room", []);
    }
    await prisma.room.delete({
        where: { id: roomId },
    });
    emitSocketEvent(req, roomId, RoomEventEnum.DELETE_ROOM_EVENT, {
        roomId: roomId,
    });
    return res.status(200).json(
        new ApiResponse(200, null, "Collaboration room deleted successfully")
    );

})




export {
    createAcolaborationRoom,
    joinColaborationRoom,
    leaveColaborationRoom,
    deleteColaborationRoom
}