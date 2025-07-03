import { RoomEventEnum } from "../constants/constants.js";
import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import verifyAuthToken from "../utils/verifyAuthToken.js";

const activeRooms = new Map()

const mountCreateRoomEvent = (socket) => {
    socket.on(RoomEventEnum.CREATED_EVENT, async ({ roomId }) => {
        console.log(`Room created: ${roomId}`);
        if (!activeRooms.has(roomId)) {
            activeRooms.set(roomId, new Set());
        }
        activeRooms.get(roomId).add(socket.id);
        socket.join(roomId);
        socket.emit(RoomEventEnum.CREATED_EVENT, { roomId, message: "Room created successfully " });
    });
}

const mountJoinRoomEvent = (socket) => {
    socket.on(RoomEventEnum.USER_JOINED_EVENT, ({ roomId }) => {
        console.log(`User joined room: ${roomId}`);
        if (!activeRooms.has(roomId)) {
            activeRooms.set(roomId, new Set());
        }
        activeRooms.get(roomId).add(socket.id);
        socket.join(roomId);
        // socket.emit(event, payload)
        socket.emit(RoomEventEnum.USER_JOINED_EVENT, { roomId, message: "You have joined the room" });
    });
}

const mountLeaveRoomEvent = (socket) => {
    socket.on(RoomEventEnum.USER_LEFT_EVENT, ({ roomId }) => {
        console.log(`User left room: ${roomId}`);
        if (activeRooms.has(roomId)) {
            activeRooms.get(roomId).delete(socket.id);
            if (activeRooms.get(roomId).size === 0) {
                activeRooms.delete(roomId);
            }
        }
        socket.leave(roomId);
        socket.emit(RoomEventEnum.USER_LEFT_EVENT, { roomId, message: "You have left the room" });
    }
    )
}

const mountSendMessageEvent = (socket) => {
    socket.on(RoomEventEnum.SEND_MESSAGE_EVENT, ({ roomId, message }) => {
        console.log(`Message sent in room ${roomId}:`, message);
        if (activeRooms.has(roomId)) {
            socket.to(roomId).emit(RoomEventEnum.MESSAGE_EVENT, { roomId, message });
        }
        else {
            console.error(`Room ${roomId} does not exist.`);
            socket.emit(RoomEventEnum.ERROR_EVENT, { message: "Room does not exist." });
        }

    });
}





const initializeSocketIo = async (io) => {

    io.on('connection', async (socket) => {

        try {
            const token = socket.handshake.auth.token;
            console.log("Socket connected with token:", token);
            if (!token) {
                return socket.emit(SessionEventEnum.ERROR_EVENT, "Authentication token is required.");
            }
            const userId = await verifyAuthToken(token);
            if (!userId) {
                return socket.emit(SessionEventEnum.ERROR_EVENT, "Invalid authentication token.");
            }

            console.log("Decoded userId from token:", userId);

            const user = await User.findOne({ clerkId: userId });
            console.log("User found:", user);
            if (!user) return socket.disconnect(true);

            socket.user = user; // attach for later events
            console.log("User connected:", user?.firstName);

            // mount events
            mountCreateRoomEvent(socket);
            mountJoinRoomEvent(socket);
            mountLeaveRoomEvent(socket);
            mountSendMessageEvent(socket);

            socket.on(SessionEventEnum.DISCONNECTED_EVENT, () => {
                console.log(`User disconnected: ${user.firstName}`);
                if (socket?.user?._id) {
                    socket.leave(socket?.user._id);
                }
            });


        } catch (err) {
            socket.emit(SessionEventEnum.ERROR_EVENT,
                err?.message || "Something went wrong while connection to the socket , please try again later."
            )
            throw new ApiError(500, "Socket connection error", [err.message]);
        }
    });
}


function emitSocketEvent(req, roomId, event, payload) {
    const io = req.app.get("io");
    console.log("emitSocketEvent called with:", { roomId, event, payload });
    if (!io) {
        console.error("Socket.IO instance not found on app!");
        return;
    }
    // socket.emit(event, payload)
    io.to(roomId.toString()).emit(event, payload);
}

export {
    emitSocketEvent,
    initializeSocketIo,
}
