const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [true,'Please add a course title']
    },
    description : {
        type : String,
        required : [true,"Please add a descritpion"],
    },
    weeks : {
        type : String,
        required : [true,"Please add a number of weeks"],
    },
    tuition : {
        type : Number,
        required : [true,"Please add a tuition cost"],
    },
    minimumSkill : {
        type : String,
        required : [true,"Please add a minimum skill"],
        enum : ['beginner','advance','expert']
    },
    scholarShipAvailable : {
        type : Boolean,
        default : false
    },
    bootcamp : {
        type : mongoose.Schema.ObjectId,
        ref : 'Bootcamp',
        required : true
    }
},{timestamps: true})

module.exports = mongoose.model('Course',CourseSchema)