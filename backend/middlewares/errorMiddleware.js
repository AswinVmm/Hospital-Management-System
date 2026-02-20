class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.code === 11000) {
        const messages = ` Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(messages, 400);
    }
    if (err.name === "JsonWebTokenError") {
        const messages = "Jason Web Token is Invalid, Try Again !";
        err = new ErrorHandler(messages, 400);
    }
    if (err.name === "TokenExpiredError") {
        const messages = "Jason Web Token is Expired, Try Again !";
        err = new ErrorHandler(messages, 400);
    }
    if (err.name === "CastError") {
        const messages = `Invalid: ${err.path}`;
        err = new ErrorHandler(messages, 400);
    }

    const errorMessage = err.errors ? Object.values(err.errors).map(error => error.message).join(" ") : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default ErrorHandler;