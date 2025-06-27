import { SessionEventEnum } from "../constants.js";
import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { verifyToken } from '@clerk/clerk-sdk-node';

const mountJoinSessiobEvent = (socket) => {
    socket.on(SessionEventEnum.JOINED_EVENT, (sessionId) => {
        console.log(`User joined session: ${sessionId}`);
        socket.join(sessionId);
        socket.emit('sessionJoined', { sessionId });
    });
};

const mountTypingEvent = (socket) => {
    socket.on(SessionEventEnum.TYPING_EVENT, (sessionId) => {
        socket.in(sessionId).emit(SessionEventEnum.TYPING_EVENT, sessionId);
    });
};

const stoppedTypingEvent = (socket) => {
    socket.on(SessionEventEnum.STOP_TYPING_EVENT, (sessionId) => {
        socket.in(sessionId).emit(SessionEventEnum.STOP_TYPING_EVENT, sessionId);
    });
};

const mountCodeChangeEvent=(socket)=>{
    socket.on(SessionEventEnum.CODE_CHANGE_EVENT,({sessionId, code})=>{

        // brodcast the code change to other users in the session
        if(!sessionId || !code) return socket.emit(SessionEventEnum.ERROR_EVENT, "Session ID and code are required.");  

        socket.to(sessionId).emit(SessionEventEnum.CODE_CHANGE_EVENT, code);
    })
};

const mountChantMessageEvent= (socket)=>{
    socket.on(SessionEventEnum.MESSAGE_EVENT,({sessionId, user, message})=>{
        socket.to(sessionId).emit(SessionEventEnum.MESSAGE_EVENT, {
            user,
            message,
            sessionId
        });
    })
};

const initializeSocketIo = async (io) => {

    io.on('connection', async (socket) => {
        const token = socket.handshake.auth.token;
        if (!token) return socket.disconnect(true);

        try {
            const decoded = await verifyToken(token); // uses your env key
            const userId = decoded.sub;

            const user = await User.findOne({ clerkId:userId });
            if (!user) return socket.disconnect(true);

            socket.user = user; // attach for later events
            console.log("User connected:", user?.name);

            // common events to be mount on socket initialization
            mountJoinSessiobEvent(socket);
            mountTypingEvent(socket);
            stoppedTypingEvent(socket);
            mountCodeChangeEvent(socket);
            mountChantMessageEvent(socket);


        socket.on(SessionEventEnum.DISCONNECTED_EVENT, () => {
                console.log(`User disconnected: ${user.name}`);
                if(socket?.user?._id){
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


const emitSocketEvent= (req, roomId, event, data)=>{
    req.app.get("io").in(roomId).emit(event, data);
}

export {
    initializeSocketIo,
    emitSocketEvent
}


