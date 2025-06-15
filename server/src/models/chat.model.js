import { model, Schema } from "mongoose";


const chatSchema = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "ChatMessage",
    },
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: "ColaborationSession",
        required: false, // Optional, can be null if not part of a session
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

}, { timestamps: true });

const Chat = model("Chat", chatSchema);
export default Chat;

