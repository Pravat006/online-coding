import { AuthenticatedSocket, EmitSocketParams, RoomCreatedPayload, RoomIdPayload, RoomJoinedPayload, UserLeavePayload } from "@/@types/socket";
import * as constants from "../constants/constants";
// import prisma from "../db/client";
import { ApiError } from '../utils/ApiError';
import verifyAuthToken from "../utils/verifyAuthToken";
import { Server as SocketIOServer, Socket } from "socket.io";
const activeRooms = new Map()




const mountCreateRoomEvent = (socket: AuthenticatedSocket): void => {
    socket.on(constants.RoomEventEnum.CREATED_EVENT, async ({ roomId }: RoomIdPayload): Promise<void> => {
        console.log(`Room created: ${roomId}`);
        if (!activeRooms.has(roomId)) {
            activeRooms.set(roomId, new Set<string>());
        }
        activeRooms.get(roomId).add(socket.id);
        socket.join(roomId);
        socket.emit(constants.RoomEventEnum.CREATED_EVENT, {
            roomId,
            message: "Room created successfully"
        } as RoomCreatedPayload);
    });
}

const mountJoinRoomEvent = (socket: AuthenticatedSocket): void => {
    socket.on(constants.RoomEventEnum.USER_JOINED_EVENT, ({ roomId }: RoomIdPayload): void => {
        console.log(`User joined room: ${roomId}`);
        if (!activeRooms.has(roomId)) {
            activeRooms.set(roomId, new Set());
        }
        activeRooms.get(roomId).add(socket.id);
        socket.join(roomId);
        // socket.emit(event, payload)
        socket.emit(constants.RoomEventEnum.USER_JOINED_EVENT, {
            roomId,
            user: {
                id: socket.user.id,
                name: socket.user.name || "Anonymous"
            }
        } as RoomJoinedPayload);

    });
}

const mountLeaveRoomEvent = (socket: AuthenticatedSocket) => {
    socket.on(constants.RoomEventEnum.USER_LEFT_EVENT, ({ roomId }: UserLeavePayload) => {
        console.log(`User left room: ${roomId}`);
        if (activeRooms.has(roomId)) {
            activeRooms.get(roomId).delete(socket.id);
            if (activeRooms.get(roomId).size === 0) {
                activeRooms.delete(roomId);
            }
        }
        socket.leave(roomId);
        socket.emit(constants.RoomEventEnum.USER_LEFT_EVENT, {
            roomId,
        } as UserLeavePayload);
    });
}

const mountSendMessageEvent = (socket: AuthenticatedSocket) => {
    socket.on(constants.RoomEventEnum.SEND_MESSAGE_EVENT, ({ roomId }: RoomIdPayload) => {

        if (activeRooms.has(roomId)) {
            socket.to(roomId).emit(constants.RoomEventEnum.MESSAGE_EVENT, { roomId });
        }
        else {
            // console.error(`Room ${roomId} does not exist.`);
            socket.emit(constants.RoomEventEnum.ERROR_EVENT, { message: "Room does not exist." });
        }

    });
}
const initializeSocketIo = async (io: SocketIOServer) => {

    io.on('connection', async (socket: Socket) => {



        // const initializeSocketIo = async (io: SocketIOServer) => {

        //     io.on('connection', async (socket: AuthenticatedSocket) => {

        try {
            const token = socket.handshake.auth.token;
            console.log("Socket connected with token:", token);
            if (!token) {
                return socket.emit(constants.RoomEventEnum.ERROR_EVENT, "Authentication token is required.");
            }
            const userId = await verifyAuthToken(token);
            if (!userId) {
                return socket.emit(constants.RoomEventEnum.ERROR_EVENT, "Invalid authentication token.");
            }

            console.log("Decoded userId from token:", userId);

            // Define user object with required properties
            const user = { id: userId };
            (socket as AuthenticatedSocket).user = user; // attach for later events


            // mount events
            mountCreateRoomEvent(socket as AuthenticatedSocket);
            mountJoinRoomEvent(socket as AuthenticatedSocket);
            mountLeaveRoomEvent(socket as AuthenticatedSocket);
            mountSendMessageEvent(socket as AuthenticatedSocket);


            socket.on(constants.RoomEventEnum.DISCONNECTED_EVENT, () => {
                if ((socket as AuthenticatedSocket)?.user?.id) {
                    socket.leave((socket as AuthenticatedSocket)?.user.id);
                }
                socket.disconnect(true);
                socket.emit(constants.RoomEventEnum.DISCONNECTED_EVENT, {
                    message: "You have been disconnected from the socket."
                });
            });


        } catch (err: any) {
            socket.emit(constants.RoomEventEnum.ERROR_EVENT,
                err?.message || "Something went wrong while connection to the socket , please try again later."
            )
            throw new ApiError(500, "Socket connection error", [err?.message || "Unknown error"]);
        }
    });
}


function emitSocketEvent({ req, roomId, event, payload }: EmitSocketParams): void {
    const io = req.app.get("io");
    console.log("emitSocketEvent called with:", { roomId, event, payload });
    if (!io) {
        console.error("Socket.IO instance not found on app!");
        return;
    }
    // socket.emit(event, payload)
    io.to(roomId.toString()).emit(event, payload);
};

export {
    initializeSocketIo,
    emitSocketEvent
};