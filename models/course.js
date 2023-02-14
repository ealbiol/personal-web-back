// WEBSITE DYNAMIC COURSE SCHEMA MODEL

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate"); //Pagination dependency

const CourseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String, // URL of the course
    price: Number,
    score: Number,
});

CourseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Course", CourseSchema);