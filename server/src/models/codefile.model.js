import {Schema, model} from 'mongoose';


const codeFileSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        default: ""
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    colaborationSessionId: {
        type: Schema.Types.ObjectId,
        ref: 'ColaborationSession',
        required: true
    },
},{timestamps: true});

const CodeFile = model('CodeFile', codeFileSchema);
export default CodeFile;








