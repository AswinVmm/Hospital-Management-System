import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
    appointment_date: {
        type: String,
        required: [true, "Appointment Date is required"],
    },
    department: {
        type: String,
        required: [true, "Department is required"],
    },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        required: true,
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected",],
        default: "Pending",
    },
    address: {
        type: String,
        required: true,
    },

});

export const Appointment = mongoose.model("Appointment", appointmentSchema);