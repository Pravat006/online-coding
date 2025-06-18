import mongoose from "mongoose";

export let dbInstance = undefined;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}`
        )
        dbInstance = connectionInstance;
        console.log(`MongoDB connected! DB host : ${connectionInstance?.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }

}
export default connectDB;

