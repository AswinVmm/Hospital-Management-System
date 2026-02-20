import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [3, "First name must be at least 3 characters long !"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [3, "Last name must be at least 3 characters long !"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please provide a valid email address"],
    },
    phone: {
        type: String,
        required: [true, "Phone No. is required"],
        minLength: [10, "Phone No. must contain exact 10 digits !"],
        maxLength: [10, "Phone No. must contain exact 10 digits !"],
    },
    message: {
        type: String,
        required: [true, "message is required"],
        minLength: [10, "message must contain atleast 10 characters !"],

    },
});

export const Message = mongoose.model("Message", messageSchema);