// import e from "express";    
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    nic: {
        type: String,
        required: [true, "message is required"],
        minLength: [6, "NIC must contain exact 6 digits !"],
        maxLength: [6, "NIC must contain exact 6 digits !"],
    },
    dob: {
        type: Date,
        required: [true, "Date of Birth is required"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["Male", "Female", "Other"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters long !"],
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
        default: "Patient",
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generatejasonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};


export const User = mongoose.model("User", userSchema);