import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "HMS",
    }).then(() => {
        console.log("MongoDB is connected successfully !");
    }).catch((err) => {
        console.log("MongoDB connection failed :", err);
    });
}