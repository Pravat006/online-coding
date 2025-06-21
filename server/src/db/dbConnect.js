import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}`
        )
     
        console.log(`MongoDB connected! DB host : ${connectionInstance?.connection.host}`);
    } catch (error) {
      
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;

