const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

const isAuthenticate = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHander("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            // If the user does not have the required role, send an error response
            return res.status(403).json({
                success: false,
                message: `Role: ${req.user.role} is not allowed to access this resource`
            });
        }

        // If the user has the required role, proceed to the next middleware
        next();
    };
};


module.exports = { isAuthenticate, authorizeRoles };