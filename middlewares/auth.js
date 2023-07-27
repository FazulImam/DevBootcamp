const jwt = require("jsonwebtoken");
const asyncHandler = require('./asyncHandler');
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.protect = asyncHandler(async (req,res,next) => {
     let token;
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
     } 
    //  else if (req.cookies.token) {
    //     token = req.cookies.token
    //  }
    if(!token) {
        return next(new ErrorResponse('not authorized to access this resource',401));
    }

    try {
        const decode = jwt.verify(token,process.env.SECRET);
        console.log(decode)
        req.user = await User.findById(decode.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('not authorized to access this resource',401));
    }
})