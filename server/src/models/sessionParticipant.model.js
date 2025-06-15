import { model, Schema } from "mongoose";


const sessionParticipantSchema = new Schema({
    participant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    colaborationSessionId: {
        type: Schema.Types.ObjectId,
        ref: 'ColaborationSession',
        required: true
    }
}, { timestamps: true });



const SessionParticipant = model('SessionParticipant', sessionParticipantSchema);
export default SessionParticipant;