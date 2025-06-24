import mongoose from "mongoose";

const colaborationSessionSchema = new mongoose.Schema({
    colaborationSessionId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: String, // <-- CHANGE THIS FROM ObjectId TO String
        required: true
    },
    // ... other fields like participants, etc.
}, { timestamps: true });

const ColaborationSession = mongoose.model("ColaborationSession", colaborationSessionSchema);

export default ColaborationSession;

