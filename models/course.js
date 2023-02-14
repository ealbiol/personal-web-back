// WEBSITE DYNAMIC COURSE SCHEMA MODEL

const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String, // URL of the course
    price: Number,
    score: Number,
});

module.exports = mongoose.model("Course", CourseSchema);