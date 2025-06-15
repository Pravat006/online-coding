import { model, Schema } from "mongoose";



const  executionLogSchema = new Schema({
    output: {
        type: String,
        required: true
    },
    error: {
        type: String,
        default: ''
    },
    codeFileId: {
        type: Schema.Types.ObjectId,
        ref: 'CodeFile',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps:true})

const ExecutionLog = model('ExecutionLog', executionLogSchema);
export default ExecutionLog;


