import { Schema } from "mongoose";

const messageSchema = new Schema({
    content: {
        type: String,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
    },
}, { timestamps: true });

const Message = model("Message", messageSchema);

export default Message;


