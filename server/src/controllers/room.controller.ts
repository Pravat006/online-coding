import AsyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import prisma from "../db/client";
import { emitSocketEvent } from "../socket/socket";
import { RoomEventEnum } from "../constants/constants";
import type { Request as ExpressRequest, Response } from "express";
import { CreateRoomRequest } from "@/@types/room";
import { UserId } from "@/@types/interface";


interface Request extends ExpressRequest {
    user?: {
        id: string;
        name?: string;
        [key: string]: any;
    };
}


const createColaborationRoom = AsyncHandler(async (req: Request, res: Response) => {
    const { roomName } = req.body as CreateRoomRequest;

    // Validate authentication
    if (!req.user || !req.user.id) {
        throw new ApiError(401, "Unauthorized - Authentication required", []);
    }

    const userId: UserId["id"] = req.user.id

    if (!userId) {
        throw new ApiError(401, "Unauthorized - Authentication required", []);
    }

    // Validate input
    if (!roomName || roomName.trim() === "") {
        throw new ApiError(400, "Room name is required", []);
    }

    // Create the room in database
    let createdRoom;
    try {
        createdRoom = await prisma.room.create({
            data: {
                name: roomName,
                hostId: userId,
                participants: {
                    connect: { id: userId } // Add creator as participant automatically
                }
            },
            include: {
                participants: true,
                host: true
            }
        });
    } catch (error: any) {
        throw new ApiError(500, "Failed to create collaboration room", [error.message || 'Unknown error']);
    }

    if (!createdRoom) {
        throw new ApiError(500, "Failed to create collaboration room", []);
    }

    const roomId = createdRoom.id;

    // Emit room creation event
    emitSocketEvent({
        req,
        roomId,
        event: RoomEventEnum.CREATED_EVENT,
        payload: {
            roomId: roomId,
            hostId: userId
        }
    });



    return res.status(201).json({
        status: "success",
        data: roomId,
        message: "Collaboration room created successfully"
    })
});

const joinColaborationRoom = AsyncHandler(async (req: Request, res: Response) => {
    const { roomId } = req.params
    if (!roomId) {
        throw new ApiError(400, "Room ID is required", []);
    }

    if (!req.user || !req.user.id) {
        throw new ApiError(401, "Unauthorized - Authentication required", []);
    }

    const userId: UserId["id"] = req.user.id;
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
    emitSocketEvent({
        req,
        roomId,
        event: RoomEventEnum.USER_JOINED_EVENT,
        payload: {
            roomId: roomId,
            user: {
                id: userId,
                name: req.user.name || "Anonymous"
            }
        }
    });
    return res.status(200).json({
        status: "success",
        data: updatedRoom,
        message: "Joined collaboration room successfully"
    })
});

const leaveColaborationRoom = AsyncHandler(async (req: Request, res: Response) => {
    const { roomId } = req.params;
    if (!roomId) {
        throw new ApiError(400, "Room ID is required", []);
    }
    if (!req.user || !req.user.id) {
        throw new ApiError(401, "Unauthorized - Authentication required", []);
    }
    const userId: UserId["id"] = req.user.id;
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
    emitSocketEvent({
        req,
        roomId,
        event: RoomEventEnum.USER_LEFT_EVENT,
        payload: {
            roomId: roomId,
            user: {
                id: userId,
                name: req.user.name || "Anonymous"
            }
        }
    });
    return res.status(200).json({
        status: "success",
        // data: updatedRoom,
        message: "Left collaboration room successfully"
    })
});


const deleteColaborationRoom = AsyncHandler(async (req: Request, res: Response) => {
    const { roomId } = req.params;
    if (!roomId) {
        throw new ApiError(400, "Room ID is required", []);
    }
    if (!req.user || !req.user.id) {
        throw new ApiError(401, "Unauthorized - Authentication required", []);
    }
    const userId: UserId["id"] = req.user.id;
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
    emitSocketEvent({
        req,
        roomId,
        event: RoomEventEnum.DELETED_EVENT,
        payload: {
            roomId: roomId
        }
    });
    return res.status(200).json({
        status: "success",
        message: "Collaboration room deleted successfully"
    });

})




export {
    createColaborationRoom,
    joinColaborationRoom,
    leaveColaborationRoom,
    deleteColaborationRoom
}