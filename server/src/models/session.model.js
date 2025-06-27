import mongoose, { Schema } from "mongoose";

const colaborationSessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'User', // Assuming you have a User model
        required: true
    },
    // ... other fields like participants, etc.
}, { timestamps: true });

const ColaborationSession = mongoose.model("ColaborationSession", colaborationSessionSchema);

export default ColaborationSession;

