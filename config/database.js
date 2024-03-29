import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    // if the database is already connected, don't connect again
    if (connected) {
        console.log("Database is already connected");
        return;
    }

    //connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to database: ", error);
    }
};

export default connectDB;