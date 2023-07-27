const Course = require("../models/Course");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require('../utils/errorResponse')

const getCourses = asyncHandler(async (req,res,next) => {
    let query;
    
    if(req.params.bootcampId) {
        query = Course.find({})
    }
})