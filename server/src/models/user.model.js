import {Schema , model } from 'mongoose';


const userSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: ''
    },
},{timestamps: true});

const User = model('User', userSchema);

export default User;

