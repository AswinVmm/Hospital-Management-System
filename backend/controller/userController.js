import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from '../models/userSchema.js';
import { generateToken } from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';

export const patientRegister = catchAsyncErrors(async (req, res, next) => {

    const { firstName, lastName, email, password, gender, phone, dob, nic, role } = req.body;
    if (!firstName || !lastName || !email || !password || !gender || !phone || !dob || !nic || !role) {
        return next(new ErrorHandler("Please fill All the required fields ", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler('User Already Registered', 400));
    }
    user = await User.create({ firstName, lastName, email, password, gender, phone, dob, nic, role });

    generateToken(user, 'User Registered Successfully !', 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please provide all the required fields to login !", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("password and confirmPassword don't match !", 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler("User not found, please register !", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password !", 400));
    }
    if (user.role !== role) {
        return next(new ErrorHandler("User with this role not found !", 400));
    }
    generateToken(user, 'User Logged In Successfully !', 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, password, gender, phone, dob, nic } = req.body;
    if (!firstName || !lastName || !email || !password || !gender || !phone || !dob || !nic) {
        return next(new ErrorHandler("Please fill All the required fields ", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this Email Already Exists !`, 400));
    }
    const admin = await User.create({ firstName, lastName, email, password, gender, phone, dob, nic, role: 'Admin' });

    res.status(200).json({
        success: true,
        message: 'New Admin Added Successfully !',
    });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: 'Doctor' });
    res.status(200).json({
        success: true,
        doctors,
    });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("admin_token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: 'Admin Logged Out Successfully !',
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patient_token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: 'User Logged Out Successfully !',
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required ", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("Invalid image format. Allowed formats: JPEG, JPG, PNG, WEBP", 400));
    }
    const { firstName, lastName, email, password, gender, phone, dob, nic, doctorDepartment } = req.body;
    if (!firstName || !lastName || !email || !password || !gender || !phone || !dob || !nic || !doctorDepartment) {
        return next(new ErrorHandler("Please fill All the required fields ", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this Email Already Exists !`, 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if (!cloudinaryResponse || !cloudinaryResponse.error) {
        console.error("Cloudinary Upload Error: ", cloudinaryResponse.error || 'Unknown Cloudinary error');
    }

    const doctor = await User.create({ firstName, lastName, email, password, gender, phone, dob, nic, role: 'Doctor', doctorDepartment, docAvatar: { public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url } });
    res.status(200).json({
        success: true,
        message: 'New Doctor Registered Successfully !',
        doctor,
    });
});