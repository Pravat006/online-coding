import { model, Schema } from "mongoose";



const sessionSchema = new Schema({
    colaborationSessionId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {timestamps:true})

const ColaborationSession = model('ColaborationSession', sessionSchema);

export default ColaborationSession;

